import { AsyncModelFactory } from '@nestjs/mongoose';

import { Schema } from 'mongoose';
import AutoPopulate from 'mongoose-autopopulate';

export class MongoModelFactory {
  static generate<T>(name: string, schema: Schema<T>): AsyncModelFactory {
    return {
      name,
      useFactory: () => {
        schema.set('timestamps', true);
        schema.set('versionKey', false);

        schema.plugin(AutoPopulate);

        return schema;
      },
    };
  }

  static generateRecursive<T>(
    name: string,
    schema: Schema<T>,
    subSchema: { type: string; schema: Schema }[],
  ): AsyncModelFactory {
    return {
      name,
      useFactory: () => {
        schema.set('timestamps', true);
        schema.set('versionKey', false);

        schema.plugin(AutoPopulate);

        subSchema.forEach(({ type, schema }) => {
          schema.set('timestamps', true);
          schema.set('versionKey', false);

          schema.plugin(AutoPopulate);

          schema.discriminator(type, schema);
        });

        return schema;
      },
    };
  }
}

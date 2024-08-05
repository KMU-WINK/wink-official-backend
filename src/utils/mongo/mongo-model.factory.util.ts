import { AsyncModelFactory } from '@nestjs/mongoose';

import { Schema } from 'mongoose';

import auto_populate from 'mongoose-autopopulate';

export class MongoModelFactory {
  static generate(name: string, schema: Schema<any>): AsyncModelFactory {
    return {
      name,
      useFactory: () => {
        schema.set('timestamps', true);
        schema.set('versionKey', false);

        schema.plugin(auto_populate);

        return schema;
      },
    };
  }
}

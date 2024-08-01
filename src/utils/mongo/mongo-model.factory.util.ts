import { AsyncModelFactory } from '@nestjs/mongoose';

import { Schema } from 'mongoose';

export class MongoModelFactory {
  static generate(name: string, schema: Schema<any>): AsyncModelFactory {
    return {
      name,
      useFactory: () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        schema.plugin(require('mongoose-autopopulate'));
        return schema;
      },
    };
  }
}
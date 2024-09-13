import { ModelDefinition } from '@nestjs/mongoose';

import { Schema } from 'mongoose';
import AutoPopulate from 'mongoose-autopopulate';

export class MongoModelFactory {
  static generate<T>(name: string, schema: Schema<T>): ModelDefinition {
    schema = MongoModelFactory.#setSchemaOptions(schema);

    return { name, schema };
  }

  static generateRecursive<T>(
    name: string,
    schema: Schema<T>,
    subSchemas: { type: string; schema: Schema }[],
  ): ModelDefinition {
    schema = MongoModelFactory.#setSchemaOptions(schema);
    subSchemas = subSchemas.map(({ type, schema }) => {
      schema = MongoModelFactory.#setSchemaOptions(schema);

      return { type, schema };
    });

    return {
      name,
      schema,
      discriminators: subSchemas.map(({ type, schema }) => {
        return { name: type, schema };
      }),
    };
  }

  static #setSchemaOptions(schema: Schema): Schema {
    schema.set('timestamps', true);
    schema.set('versionKey', false);

    schema.plugin(AutoPopulate);

    return schema;
  }
}

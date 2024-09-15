import { ModelDefinition } from '@nestjs/mongoose';

import { Schema } from 'mongoose';
import AutoPopulate from 'mongoose-autopopulate';

const convertToKST = (date: Date): Date => new Date(date.getTime() + 9 * 60 * 60 * 1000);

export class MongoModelFactory {
  static generate<T>(name: string, schema: Schema<T>): ModelDefinition {
    schema = MongoModelFactory.setSchemaOptions(schema);

    return { name, schema };
  }

  static generateRecursive<T>(
    name: string,
    schema: Schema<T>,
    subSchemas: { type: string; schema: Schema }[],
  ): ModelDefinition {
    schema = MongoModelFactory.setSchemaOptions(schema);
    subSchemas = subSchemas.map(({ type, schema }) => {
      schema = MongoModelFactory.setSchemaOptions(schema);

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

  private static setSchemaOptions(schema: Schema): Schema {
    schema.set('versionKey', false);
    schema.set('timestamps', true);

    schema.pre('save', function (next) {
      if ('createdAt' in this) {
        this['createdAt'] = convertToKST(new Date());
      }

      this['updatedAt'] = convertToKST(new Date());

      next();
    });

    schema.plugin(AutoPopulate);

    return schema;
  }
}

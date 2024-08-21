import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { GraphQLSchema } from "graphql/type";
import { DirectiveNames } from "./index";
import { defaultFieldResolver } from "graphql/execution";
import { GraphQLResolveInfo } from "graphql/type";

/**
 * Prints out a log of the field name where the directive is applied
 */
export function registerLogDirective(schema: GraphQLSchema) {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const logDirective = getDirective(
        schema,
        fieldConfig,
        DirectiveNames.consoleLog,
      )?.[0];

      if (logDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        if (!resolve) {
          return fieldConfig;
        }

        // Replace the original resolver so we can put in our custom directive logic, then call
        // the original resolver
        fieldConfig.resolve = async function (
          source: any,
          args: { [argName: string]: any },
          context: any,
          info: GraphQLResolveInfo,
        ) {
          console.log(
            `Directive ${DirectiveNames.consoleLog} accessing ${info.parentType ?? "undefined"} type '${info.fieldName}' field`,
          );

          return resolve(source, args, context, info);
        };

        return fieldConfig;
      }
    },
  });
}

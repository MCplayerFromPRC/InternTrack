import { GraphQLSchema } from "graphql/type";
import { registerLogDirective } from "./log.directive";

export enum DirectiveNames {
  consoleLog = "consoleLog",
}

export function useLogDirective(args = {}) {
  return {
    name: DirectiveNames.consoleLog,
    args: args,
  };
}

export function registerDirectives(schema: GraphQLSchema): GraphQLSchema {
  schema = registerLogDirective(schema);
  return schema;
}

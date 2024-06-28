/*
## quote:
1. https://docs.arangodb.com/3.11/aql/graphs/traversals/
*/
import SchemaBuilder, { ObjectFieldBuilder } from "@pothos/core";
import DirectivePlugin from "@pothos/plugin-directives";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import {
  DateTimeResolver,
  DurationResolver,
  JSONResolver,
  NonNegativeIntResolver,
  PositiveIntResolver,
} from "graphql-scalars";
import { Duration } from "moment";
import { GQLContext } from "@/lib/graphql.server";
import { DirectiveNames } from "./directives";

type DirectiveTypes = {
  [DirectiveNames.consoleLog]: {
    locations: "FIELD_DEFINITION";
  };
};

type UserSchemaType = {
  Directives: DirectiveTypes;
  Context: GQLContext;
  DefaultFieldNullability: false;
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
    Duration: {
      Input: Duration;
      Output: Duration;
    };
    JSON: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Input: Record<string, any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Output: Record<string, any>;
    };
    NonNegativeInt: {
      Input: number;
      Output: number;
    };
    PositiveInt: {
      Input: number;
      Output: number;
    };
  };
};

export const builder = new SchemaBuilder<UserSchemaType>({
  plugins: [DirectivePlugin, SimpleObjectsPlugin],
});

// If you want to isolate a field out, you would use this type to get full typescripting info
export type PothosFieldType<ParentType> = ObjectFieldBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<UserSchemaType>,
  ParentType
>;

// We create empty root query, mutation, and subscription
// because we'll define individual nodes in other files
// since those nodes can have multiple resolvers and possibly
// can lead to really large and hard to read/navigate files
builder.queryType({});
builder.mutationType({});
builder.subscriptionType({});
builder.addScalarType("DateTime", DateTimeResolver, {});
builder.addScalarType("Duration", DurationResolver, {});
builder.addScalarType("JSON", JSONResolver, {});
builder.addScalarType("NonNegativeInt", NonNegativeIntResolver, {});
builder.addScalarType("PositiveInt", PositiveIntResolver, {});

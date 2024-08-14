/*
## quote:
1. https://pothos-graphql.dev/docs/guide/generating-client-types
2. https://the-guild.dev/graphql/codegen/plugins
*/

import { printSchema } from "graphql/utilities";
import type { CodegenConfig } from "@graphql-codegen/cli";

import { schema } from "@/lib/properties";

// pnpm codegen
const config: CodegenConfig = {
  schema: printSchema(schema),
  documents: ["app/gql/*.ts"],
  generates: {
    "app/gql/types.generated.ts": { plugins: ["typescript"] },
    "app/gql/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "types.generated.ts",
      },
      plugins: ["typescript-operations", "typed-document-node"],
    },
  },
  config: {
    scalars: {
      Duration: "string",
      DateTime: "Date",
      JSON: "Record",
      NonNegativeInt: "number",
      PositiveInt: "number",
    },
  },
};

export default config;

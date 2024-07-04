import { printSchema } from 'graphql/utilities';
import type { CodegenConfig } from "@graphql-codegen/cli";

import { schema } from "@/lib/properties"

// pnpm codegen
const config: CodegenConfig = {
  schema: printSchema(schema),
  documents: ['app/gql/*.ts'],
  generates: {
    // 'app/gql/': {
    //   preset: 'client',
    //   plugins: [],
    // },
    'schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      },
    },
  },
  config: {
    scalars: {
      Duration: 'string',
      DateTime: 'Date',
      JSON: 'Record',
      NonNegativeInt: 'number',
      PositiveInt: 'number',
    },
  },
};

export default config;

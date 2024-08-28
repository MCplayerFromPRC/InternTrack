import * as Types from "./types.generated";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type CreateCheckpointMutationVariables = Types.Exact<{
  input: Types.CkptInput;
}>;

export type CreateCheckpointMutation = {
  __typename?: "Mutation";
  createCheckpoint: {
    __typename?: "Checkpoint";
    id: string;
    key: string;
    revision: string;
    md5: string;
    config: string;
    step: number;
    path: string;
    isSnapshot: boolean;
    isDelivery: boolean;
    isRewardModel: boolean;
    saveTime: Date;
  };
};

export type CreateCkptStepMutationVariables = Types.Exact<{
  input: Types.CkptStepInput;
}>;

export type CreateCkptStepMutation = {
  __typename?: "Mutation";
  createCkptStep: {
    __typename?: "CkptStep";
    id: string;
    key: string;
    from: string;
    to: string;
    steps: number;
    tokens: number;
    duration: string;
  };
};

export type CreateResumeCkptMutationVariables = Types.Exact<{
  input: Types.ResumeCkptInput;
}>;

export type CreateResumeCkptMutation = {
  __typename?: "Mutation";
  createResumeCkpt: {
    __typename?: "ResumeCkpt";
    id: string;
    key: string;
    revision: string;
    from: string;
    to: string;
  };
};

export type CreateTrainConfigMutationVariables = Types.Exact<{
  input: Types.TrainConfigInput;
}>;

export type CreateTrainConfigMutation = {
  __typename?: "Mutation";
  createTrainConfig: {
    __typename?: "TrainConfig";
    id: string;
    key: string;
    revision: string;
    task: string;
    configContent: string;
    startStep: number;
    modelConfig: Record<string, any>;
    dataConfig: Record<string, any>;
    optimizerConfig: Record<string, any>;
    parallelConfig: Record<string, any>;
  };
};

export type DeleteEvalResultMutationVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars["String"]>;
  ckptId?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export type DeleteEvalResultMutation = {
  __typename?: "Mutation";
  deleteEvalResult: {
    __typename?: "EvalResult";
    id: string;
    key: string;
    revision: string;
    ckpt: string;
    finishTime?: Date | null;
    logFolder?: string | null;
    isValid: boolean;
    scores: Array<{
      __typename?: "EvalResultScore";
      datasetMd5: string;
      datasetName: string;
      subsetName: string;
      metric: string;
      mode: string;
      score: number;
    }>;
  };
};

export const CreateCheckpointDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createCheckpoint" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CkptInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createCheckpoint" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "checkpoint" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "checkpoint" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Checkpoint" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "key" } },
          { kind: "Field", name: { kind: "Name", value: "revision" } },
          { kind: "Field", name: { kind: "Name", value: "md5" } },
          { kind: "Field", name: { kind: "Name", value: "config" } },
          { kind: "Field", name: { kind: "Name", value: "step" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "isSnapshot" } },
          { kind: "Field", name: { kind: "Name", value: "isDelivery" } },
          { kind: "Field", name: { kind: "Name", value: "isRewardModel" } },
          { kind: "Field", name: { kind: "Name", value: "saveTime" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCheckpointMutation,
  CreateCheckpointMutationVariables
>;
export const CreateCkptStepDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createCkptStep" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CkptStepInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createCkptStep" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "step" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "step" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "CkptStep" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "key" } },
          { kind: "Field", name: { kind: "Name", value: "from" } },
          { kind: "Field", name: { kind: "Name", value: "to" } },
          { kind: "Field", name: { kind: "Name", value: "steps" } },
          { kind: "Field", name: { kind: "Name", value: "tokens" } },
          { kind: "Field", name: { kind: "Name", value: "duration" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCkptStepMutation,
  CreateCkptStepMutationVariables
>;
export const CreateResumeCkptDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createResumeCkpt" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ResumeCkptInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createResumeCkpt" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "resumeCkpt" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "resumeCkpt" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ResumeCkpt" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "key" } },
          { kind: "Field", name: { kind: "Name", value: "revision" } },
          { kind: "Field", name: { kind: "Name", value: "from" } },
          { kind: "Field", name: { kind: "Name", value: "to" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateResumeCkptMutation,
  CreateResumeCkptMutationVariables
>;
export const CreateTrainConfigDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createTrainConfig" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TrainConfigInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTrainConfig" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "trainConfig" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "trainConfig" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "TrainConfig" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "key" } },
          { kind: "Field", name: { kind: "Name", value: "revision" } },
          { kind: "Field", name: { kind: "Name", value: "task" } },
          { kind: "Field", name: { kind: "Name", value: "configContent" } },
          { kind: "Field", name: { kind: "Name", value: "startStep" } },
          { kind: "Field", name: { kind: "Name", value: "modelConfig" } },
          { kind: "Field", name: { kind: "Name", value: "dataConfig" } },
          { kind: "Field", name: { kind: "Name", value: "optimizerConfig" } },
          { kind: "Field", name: { kind: "Name", value: "parallelConfig" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateTrainConfigMutation,
  CreateTrainConfigMutationVariables
>;
export const DeleteEvalResultDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteEvalResult" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ckptId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteEvalResult" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ckptId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ckptId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "evalResult" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "evalScore" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "EvalResultScore" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "datasetMd5" } },
          { kind: "Field", name: { kind: "Name", value: "datasetName" } },
          { kind: "Field", name: { kind: "Name", value: "subsetName" } },
          { kind: "Field", name: { kind: "Name", value: "metric" } },
          { kind: "Field", name: { kind: "Name", value: "mode" } },
          { kind: "Field", name: { kind: "Name", value: "score" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "evalResult" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "EvalResult" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "key" } },
          { kind: "Field", name: { kind: "Name", value: "revision" } },
          { kind: "Field", name: { kind: "Name", value: "ckpt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "scores" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "evalScore" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "finishTime" } },
          { kind: "Field", name: { kind: "Name", value: "logFolder" } },
          { kind: "Field", name: { kind: "Name", value: "isValid" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteEvalResultMutation,
  DeleteEvalResultMutationVariables
>;

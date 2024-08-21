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
    step: number;
    config: string;
    isDelivery: boolean;
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
    from: string;
    to: string;
    isSameTask: boolean;
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
    modelName: string;
  };
};

export type CreateRoadmapMutationVariables = Types.Exact<{
  ckptList: Array<Types.CkptInput> | Types.CkptInput;
  ckptStepList: Array<Types.CkptStepInput> | Types.CkptStepInput;
  trainConfigList: Array<Types.TrainConfigInput> | Types.TrainConfigInput;
  resumeCkptList: Array<Types.ResumeCkptInput> | Types.ResumeCkptInput;
}>;

export type CreateRoadmapMutation = {
  __typename?: "Mutation";
  createRoadmap: {
    __typename?: "Roadmap";
    ckptList: Array<{
      __typename?: "Checkpoint";
      id: string;
      key: string;
      revision: string;
      md5: string;
      step: number;
      config: string;
      isDelivery: boolean;
    }>;
    ckptStepList: Array<{
      __typename?: "CkptStep";
      id: string;
      key: string;
      from: string;
      to: string;
      tokens: number;
      duration: string;
    }>;
    trainConfigList: Array<{
      __typename?: "TrainConfig";
      id: string;
      key: string;
      modelName: string;
    }>;
    resumeCkptList: Array<{
      __typename?: "ResumeCkpt";
      id: string;
      key: string;
      from: string;
      to: string;
      isSameTask: boolean;
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
          { kind: "Field", name: { kind: "Name", value: "step" } },
          { kind: "Field", name: { kind: "Name", value: "config" } },
          { kind: "Field", name: { kind: "Name", value: "isDelivery" } },
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
          { kind: "Field", name: { kind: "Name", value: "from" } },
          { kind: "Field", name: { kind: "Name", value: "to" } },
          { kind: "Field", name: { kind: "Name", value: "isSameTask" } },
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
          { kind: "Field", name: { kind: "Name", value: "modelName" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateTrainConfigMutation,
  CreateTrainConfigMutationVariables
>;
export const CreateRoadmapDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createRoadmap" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ckptList" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "CkptInput" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ckptStepList" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "CkptStepInput" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "trainConfigList" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "TrainConfigInput" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "resumeCkptList" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "ResumeCkptInput" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createRoadmap" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "ckptList" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ckptList" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ckptStepList" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ckptStepList" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "trainConfigList" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "trainConfigList" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "resumeCkptList" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "resumeCkptList" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "roadmap" },
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
          { kind: "Field", name: { kind: "Name", value: "step" } },
          { kind: "Field", name: { kind: "Name", value: "config" } },
          { kind: "Field", name: { kind: "Name", value: "isDelivery" } },
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
          { kind: "Field", name: { kind: "Name", value: "tokens" } },
          { kind: "Field", name: { kind: "Name", value: "duration" } },
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
          { kind: "Field", name: { kind: "Name", value: "modelName" } },
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
          { kind: "Field", name: { kind: "Name", value: "from" } },
          { kind: "Field", name: { kind: "Name", value: "to" } },
          { kind: "Field", name: { kind: "Name", value: "isSameTask" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "roadmap" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Roadmap" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ckptList" },
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
          {
            kind: "Field",
            name: { kind: "Name", value: "ckptStepList" },
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
          {
            kind: "Field",
            name: { kind: "Name", value: "trainConfigList" },
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
          {
            kind: "Field",
            name: { kind: "Name", value: "resumeCkptList" },
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
  ],
} as unknown as DocumentNode<
  CreateRoadmapMutation,
  CreateRoadmapMutationVariables
>;

import * as Types from './types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type CheckpointFragment = { __typename?: 'Checkpoint', id: string, key: string, revision: string, md5: string, config: string, step: number, path: string, isSnapshot: boolean, isDelivery: boolean, isRewardModel: boolean, saveTime: Date };

export type StepFragment = { __typename?: 'CkptStep', id: string, key: string, from: string, to: string, steps: number, tokens: number, duration: string };

export type TrainTaskFragment = { __typename?: 'TrainTask', id: string, key: string, revision: string, name: string, type: string, desc: string };

export type TrainConfigFragment = { __typename?: 'TrainConfig', id: string, key: string, revision: string, task: string, configContent: string, startStep: number, modelConfig: Record, dataConfig: Record, optimizerConfig: Record, parallelConfig: Record };

export type ResumeCkptFragment = { __typename?: 'ResumeCkpt', id: string, key: string, revision: string, from: string, to: string };

export type EvalScoreFragment = {
  __typename?: "EvalResultScore";
  datasetMd5: string;
  datasetName: string;
  subsetName: string;
  metric: string;
  mode: string;
  score: number;
};

export type EvalResultFragment = {
  __typename?: "EvalResult";
  id: string;
  key: string;
  revision: string;
  ckpt: string;
  finishTime: Date;
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

export type NodeFragment = {
  __typename?: "RoadmapNode";
  id: string;
  key: string;
  revision: string;
  type: string;
  isDeliveryBranch: boolean;
  taskName?: string | null;
  taskDesc?: string | null;
  md5?: string | null;
  config?: string | null;
  step?: number | null;
  isSnapshot?: boolean | null;
  isDelivery?: boolean | null;
  isRewardModel?: boolean | null;
  saveTime?: Date | null;
  ckptPath?: string | null;
  startStep?: number | null;
  stopStep?: number | null;
};

export type LineFragment = { __typename?: 'RoadmapLine', id?: string | null, key?: string | null, revision?: string | null, type: string, from: string, to: string, steps?: number | null, tokens?: number | null, duration?: string | null };

export type WarningFragment = { __typename?: 'RoadmapWarning', id: string, message: string };

export type RoadmapFragment = { __typename?: 'Roadmap', nodes: Array<{ __typename?: 'RoadmapNode', id: string, key: string, revision: string, type: string, isDeliveryBranch: boolean, taskName?: string | null, taskDesc?: string | null, md5?: string | null, config?: string | null, step?: number | null, isSnapshot?: boolean | null, isDelivery?: boolean | null, isRewardModel?: boolean | null, saveTime?: Date | null, ckptPath?: string | null, startStep?: number | null, stopStep?: number | null }>, lines: Array<{ __typename?: 'RoadmapLine', id?: string | null, key?: string | null, revision?: string | null, type: string, from: string, to: string, steps?: number | null, tokens?: number | null, duration?: string | null }>, warnings?: Array<{ __typename?: 'RoadmapWarning', id: string, message: string }> | null };

export type TrainConfigQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export type TrainConfigQuery = {
  __typename?: "Query";
  trainConfig?: {
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
  } | null;
};

export type EvalResultQueryVariables = Types.Exact<{
  ckptId?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export type EvalResultQuery = {
  __typename?: "Query";
  evalResult?: {
    __typename?: "EvalResult";
    id: string;
    key: string;
    revision: string;
    ckpt: string;
    finishTime: Date;
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
  } | null;
};

export type RoadmapQueryVariables = Types.Exact<{
  keyword?: Types.InputMaybe<Types.Scalars["String"]>;
  viewType?: Types.InputMaybe<Types.Scalars["String"]>;
  limit?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;


export const CheckpointFragmentDoc = {
  kind: "Document",
  definitions: [
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
} as unknown as DocumentNode<CheckpointFragment, unknown>;
export const StepFragmentDoc = {
  kind: "Document",
  definitions: [
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
} as unknown as DocumentNode<StepFragment, unknown>;
export const TrainTaskFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "trainTask" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "TrainTask" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "key" } },
          { kind: "Field", name: { kind: "Name", value: "revision" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "desc" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TrainTaskFragment, unknown>;
export const ResumeCkptFragmentDoc = {
  kind: "Document",
  definitions: [
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
} as unknown as DocumentNode<ResumeCkptFragment, unknown>;
export const TrainConfigDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TrainConfig" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "trainConfig" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
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
} as unknown as DocumentNode<TrainConfigQuery, TrainConfigQueryVariables>;
export const EvalResultDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "EvalResult" },
      variableDefinitions: [
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
            name: { kind: "Name", value: "evalResult" },
            arguments: [
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
} as unknown as DocumentNode<EvalResultQuery, EvalResultQueryVariables>;
export const RoadmapDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Roadmap" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "keyword" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "viewType" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "roadmap" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "keyword" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "keyword" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "viewType" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "viewType" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
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
      name: { kind: "Name", value: "node" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "RoadmapNode" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "key" } },
          { kind: "Field", name: { kind: "Name", value: "revision" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "isDeliveryBranch" } },
          { kind: "Field", name: { kind: "Name", value: "taskName" } },
          { kind: "Field", name: { kind: "Name", value: "taskDesc" } },
          { kind: "Field", name: { kind: "Name", value: "md5" } },
          { kind: "Field", name: { kind: "Name", value: "config" } },
          { kind: "Field", name: { kind: "Name", value: "step" } },
          { kind: "Field", name: { kind: "Name", value: "isSnapshot" } },
          { kind: "Field", name: { kind: "Name", value: "isDelivery" } },
          { kind: "Field", name: { kind: "Name", value: "isRewardModel" } },
          { kind: "Field", name: { kind: "Name", value: "saveTime" } },
          { kind: "Field", name: { kind: "Name", value: "ckptPath" } },
          { kind: "Field", name: { kind: "Name", value: "saveTime" } },
          { kind: "Field", name: { kind: "Name", value: "startStep" } },
          { kind: "Field", name: { kind: "Name", value: "stopStep" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "line" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "RoadmapLine" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "key" } },
          { kind: "Field", name: { kind: "Name", value: "revision" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "from" } },
          { kind: "Field", name: { kind: "Name", value: "to" } },
          { kind: "Field", name: { kind: "Name", value: "steps" } },
          { kind: "Field", name: { kind: "Name", value: "tokens" } },
          { kind: "Field", name: { kind: "Name", value: "duration" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "warning" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "RoadmapWarning" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "message" } },
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
            name: { kind: "Name", value: "nodes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "node" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "lines" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "line" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "warnings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "warning" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RoadmapQuery, RoadmapQueryVariables>;

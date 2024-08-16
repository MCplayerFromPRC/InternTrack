import * as Types from "./types.generated";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type CheckpointFragment = {
  __typename?: "Checkpoint";
  id: string;
  key: string;
  revision: string;
  md5: string;
  step: number;
  config: string;
  isDelivery: boolean;
};

export type StepFragment = {
  __typename?: "CkptStep";
  id: string;
  key: string;
  from: string;
  to: string;
  tokens: number;
  duration: string;
};

export type TrainConfigFragment = {
  __typename?: "TrainConfig";
  id: string;
  key: string;
  modelName: string;
};

export type ResumeCkptFragment = {
  __typename?: "ResumeCkpt";
  id: string;
  key: string;
  from: string;
  to: string;
  isSameTask: boolean;
};

export type RoadmapFragment = {
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

export type RoadmapQueryVariables = Types.Exact<{ [key: string]: never }>;

export type RoadmapQuery = {
  __typename?: "Query";
  roadmap?: {
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
  } | null;
};

export const RoadmapDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Roadmap" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "roadmap" },
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
} as unknown as DocumentNode<RoadmapQuery, RoadmapQueryVariables>;

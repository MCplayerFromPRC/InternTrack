import gql from "graphql-tag";
import {
  checkpoint,
  ckptStep,
  resumeCkpt,
  trainConfig,
  roadmap,
} from "./fragments";

export const createCheckpoint = gql`
  mutation createCheckpoint($input: CkptInput!) {
    createCheckpoint(input: $input) {
      ...checkpoint
    }
  }

  ${checkpoint}
`;

export const createCkptStep = gql`
  mutation createCkptStep($input: CkptStepInput!) {
    createCkptStep(input: $input) {
      ...step
    }
  }

  ${ckptStep}
`;

export const createResumeCkpt = gql`
  mutation createResumeCkpt($input: ResumeCkptInput!) {
    createResumeCkpt(input: $input) {
      ...resumeCkpt
    }
  }

  ${resumeCkpt}
`;

export const createTrainConfig = gql`
  mutation createTrainConfig($input: TrainConfigInput!) {
    createTrainConfig(input: $input) {
      ...trainConfig
    }
  }

  ${trainConfig}
`;

export const createRoadmap = gql`
  mutation createRoadmap(
    $ckptList: [CkptInput!]!
    $ckptStepList: [CkptStepInput!]!
    $trainConfigList: [TrainConfigInput!]!
    $resumeCkptList: [ResumeCkptInput!]!
  ) {
    createRoadmap(
      ckptList: $ckptList
      ckptStepList: $ckptStepList
      trainConfigList: $trainConfigList
      resumeCkptList: $resumeCkptList
    ) {
      ...roadmap
    }
  }

  ${roadmap}
`;

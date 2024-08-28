import gql from "graphql-tag";
import {
  checkpoint,
  ckptStep,
  resumeCkpt,
  trainConfig,
  evalResult,
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

export const deleteEvalResult = gql`
  mutation deleteEvalResult($id: String, $ckptId: String) {
    deleteEvalResult(id: $id, ckptId: $ckptId) {
      ...evalResult
    }
  }

  ${evalResult}
`;

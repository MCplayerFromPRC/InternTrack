/*
## quote:
1. https://github.com/theogravity/graphql-pothos-server-example/blob/main/src/gql/documents/fragments.ts
2. https://www.apollographql.com/docs/react/data/fragments/
3. https://graphql.org/learn/queries/#fragments
4. https://github.com/dotansimha/graphql-code-generator-community/tree/main/packages/plugins/typescript
*/

import gql from "graphql-tag";

export const checkpoint = gql`
  fragment checkpoint on Checkpoint {
    id
    key
    revision
    md5
    config
    step
    path
    isSnapshot
    isDelivery
    isRewardModel
    saveTime
  }
`;

export const ckptStep = gql`
  fragment step on CkptStep {
    id
    key
    from
    to
    steps
    tokens
    duration
  }
`;

export const trainTask = gql`
  fragment trainTask on TrainTask {
    id
    key
    revision
    name
    type
    desc
  }
`;

export const trainConfig = gql`
  fragment trainConfig on TrainConfig {
    id
    key
    revision
    task
    configContent
    startStep
    modelConfig
    dataConfig
    optimizerConfig
    parallelConfig
  }
`;

export const resumeCkpt = gql`
  fragment resumeCkpt on ResumeCkpt {
    id
    key
    revision
    from
    to
  }
`;

export const evalScore = gql`
  fragment evalScore on EvalResultScore {
    datasetMd5
    datasetName
    subsetName
    metric
    mode
    score
  }
`;

export const evalResult = gql`
  fragment evalResult on EvalResult {
    id
    key
    revision
    ckpt
    scores {
      ...evalScore
    }
    finishTime
    logFolder
    isValid
  }

  ${evalScore}
`;

export const node = gql`
  fragment node on RoadmapNode {
    id
    key
    revision
    type
    isDeliveryBranch
    taskName
    taskDesc
    md5
    config
    step
    isSnapshot
    isDelivery
    isRewardModel
    saveTime
    ckptPath
    saveTime
    startStep
    stopStep
  }
`;

export const line = gql`
  fragment line on RoadmapLine {
    id
    key
    revision
    type
    from
    to
    steps
    tokens
    duration
  }
`;

export const warning = gql`
  fragment warning on RoadmapWarning {
    id
    message
  }
`;

export const roadmap = gql`
  fragment roadmap on Roadmap {
    nodes {
      ...node
    }
    lines {
      ...line
    }
    warnings {
      ...warning
    }
  }

  ${node}
  ${line}
  ${warning}
`;

export const getTrainConfig = gql`
  query TrainConfig($id: String) {
    trainConfig(id: $id) {
      ...trainConfig
    }
  }

  ${trainConfig}
`;

export const getEvalResult = gql`
  query EvalResult($ckptId: String) {
    evalResult(ckptId: $ckptId) {
      ...evalResult
    }
  }

  ${evalResult}
`;

export const getRoadmap = gql`
<<<<<<< HEAD
  query Roadmap($keyword: String, $viewType: String) {
    roadmap(keyword: $keyword, viewType: $viewType) {
=======
  query Roadmap($keyword: String, $viewType: String, $limit: Int) {
    roadmap(keyword: $keyword, viewType: $viewType, limit: $limit) {
>>>>>>> main
      ...roadmap
    }
  }

  ${roadmap}
`;

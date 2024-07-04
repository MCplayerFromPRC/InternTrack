import gql from 'graphql-tag';

export const checkpoint = gql`
fragment checkpoint on Checkpoint {
  id
  key
  revision
  md5
  step
  config
  isDelivery
}
`

export const ckptStep = gql`
fragment step on CkptStep {
  id
  key
  from
  to
  tokens
  duration
}
`

export const trainConfig = gql`
fragment trainConfig on TrainConfig {
  id
  key
  modelName
}
`

export const resumeCkpt = gql`
fragment resumeCkpt on ResumeCkpt {
  id
  key
  from
  to
  isSameTask
}
`

export const roadmap = gql`
fragment roadmap on Roadmap {
  ckptList {
      ...checkpoint
  }
  ckptStepList {
      ...step
  }
  trainConfigList {
      ...trainConfig
  }
  resumeCkptList {
      ...resumeCkpt
  }
}

${checkpoint}
${ckptStep}
${trainConfig}
${resumeCkpt}
`;
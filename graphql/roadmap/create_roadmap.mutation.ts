import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { RoadmapType } from "./roadmap.type";
import { CkptInput, createCkptMutation } from "../checkpoint/create_checkpoint.mutation";
import { CkptStepInput, createCkptStepMutation } from "../ckpt_step/create_ckpt_step.mutation";
import { TrainConfigInput, createTrainConfigMutation } from "../train_config/create_train_config.mutation";
import { ResumeCkptInput, createResumeCkptMutation } from "../resume_ckpt/create_resume_ckpt.mutation";
import { Checkpoint, CkptStep, TrainConfig, ResumeCkpt } from "@/models";


builder.mutationField("createRoadmap", (t) => {
  return t.field({
    // We feed in the Post model, which pothos will map to the Post type we created in post.type.ts
    type: RoadmapType,
    args: {
      ckptList: t.arg({ type: [CkptInput], required: true }),
      ckptStepList: t.arg({ type: [CkptStepInput], required: true }),
      trainConfigList: t.arg({ type: [TrainConfigInput], required: true }),
      resumeCkptList: t.arg({ type: [ResumeCkptInput], required: true }),
    },
    nullable: false,
    resolve: (root, args, context) => {
      return createRoadmapMutation({
        ckptList: args.ckptList as [Checkpoint],
        ckptStepList: args.ckptStepList.map(({from, to, ...others}) => ({
          _from: from, 
          _to: to, 
          ...others
        })) as [CkptStep],
        trainConfigList: args.trainConfigList as [TrainConfig],
        resumeCkptList: args.resumeCkptList.map(({from, to, ...others}) => ({
          _from: from, 
          _to: to, 
          ...others
        })) as [ResumeCkpt],
      }, context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createRoadmapMutation(
  {
    ckptList,
    ckptStepList,
    trainConfigList,
    resumeCkptList,
  }: {
    ckptList: [Checkpoint],
    ckptStepList: [CkptStep],
    trainConfigList: [TrainConfig],
    resumeCkptList: [ResumeCkpt],
  },
  context: GQLContext,
) {
  ckptList.map(ckpt=>createCkptMutation(ckpt, context))
  ckptStepList.map(ckptStep=>createCkptStepMutation(ckptStep, context))
  trainConfigList.map(trainConfig=>createTrainConfigMutation(trainConfig, context))
  resumeCkptList.map(resumeCkpt=>createResumeCkptMutation(resumeCkpt, context))
  return {
    ckptList,
    ckptStepList,
    trainConfigList,
    resumeCkptList,
  };
}

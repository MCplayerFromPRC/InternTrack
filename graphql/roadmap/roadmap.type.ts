import { ObjectRef } from "@pothos/core";
import { Roadmap } from "@/models";
import { builder } from "@/graphql/builder";
import { CheckpointType } from "../checkpoint/checkpoint.type"
import { CkptStepType } from "../ckpt_step/ckpt_step.type"
import { TrainConfigType } from "../train_config/train_config.type"
import { ResumeCkptType } from "../resume_ckpt/resume_ckpt.type"

const type_name = "Roadmap";
export const RoadmapType: ObjectRef<Roadmap> = builder.objectType(
  Roadmap,
  {
    name: type_name,
    description: "InternLM Roadmap",
    fields: (t) => ({
      ckptList: t.expose("ckptList", { type: [CheckpointType], }),
      ckptStepList: t.expose("ckptStepList", { type: [CkptStepType] }),
      trainConfigList: t.expose("trainConfigList", { type: [TrainConfigType] }),
      resumeCkptList: t.expose("resumeCkptList", { type: [ResumeCkptType] }),
    }),
  },
);

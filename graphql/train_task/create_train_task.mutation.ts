import { GQLContext } from "@/lib/properties";
import { removeNullProperties } from "@/lib/utils";
import { builder } from "@/graphql/builder";
import { TrainTask } from "@/models";
import { TrainTaskType } from "./train_task.type";

export const TaskType = builder.enumType("TaskType", {
  values: ["pretrain", "sft", "rlhf_rm", "rlhf_ppo"] as const,
});

// 还需补充创建时添加ResumeCkpt请求逻辑
export const TrainTaskInput = builder.inputType("TrainTaskInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    type: t.field({
      type: TaskType,
      required: false,
      defaultValue: "pretrain",
    }),
    desc: t.string({ required: false }),
  }),
});

builder.mutationField("createTrainTask", (t) => {
  return t.field({
    // We feed in the Post model, which pothos will map to the Post type we created in post.type.ts
    type: TrainTaskType,
    args: {
      input: t.arg({ type: TrainTaskInput, required: true }),
    },
    nullable: false,
    resolve: (root, args, context) => {
      return createTrainTaskMutation(removeNullProperties(args.input), context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createTrainTaskMutation(
  trainTask: Partial<TrainTask>,
  context: GQLContext,
) {
  const ckpt = await context.dataSources?.task.createOne(trainTask);

  return ckpt;
}

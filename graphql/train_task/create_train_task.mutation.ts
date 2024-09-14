import { GQLContext } from "@/lib/properties";
import { removeNullProperties } from "@/lib/utils";
import { builder } from "@/graphql/builder";
import { TrainTaskType } from "./train_task.type";
import { CombinedInputType } from "../train_config/create_train_config.mutation";

export const TaskType = builder.enumType("TaskType", {
  values: ["pretrain", "sft", "rlhf_rm", "rlhf_ppo"] as const,
});

// 还需补充创建时添加ResumeCkpt请求逻辑
export const TrainTaskInput = builder.inputType("TrainTaskInput", {
  fields: (t) => ({
    name: t.string({ required: false }),
    loadCkpt: t.string({ required: false }),
    type: t.field({
      type: TaskType,
      required: false,
      defaultValue: "pretrain",
    }),
    desc: t.string({ required: false }),
    configs: t.field({ type: [CombinedInputType], required: false }),
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
      return createTrainTaskMutation(args.input, context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createTrainTaskMutation(
  taskInput: any,
  context: GQLContext,
) {
  const { loadCkpt, ...task } = taskInput;
  const trainTask = removeNullProperties(task);
  const dataSources = context.dataSources;
  if (dataSources) {
    let task;
    if (trainTask.configs.length > 0) {
      task = (await dataSources.roadmap.saveRoadmapOffline(trainTask))[0];
    } else {
      if (loadCkpt) {
        const ckpt = await dataSources.ckpts.findOnlyOneByMd5(loadCkpt);
        task = await dataSources.task.createOrUpdateOne(trainTask);
        await dataSources.resumeCkpt.createOrUpdateOne({
          _from: ckpt._id,
          _to: task._id,
        });
      } else {
        task = await dataSources.task.createOrUpdateOne(trainTask);
      }
    }

    return task;
  }
}

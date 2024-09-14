import { GQLContext } from "@/lib/properties";
import { removeNullProperties } from "@/lib/utils";
import { builder } from "@/graphql/builder";
import { TrainConfigType } from "./train_config.type";
import { TrainLogInput } from "../train_log/train_log.input";
import { TrainProcInput } from "../train_proc/train_proc.input";
import { TrainTaskInput } from "../train_task/create_train_task.mutation";
import { CkptInput } from "../checkpoint/create_checkpoint.mutation";

// 还需补充创建时添加ResumeCkpt请求逻辑
export const TrainConfigInput = builder.inputType("TrainConfigInput", {
  fields: (t) => ({
    id: t.string({ required: false }),
    task: t.string({ required: false }),
    configContent: t.string({ required: true }),
    loadCkpt: t.string({ required: false }),
    startStep: t.int({ required: false }),
    startToken: t.int({ required: false }),
    modelConfig: t.field({ type: "JSON", required: false }),
    dataConfig: t.field({ type: "JSON", required: false }),
    optimizerConfig: t.field({ type: "JSON", required: false }),
    parallelConfig: t.field({ type: "JSON", required: false }),
    ckpts: t.field({ type: [CkptInput], required: false }),
  }),
});

export const CombinedInputType = builder.inputType("CombinedInputType", {
  fields: (t) => {
    const fieldsMap: any = {};
    builder.configStore
      .getFields(TrainLogInput.name)
      .forEach(
        (value, key) => (fieldsMap[key] = t.field(value.pothosOptions as any)),
      );
    builder.configStore
      .getFields(TrainProcInput.name)
      .forEach(
        (value, key) => (fieldsMap[key] = t.field(value.pothosOptions as any)),
      );
    builder.configStore
      .getFields(TrainTaskInput.name)
      .forEach(
        (value, key) => (fieldsMap[key] = t.field(value.pothosOptions as any)),
      );
    builder.configStore
      .getFields(TrainConfigInput.name)
      .forEach(
        (value, key) => (fieldsMap[key] = t.field(value.pothosOptions as any)),
      );
    return fieldsMap;
  },
});

builder.mutationField("createTrainConfig", (t) => {
  return t.field({
    type: TrainConfigType,
    args: {
      procMd5: t.arg.string({ required: false }),
      ckptMd5: t.arg.string({ required: false }),
      input: t.arg({ type: CombinedInputType, required: true }),
    },
    nullable: false,
    resolve: (root, args, context) => {
      return createTrainConfigMutation(args, context);
    },
  });
});

export async function createTrainConfigMutation(
  args: any,
  context: GQLContext,
) {
  const { procMd5, ckptMd5, input } = args;
  const trainConfig = removeNullProperties(input);
  return context.dataSources?.roadmap.saveNewProcOnline(
    trainConfig,
    procMd5,
    ckptMd5,
  );
}

import { GQLContext } from "@/lib/properties";
import { removeNullProperties } from "@/lib/utils";
import { builder } from "@/graphql/builder";
import { TrainConfig } from "@/models";
import { TrainConfigType } from "./train_config.type";

// 还需补充创建时添加ResumeCkpt请求逻辑
export const TrainConfigInput = builder.inputType("TrainConfigInput", {
  fields: (t) => ({
    task: t.string({ required: false }),
    configContent: t.string({ required: true }),
    startStep: t.int({ required: false }),
    modelConfig: t.field({ type: "JSON", required: false }),
    dataConfig: t.field({ type: "JSON", required: false }),
    optimizerConfig: t.field({ type: "JSON", required: false }),
    parallelConfig: t.field({ type: "JSON", required: false }),
  }),
});

builder.mutationField("createTrainConfig", (t) => {
  return t.field({
    // We feed in the Post model, which pothos will map to the Post type we created in post.type.ts
    type: TrainConfigType,
    args: {
      input: t.arg({ type: TrainConfigInput, required: true }),
    },
    nullable: false,
    resolve: (root, args, context) => {
      return createTrainConfigMutation(
        removeNullProperties(args.input),
        context,
      );
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createTrainConfigMutation(
  trainConfig: Partial<TrainConfig>,
  context: GQLContext,
) {
  const ckpt = await context.dataSources?.config.createOne(trainConfig);

  return ckpt;
}

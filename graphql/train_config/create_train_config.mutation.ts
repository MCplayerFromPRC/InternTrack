import { GQLContext } from "@/lib/graphql.server";
import { builder } from "@/graphql/builder";
import { TrainConfigType } from "./train_config.type";

// 还需补充创建时添加ResumeCkpt请求逻辑
const TrainConfigInput = builder.inputType("TrainConfigInput", {
  fields: (t) => ({
    modelName: t.string({ required: true }),
    modelConfig: t.field({ type: "JSON", required: true }),
    dataConfig: t.field({ type: "JSON", required: true }),
    optimizerConfig: t.field({ type: "JSON", required: true }),
    parallelConfig: t.field({ type: "JSON", required: true }),
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
      return createTrainConfigMutation(args.input, context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createTrainConfigMutation(
  {
    modelName,
    modelConfig,
    dataConfig,
    optimizerConfig,
    parallelConfig,
  }: {
    modelName: string;
    /* eslint-disable */
    modelConfig: Record<string, any>;
    dataConfig: Record<string, any>;
    optimizerConfig: Record<string, any>;
    parallelConfig: Record<string, any>;
    /* eslint-enable */
  },
  context: GQLContext,
) {
  const ckpt = await context.dataSources?.config.createOne({
    modelName,
    modelConfig,
    dataConfig,
    optimizerConfig,
    parallelConfig,
  });

  return ckpt;
}

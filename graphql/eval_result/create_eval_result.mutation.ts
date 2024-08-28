import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { EvalResult } from "@/models";
import { EvalResultType } from "./eval_result.type";

export const ScoreInput = builder.inputType("ScoreInput", {
  fields: (t) => ({
    datasetMd5: t.string({ required: true }),
    datasetName: t.string({ required: true }),
    subsetName: t.string({ required: true }),
    metric: t.string({ required: true }),
    mode: t.string({ required: true }),
    score: t.float({ required: true }),
  }),
});

export const ResultInput = builder.inputType("ResultInput", {
  fields: (t) => ({
    ckpt: t.string({ required: true }),
    scores: t.field({
      type: [ScoreInput],
      required: true,
    }),
    finishTime: t.field({ type: "DateTime", required: true }),
    logFolder: t.string({ required: true }),
    isValid: t.boolean({ required: true }),
  }),
});

builder.mutationField("createEvalResult", (t) => {
  return t.field({
    // We feed in the Post model, which pothos will map to the Post type we created in post.type.ts
    type: EvalResultType,
    args: {
      result: t.arg({ type: ResultInput, required: true }),
    },
    nullable: false,
    resolve: (root, args, context) => {
      return createEvalResultMutation(args.result, context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createEvalResultMutation(
  result: Partial<EvalResult>,
  context: GQLContext,
) {
  await context.dataSources?.result.setInvalidByCkpt(result.ckpt!);
  const savedResult = await context.dataSources?.result.createOne(result);
  await context.dataSources?.ckptEval.createOne({
    _from: result.ckpt,
    _to: savedResult._id,
  });

  return savedResult;
}

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
    ckpt: t.string({ required: false }),
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
      ckptMd5: t.arg.string({ required: false }),
      ckptPath: t.arg.string({ required: false }),
    },
    nullable: false,
    resolve: (root, args, context) => {
      return createEvalResultMutation(
        args.result as Partial<EvalResult>,
        args.ckptMd5,
        args.ckptPath,
        context,
      );
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createEvalResultMutation(
  result: Partial<EvalResult>,
  ckptMd5: string | null | undefined,
  ckptPath: string | null | undefined,
  context: GQLContext,
) {
  let ckpt = null;
  if (typeof ckptMd5 === "string") {
    ckpt = (await context.dataSources?.ckpts.findOnlyOneByMd5(ckptMd5))!._id;
    result.ckpt = ckpt;
  } else if (typeof ckptPath === "string") {
    ckpt = (await context.dataSources?.ckpts.findOnlyOneByPath(ckptPath))!._id;
    result.ckpt = ckpt;
  } else {
    ckpt = result.ckpt;
  }
  if (!(ckpt === "string")) {
    throw new Error(`no ckpt found by md5 ${ckptMd5} or path ${ckptPath}`);
  }
  await context.dataSources?.result.setInvalidByCkpt(ckpt);
  const savedResult = await context.dataSources?.result.createOne(result);
  await context.dataSources?.ckptEval.createOne({
    _from: result.ckpt,
    _to: savedResult._id,
  });

  return savedResult;
}

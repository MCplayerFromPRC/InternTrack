import { ObjectRef } from "@pothos/core";
import { EvalResult, EvalScore } from "@/models";
import { builder } from "@/graphql/builder";
import { useLogDirective } from "@/graphql/directives";

export const EvalScoreType: ObjectRef<EvalScore> = builder.objectType(
  EvalScore,
  {
    name: "EvalResultScore",
    description: "Checkpoint's EvalResult score",
    fields: (t) => ({
      datasetMd5: t.exposeString("datasetMd5"),
      datasetName: t.exposeString("datasetName"),
      subsetName: t.exposeString("subsetName"),
      metric: t.exposeString("metric"),
      mode: t.exposeString("mode"),
      score: t.exposeInt("score"),
    }),
  },
);

const type_name = "EvalResult";
export const EvalResultType: ObjectRef<EvalResult> = builder.objectType(
  EvalResult,
  {
    name: type_name,
    description: "Checkpoint's EvalResult",
    fields: (t) => ({
      id: t.exposeString("_id", {
        directives: [useLogDirective({ type: type_name })],
      }),
      key: t.exposeString("_key"),
      revision: t.exposeString("_rev"),
      ckpt: t.exposeString("ckpt"),
      scores: t.expose("scores", { type: [EvalScoreType] }),
      finishTime: t.expose("finishTime", { type: "DateTime" }),
      logFolder: t.exposeString("logFolder", { nullable: true }),
      isValid: t.exposeBoolean("isValid"),
    }),
  },
);

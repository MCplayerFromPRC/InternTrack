import { builder } from "@/graphql/builder";

export const TrainProcInput = builder.inputType("TrainProcInput", {
  fields: (t) => ({
    md5: t.string({ required: false }),
    config: t.string({ required: false }),
    cluster: t.string({ required: false }),
    envVar: t.field({ type: "JSON", required: false }),
    gpuNum: t.field({ type: "PositiveInt", required: false }),
    startTime: t.field({ type: "DateTime", required: false }),
    endtime: t.field({ type: "DateTime", required: false }),
    currentStep: t.field({ type: "NonNegativeInt", required: false }),
    totalStep: t.field({ type: "PositiveInt", required: false }),
    state: t.string({ required: false }),
  }),
});

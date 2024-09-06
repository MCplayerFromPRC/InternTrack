import { builder } from "@/graphql/builder";

export const TrainLogInput = builder.inputType("TrainLogInput", {
  fields: (t) => ({
    config: t.string({ required: false }),
    configPath: t.string({ required: false }),
    tbFolder: t.string({ required: false }),
    logFolder: t.string({ required: false }),
  }),
});

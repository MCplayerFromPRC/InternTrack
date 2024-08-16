import { ObjectRef } from "@pothos/core";
import { TrainConfig } from "@/models";
import { builder } from "@/graphql/builder";
import { useLogDirective } from "@/graphql/directives";
import { userCkptsField } from "./train_config.ckpts";

const type_name = "TrainConfig";
export const TrainConfigType: ObjectRef<TrainConfig> = builder.objectType(
  TrainConfig,
  {
    name: type_name,
    description: "Training Config",
    fields: (t) => ({
      id: t.exposeString("_id", {
        directives: [useLogDirective({ type: type_name })],
      }),
      key: t.exposeString("_key"),
      revision: t.exposeString("_rev"),
      modelName: t.exposeString("modelName"),
      configContent: t.exposeString("configContent"),
      startStep: t.exposeInt("startStep"),
      modelConfig: t.expose("modelConfig", { type: "JSON" }),
      dataConfig: t.expose("dataConfig", { type: "JSON" }),
      optimizerConfig: t.expose("optimizerConfig", { type: "JSON" }),
      parallelConfig: t.expose("parallelConfig", { type: "JSON" }),
      ckpts: userCkptsField(t),
    }),
  },
);

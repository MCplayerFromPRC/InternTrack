import { ObjectRef } from "@pothos/core";
import { Checkpoint } from "@/models";
import { builder } from "@/graphql/builder";
import { useLogDirective } from "@/graphql/directives";

const type_name = "Checkpoint";
export const CheckpointType: ObjectRef<Checkpoint> = builder.objectType(
  Checkpoint,
  {
    name: type_name,
    description: "Large Language Model Checkpoint",
    fields: (t) => ({
      id: t.exposeString("_id", {
        directives: [useLogDirective({ type: type_name })],
      }),
      key: t.exposeString("_key"),
      revision: t.exposeString("_rev"),
      md5: t.exposeString("md5"),
      step: t.exposeInt("step"),
      isSnapshot: t.exposeBoolean("isSnapshot"),
      isDelivery: t.exposeBoolean("isDelivery"),
      isRewardModel: t.exposeBoolean("isRewardModel"),
      saveTime: t.expose("saveTime", {
        type: "DateTime",
      }),
      config: t.exposeString("config"),
    }),
  },
);

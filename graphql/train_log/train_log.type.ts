import { ObjectRef } from "@pothos/core";
import { TrainLog } from "@/models";
import { builder } from "@/graphql/builder";
import { useLogDirective } from "@/graphql/directives";

const type_name = "TrainLog";
export const TrainLogType: ObjectRef<TrainLog> = builder.objectType(TrainLog, {
  name: type_name,
  description: "The log of a Train Config",
  fields: (t) => ({
    id: t.exposeString("_id", {
      directives: [useLogDirective({ type: type_name })],
    }),
    key: t.exposeString("_key"),
    revision: t.exposeString("_rev"),
    config: t.exposeString("config"),
    configPath: t.exposeString("configPath", { nullable: true }),
    tbFolder: t.exposeString("tbFolder", { nullable: true }),
    logFolder: t.exposeString("logFolder", { nullable: true }),
  }),
});

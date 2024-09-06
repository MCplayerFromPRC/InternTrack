import { ObjectRef } from "@pothos/core";
import { TrainProc } from "@/models";
import { builder } from "@/graphql/builder";
import { useLogDirective } from "@/graphql/directives";

const type_name = "TrainProc";
export const TrainProcType: ObjectRef<TrainProc> = builder.objectType(
  TrainProc,
  {
    name: type_name,
    description: "The process of a Train Config",
    fields: (t) => ({
      id: t.exposeString("_id", {
        directives: [useLogDirective({ type: type_name })],
      }),
      key: t.exposeString("_key"),
      revision: t.exposeString("_rev"),
      md5: t.exposeString("md5"),
      config: t.exposeString("config"),
      cluster: t.exposeString("cluster", { nullable: true }),
      envVar: t.expose("envVar", { type: "JSON", nullable: true }),
      gpuNum: t.expose("gpuNum", { type: "PositiveInt", nullable: true }),
      startTime: t.expose("startTime", { type: "DateTime", nullable: true }),
      endtime: t.expose("endtime", { type: "DateTime", nullable: true }),
      currentStep: t.expose("currentStep", {
        type: "NonNegativeInt",
        nullable: true,
      }),
      totalStep: t.expose("totalStep", { type: "PositiveInt", nullable: true }),
      state: t.exposeString("state", { nullable: true }),
    }),
  },
);

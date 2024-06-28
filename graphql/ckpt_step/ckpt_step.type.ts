import { ObjectRef } from "@pothos/core";
import { CkptStep } from "@/models";
import { builder } from "@/graphql/builder";
import { useLogDirective } from "@/graphql/directives";

const type_name = "CkptStep";
export const CkptStepType: ObjectRef<CkptStep> = builder.objectType(CkptStep, {
  name: type_name,
  description: "The step between two saved checkpoints",
  fields: (t) => ({
    id: t.exposeString("_id", {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      directives: [useLogDirective({ type: type_name })],
    }),
    key: t.exposeString("_key"),
    revision: t.exposeString("_rev"),
    from: t.exposeString("_from"),
    to: t.exposeString("_to"),
    tokens: t.expose("tokens", { type: "PositiveInt" }),
    duration: t.expose("duration", { type: "Duration" }),
  }),
});

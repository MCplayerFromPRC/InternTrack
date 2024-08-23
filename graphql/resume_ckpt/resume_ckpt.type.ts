import { ObjectRef } from "@pothos/core";
import { ResumeCkpt } from "@/models";
import { builder } from "@/graphql/builder";
import { useLogDirective } from "@/graphql/directives";

const type_name = "ResumeCkpt";
export const ResumeCkptType: ObjectRef<ResumeCkpt> = builder.objectType(
  ResumeCkpt,
  {
    name: type_name,
    description: "Continue training config from checkpoints",
    fields: (t) => ({
      id: t.exposeString("_id", {
        directives: [useLogDirective({ type: type_name })],
      }),
      key: t.exposeString("_key"),
      revision: t.exposeString("_rev"),
      from: t.exposeString("_from"),
      to: t.exposeString("_to"),
    }),
  },
);

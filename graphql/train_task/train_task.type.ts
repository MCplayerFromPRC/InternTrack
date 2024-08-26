import { ObjectRef } from "@pothos/core";
import { TrainTask } from "@/models";
import { builder } from "@/graphql/builder";
import { useLogDirective } from "@/graphql/directives";
import { userConfigsField } from "./train_task.configs";

const type_name = "TrainTask";
export const TrainTaskType: ObjectRef<TrainTask> = builder.objectType(
  TrainTask,
  {
    name: type_name,
    description: "Training Task",
    fields: (t) => ({
      id: t.exposeString("_id", {
        directives: [useLogDirective({ type: type_name })],
      }),
      key: t.exposeString("_key"),
      revision: t.exposeString("_rev"),
      name: t.exposeString("name"),
      type: t.exposeString("type"),
      desc: t.exposeString("desc"),
      configs: userConfigsField(t),
    }),
  },
);

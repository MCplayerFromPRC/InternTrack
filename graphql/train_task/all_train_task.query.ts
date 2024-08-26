import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { TrainTaskType } from "./train_task.type";

builder.queryField("allTrainTasks", (t) => {
  return t.field({
    type: [TrainTaskType],
    args: {},
    description: "TrainTask",
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      return postQuery(context);
    },
  });
});

export function postQuery(context: GQLContext) {
  return context.dataSources?.task.findAll();
}

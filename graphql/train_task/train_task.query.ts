import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { TrainTaskType } from "./train_task.type";

builder.queryField("trainTask", (t) => {
  return t.field({
    type: TrainTaskType,
    args: {
      id: t.arg.string({ required: false }),
      name: t.arg.string({ required: false }),
    },
    description: "TrainTask",
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      return postQuery(args, context);
    },
  });
});

export function postQuery(args: any, context: GQLContext) {
  if (args.id) {
    return context.dataSources?.task.findOneById(args.id);
  } else if (args.name) {
    return context.dataSources?.task.findOneByName(args.name);
  }
  return null;
}

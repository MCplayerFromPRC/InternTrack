import { GQLContext } from "@/lib/graphql.server";
import { builder } from "@/graphql/builder";
import { TrainConfigType } from "./train_config.type";

builder.queryField("allTrainConfigs", (t) => {
  return t.field({
    type: [TrainConfigType],
    args: {},
    description: "TrainConfig",
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      return postQuery(context);
    },
  });
});

export function postQuery(context: GQLContext) {
  return context.dataSources?.config.findAll();
}

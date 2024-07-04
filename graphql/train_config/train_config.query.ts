import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { TrainConfigType } from "./train_config.type";

builder.queryField("trainConfig", (t) => {
  return t.field({
    type: TrainConfigType,
    args: {
      id: t.arg.string(),
    },
    description: "TrainConfig",
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      if (!args.id) {
        return null;
      }
      return postQuery(args.id, context);
    },
  });
});

export function postQuery(id: string, context: GQLContext) {
  return context.dataSources?.config.findOneById(id);
}

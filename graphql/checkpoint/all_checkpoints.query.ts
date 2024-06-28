import { GQLContext } from "@/lib/graphql.server";
import { builder } from "@/graphql/builder";
import { CheckpointType } from "./checkpoint.type";

builder.queryField("allCheckpoints", (t) => {
  return t.field({
    type: [CheckpointType],
    args: {},
    description: `All the Checkpoints`,
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      return postQuery(context);
    },
  });
});

export function postQuery(context: GQLContext) {
  return context.dataSources?.ckpts.findAll();
}

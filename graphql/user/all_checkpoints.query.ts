import { GQLContext } from "@/lib/graphql.server";
import { Checkpoint } from "@/models";
import { builder } from "@/graphql/builder";

builder.queryField("allCheckpoints", (t) => {
  return t.field({
    type: [Checkpoint],
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

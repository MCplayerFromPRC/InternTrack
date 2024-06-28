import { GQLContext } from "@/lib/graphql.server";
import { Checkpoint } from "@/models";
import { builder } from "@/graphql/builder";

builder.queryField("checkpoint", (t) => {
  return t.field({
    type: Checkpoint,
    args: {
      id: t.arg.string(),
    },
    description: "Saved Checkpoint",
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
  return context.dataSources?.ckpts.findOneById(id);
}

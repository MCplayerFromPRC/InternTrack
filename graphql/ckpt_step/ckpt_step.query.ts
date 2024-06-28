import { GQLContext } from "@/lib/graphql.server";
import { builder } from "@/graphql/builder";
import { CkptStepType } from "./ckpt_step.type";

builder.queryField("ckptStep", (t) => {
  return t.field({
    type: CkptStepType,
    args: {
      id: t.arg.string(),
    },
    description: "Query the step by id",
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
  return context.dataSources?.ckptStep.findOneById(id);
}

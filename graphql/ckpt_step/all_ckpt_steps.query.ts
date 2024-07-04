import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { CkptStepType } from "./ckpt_step.type";

builder.queryField("allCkptSteps", (t) => {
  return t.field({
    type: [CkptStepType],
    args: {},
    description: "Query the step by id",
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      return postQuery(context);
    },
  });
});

export function postQuery(context: GQLContext) {
  return context.dataSources?.ckptStep.findAll();
}

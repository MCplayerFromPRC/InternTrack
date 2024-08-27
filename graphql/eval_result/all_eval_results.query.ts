import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { EvalResultType } from "./eval_result.type";

builder.queryField("allEvalResults", (t) => {
  return t.field({
    type: [EvalResultType],
    args: {},
    description: `All the EvalResults`,
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      return postQuery(context);
    },
  });
});

export function postQuery(context: GQLContext) {
  return context.dataSources?.result.findAll();
}

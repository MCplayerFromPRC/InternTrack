import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { EvalResultType } from "./eval_result.type";

builder.queryField("evalResult", (t) => {
  return t.field({
    type: EvalResultType,
    args: {
      id: t.arg.string({ required: false }),
      ckptId: t.arg.string({ required: false }),
    },
    description: "Saved Checkpoint",
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      return postQuery(args, context);
    },
  });
});

export function postQuery(args: any, context: GQLContext) {
  if (args.id) {
    return context.dataSources?.result.findOneById(args.id);
  } else if (args.ckptId) {
    return context.dataSources?.result.findValidOneByCkpt(args.ckptId);
  }
  return null;
}

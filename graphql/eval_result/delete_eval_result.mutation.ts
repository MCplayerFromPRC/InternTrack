import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { EvalResultType } from "./eval_result.type";

builder.mutationField("deleteEvalResult", (t) => {
  return t.field({
    // We feed in the Post model, which pothos will map to the Post type we created in post.type.ts
    type: EvalResultType,
    args: {
      id: t.arg.string({ required: false }),
      ckptId: t.arg.string({ required: false }),
    },
    nullable: false,
    resolve: (root, args, context) => {
      return deleteEvalResultMutation(args, context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function deleteEvalResultMutation(args: any, context: GQLContext) {
  if (args.id) {
    return context.dataSources?.result.updateOne(
      { _id: args.id, isValid: false },
      { ttl: 300 },
      false,
      true,
    );
  } else if (args.ckptId) {
    return context.dataSources?.result.setInvalidByCkpt(args.ckptId);
  }
  return null;
}

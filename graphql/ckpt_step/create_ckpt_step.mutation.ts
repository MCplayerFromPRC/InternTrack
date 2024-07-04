import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { CkptStep } from "@/models"
import { CkptStepType } from "./ckpt_step.type";

export const CkptStepInput = builder.inputType("CkptStepInput", {
  fields: (t) => ({
    from: t.string({ required: true }),
    to: t.string({ required: true }),
    tokens: t.int({ required: true }),
    duration: t.field({ type: "Duration", required: true }),
  }),
});

builder.mutationField("createCkptStep", (t) => {
  return t.field({
    // We feed in the Post model, which pothos will map to the Post type we created in post.type.ts
    type: CkptStepType,
    args: {
      input: t.arg({ type: CkptStepInput, required: true }),
    },
    nullable: false,
    resolve: (root, args, context) => {
      const {from, to, ...others} = args.input
      const ckptStep = {
        _from: from,
        _to: to,
        ...others
      }
      return createCkptStepMutation(ckptStep, context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createCkptStepMutation(
  ckptStepInput: Partial<CkptStep>,
  context: GQLContext,
) {
  const ckpt = await context.dataSources?.ckptStep.createOne(ckptStepInput);
  return ckpt;
}

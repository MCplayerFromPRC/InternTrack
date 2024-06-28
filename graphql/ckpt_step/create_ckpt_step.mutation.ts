import { Duration } from "moment";
import { GQLContext } from "@/lib/graphql.server";
import { CkptStep } from "@/models";
import { builder } from "@/graphql/builder";

const CkptStepInput = builder.inputType("CkptStepInput", {
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
    type: CkptStep,
    args: {
      input: t.arg({ type: CkptStepInput, required: true }),
    },
    nullable: false,
    resolve: (root, args, context): Promise<CkptStep> => {
      return createCkptStepMutation(args.input, context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createCkptStepMutation(
  {
    from,
    to,
    tokens,
    duration,
  }: {
    from: string;
    to: string;
    tokens: number;
    duration: Duration;
  },
  context: GQLContext,
): Promise<CkptStep> {
  const ckpt = await context.dataSources?.ckptStep.createOne({
    _from: from,
    _to: to,
    tokens,
    duration,
  });

  return ckpt;
}

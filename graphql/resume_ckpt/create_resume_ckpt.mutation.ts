import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { ResumeCkpt } from "@/models";
import { ResumeCkptType } from "./resume_ckpt.type";

export const ResumeCkptInput = builder.inputType("ResumeCkptInput", {
  fields: (t) => ({
    from: t.string({ required: true }),
    to: t.string({ required: true }),
  }),
});

builder.mutationField("createResumeCkpt", (t) => {
  return t.field({
    // We feed in the Post model, which pothos will map to the Post type we created in post.type.ts
    type: ResumeCkptType,
    args: {
      input: t.arg({ type: ResumeCkptInput, required: true }),
    },
    nullable: false,
    resolve: (root, args, context) => {
      const { from, to, ...others } = args.input;
      const resumeCkpt = {
        _from: from,
        _to: to,
        ...others,
      };
      return createResumeCkptMutation(resumeCkpt, context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createResumeCkptMutation(
  resumeCkptInput: Partial<ResumeCkpt>,
  context: GQLContext,
) {
  const ckpt = await context.dataSources?.resumeCkpt.createOne(resumeCkptInput);
  return ckpt;
}

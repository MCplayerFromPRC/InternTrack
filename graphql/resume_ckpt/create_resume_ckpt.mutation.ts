import { GQLContext } from "@/lib/graphql.server";
import { ResumeCkpt } from "@/models";
import { builder } from "@/graphql/builder";

const ResumeCkptInput = builder.inputType("ResumeCkptInput", {
  fields: (t) => ({
    from: t.string({ required: true }),
    to: t.string({ required: true }),
    isSameTask: t.boolean({ required: true }),
  }),
});

builder.mutationField("createResumeCkpt", (t) => {
  return t.field({
    // We feed in the Post model, which pothos will map to the Post type we created in post.type.ts
    type: ResumeCkpt,
    args: {
      input: t.arg({ type: ResumeCkptInput, required: true }),
    },
    nullable: false,
    resolve: (root, args, context): Promise<ResumeCkpt> => {
      return createResumeCkptMutation(args.input, context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createResumeCkptMutation(
  {
    from,
    to,
    isSameTask,
  }: {
    from: string;
    to: string;
    isSameTask: boolean;
  },
  context: GQLContext,
): Promise<ResumeCkpt> {
  const ckpt = await context.dataSources?.resumeCkpt.createOne({
    _from: from,
    _to: to,
    isSameTask,
  });

  return ckpt;
}

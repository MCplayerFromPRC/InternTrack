import { GQLContext } from "@/lib/properties";
import { Checkpoint } from "@/models";
import { builder } from "@/graphql/builder";
import { publishCkptEvent } from "@/graphql/subscriptions/checkpoint/ckpt_events.subscription";
import { NewCkptEvent } from "@/graphql/subscriptions/checkpoint/new_checkpoint.event";

const CkptInput = builder.inputType("CkptInput", {
  fields: (t) => ({
    md5: t.string({ required: true }),
    config: t.string({ required: true }),
    step: t.int({ required: true }),
    isDelivery: t.boolean({ required: true }),
    saveTime: t.field({ type: "DateTime", required: true }),
  }),
});

builder.mutationField("createCheckpoint", (t) => {
  return t.field({
    // We feed in the Post model, which pothos will map to the Post type we created in post.type.ts
    type: Checkpoint,
    args: {
      input: t.arg({ type: CkptInput, required: true }),
    },
    nullable: false,
    resolve: (root, args, context): Promise<Checkpoint> => {
      return createCkptMutation(args.input, context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createCkptMutation(
  {
    md5,
    config,
    step,
    isDelivery,
    saveTime,
  }: {
    md5: string;
    config: string;
    step: number;
    isDelivery: boolean;
    saveTime: Date;
  },
  context: GQLContext,
): Promise<Checkpoint> {
  const ckpt = await context.dataSources?.ckpts.createOne({
    md5,
    config,
    step,
    isDelivery,
    saveTime,
  });

  await publishCkptEvent(
    new NewCkptEvent({
      result: ckpt,
    }),
    context,
  );

  return ckpt;
}

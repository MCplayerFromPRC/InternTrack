import { GQLContext } from "@/lib/properties";
import { removeNullProperties } from "@/lib/utils";
import { builder } from "@/graphql/builder";
import { publishCkptEvent } from "@/graphql/subscriptions/checkpoint/ckpt_events.subscription";
import { NewCkptEvent } from "@/graphql/subscriptions/checkpoint/new_checkpoint.event";
import { CheckpointType } from "./checkpoint.type";

export const CkptInput = builder.inputType("CkptInput", {
  fields: (t) => ({
    md5: t.string({ required: true }),
    config: t.string({ required: false }),
    step: t.int({ required: true }),
    tokens: t.int({ required: false }),
    path: t.string({ required: true }),
    isSnapshot: t.boolean({ required: false }),
    isDelivery: t.boolean({ required: false }),
    isRewardModel: t.boolean({ required: false }),
    saveTime: t.field({ type: "DateTime", required: true }),
  }),
});

builder.mutationField("createCheckpoint", (t) => {
  return t.field({
    // We feed in the Post model, which pothos will map to the Post type we created in post.type.ts
    type: CheckpointType,
    args: {
      procMd5: t.arg.string({ required: false }),
      input: t.arg({ type: CkptInput, required: true }),
    },
    nullable: false,
    resolve: (root, args, context) => {
      return createCkptMutation(args, context);
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createCkptMutation(args: any, context: GQLContext) {
  const { procMd5, input } = args;
  const checkpoint = removeNullProperties(input);
  const dataSource = context.dataSources;
  if (dataSource) {
    let ckpt;
    if (procMd5) {
      ckpt = await dataSource.roadmap.saveNewCkptOnline(checkpoint, procMd5);
    } else {
      const trx = await dataSource.ckpts.db.beginTransaction([
        dataSource.ckpts.collection,
        dataSource.ckptStep.collection,
      ]);
      const saveCkpt = dataSource.ckpts.createOrUpdateOne(checkpoint);
      ckpt = await trx.step(() => saveCkpt!);
      ckpt.tokens = checkpoint.tokens;
      const lastCkpt = await dataSource.roadmap.findLastCkptByConfig(
        ckpt.config,
      );
      const saveStep = dataSource.ckptStep.createStepByCkpts(lastCkpt, ckpt);
      await trx.step(() => saveStep);
      await trx.commit();
    }

    await publishCkptEvent(
      new NewCkptEvent({
        result: ckpt,
      }),
      context,
    );

    return ckpt;
  }
}

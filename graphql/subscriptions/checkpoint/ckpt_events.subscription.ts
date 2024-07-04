import { withFilter } from "graphql-subscriptions";
import { GQLContext } from "@/lib/properties";
import { container } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import {
  BaseCkptEvent,
  CkptEventLabel,
  IBaseCkptEvent,
} from "./ckpt_event.interface";

builder.subscriptionField("postEvents", (t) => {
  return t.field({
    type: IBaseCkptEvent,
    description: "Events related to posts",
    args: {},
    // eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-explicit-any
    subscribe: (_, {}, ctx: GQLContext, _info: any) => {
      const subscriptionResolver = generateCkptEventSubscriptionResolver({
        ctx,
      });
      return subscriptionResolver(
        _,
        {},
        ctx,
        _info,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any as AsyncIterable<unknown>;
    },
    // eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-unused-vars
    resolve: async (payload, {}, context) => {
      return payload as BaseCkptEvent;
    },
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateCkptEventSubscriptionResolver({ ctx }: { ctx: GQLContext }) {
  return withFilter(
    () => { 
      if (!ctx.pubsub) {
        throw new Error("pubsub is not available in the context.");
      }
      return ctx.pubsub.asyncIterator(CkptEventLabel);
    },
    // eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-unused-vars
    async (event: BaseCkptEvent, {}, ctx: GQLContext) => {
      // Send to all connected users to this subscription
      return true;
    },
  );
}

export async function publishCkptEvent(
  event: BaseCkptEvent,
  context: GQLContext,
) {
  await context.pubsub?.publish(CkptEventLabel, event);
}

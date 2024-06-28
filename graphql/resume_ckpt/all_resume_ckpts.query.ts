import { GQLContext } from "@/lib/graphql.server";
import { builder } from "@/graphql/builder";
import { ResumeCkptType } from "./resume_ckpt.type";

builder.queryField("allResumeCkpts", (t) => {
  return t.field({
    type: [ResumeCkptType],
    args: {
      id: t.arg.string(),
    },
    description:
      "Query the relationships all the configs and the checkpoints they resumed from",
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      return postQuery(context);
    },
  });
});

export function postQuery(context: GQLContext) {
  return context.dataSources?.resumeCkpt.findAll();
}

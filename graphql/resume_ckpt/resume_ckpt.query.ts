import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { ResumeCkptType } from "./resume_ckpt.type";

builder.queryField("resumeCkpt", (t) => {
  return t.field({
    type: ResumeCkptType,
    args: {
      id: t.arg.string(),
    },
    description: "Query the step by id",
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      if (!args.id) {
        return null;
      }
      return postQuery(args.id, context);
    },
  });
});

export function postQuery(id: string, context: GQLContext) {
  return context.dataSources?.resumeCkpt.findOneById(id);
}

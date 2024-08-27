import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { RoadmapType } from "./roadmap.type";

builder.queryField("roadmap", (t) => {
  return t.field({
    type: RoadmapType,
    args: {
      viewType: t.arg.string(),
      keyword: t.arg.string({ required: false }),
      limit: t.arg.int({ required: false }),
    },
    description: "Saved Checkpoint",
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      return postQuery(
        context,
        args.viewType || "ckpt",
        args.keyword,
        args.limit || 5,
      );
    },
  });
});

export async function postQuery(
  context: GQLContext,
  viewType: string,
  keyword: string | null | undefined,
  limit: number = 5,
) {
  let nodes: string[] | null = null;
  if (keyword) {
    nodes = [];
    const data = await context.dataSources?.search.bm25(keyword, limit);
    if (data) {
      data.forEach((node) => {
        if (node._id) {
          nodes!.push(node._id);
        }
      });
    }
  }
  return await context.dataSources?.roadmap.getGraphView(
    <"ckpt" | "config">viewType,
    nodes,
  );
}

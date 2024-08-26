import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { RoadmapType } from "./roadmap.type";

builder.queryField("roadmap", (t) => {
  return t.field({
    type: RoadmapType,
    args: {
      viewType: t.arg.string(),
      keyword: t.arg.string({ required: false }),
    },
    description: "Saved Checkpoint",
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      return postQuery(context, args.viewType || "ckpt", args.keyword);
    },
  });
});

export async function postQuery(
  context: GQLContext,
  viewType: string,
  keyword: string | null | undefined,
) {
  const nodes: string[] = [];
  if (keyword) {
    const data = await context.dataSources?.search.bm25(keyword, 5);
    if (data) {
      data.forEach((node) => {
        if (node._id) {
          nodes.push(node._id);
        }
      });
    }
  }
  return await context.dataSources?.roadmap.getGraphView(
    <"ckpt" | "config">viewType,
    nodes,
  );
}

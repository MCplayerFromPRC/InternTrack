import { GQLContext } from "@/lib/properties";
import { builder } from "@/graphql/builder";
import { RoadmapType } from "./roadmap.type";

builder.queryField("roadmap", (t) => {
  return t.field({
    type: RoadmapType,
    description: "Saved Checkpoint",
    nullable: true,
    resolve: async (parent, args, context: GQLContext) => {
      return postQuery(context);
    },
  });
});

export async function postQuery(context: GQLContext) {
  return {
    ckptList: (await context.dataSources?.ckpts.findAll()) ?? [],
    ckptStepList: (await context.dataSources?.ckptStep.findAll()) ?? [],
    trainConfigList: (await context.dataSources?.config.findAll()) ?? [],
    resumeCkptList: (await context.dataSources?.resumeCkpt.findAll()) ?? [],
  };
}

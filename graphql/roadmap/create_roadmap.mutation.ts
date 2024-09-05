import { GQLContext } from "@/lib/properties";
import { builder, MessageType } from "@/graphql/builder";
import { TrainTaskInput } from "@/graphql/train_task/create_train_task.mutation";

builder.mutationField("createRoadmap", (t) => {
  return t.field({
    // We feed in the Post model, which pothos will map to the Post type we created in post.type.ts
    type: MessageType,
    args: {
      input: t.arg({ type: [TrainTaskInput], required: true }),
    },
    nullable: false,
    resolve: (root, args, context) => {
      try {
        return createRoadmapMutation(args.input, context);
      } catch (e) {
        return {
          code: 100,
          msg: "failed",
          err: String(e),
        };
      }
    },
  });
});

// We separate out the resolver function so we can write unit tests against it
// without having to call GQL directly
export async function createRoadmapMutation(graph: any[], context: GQLContext) {
  const tasks = await context.dataSources?.roadmap.saveRoadmapOffline(graph);
  return {
    code: 0,
    data: tasks,
    msg: "success",
  };
}

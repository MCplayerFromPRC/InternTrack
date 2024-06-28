import { Checkpoint, TrainConfig } from "@/models";
import { PothosFieldType } from "@/graphql/builder";

// This is an example of splitting out a field to its own file
// in the event the field definition itself is pretty large
export function userCkptsField(t: PothosFieldType<TrainConfig>) {
  return t.field({
    type: [Checkpoint],
    description: `TrainConfig's Checkpoints`,
    resolve: async (parent, args, context): Promise<Checkpoint[]> => {
      if (!context.dataSources) {
        return [];
      }
      return context.dataSources.ckpts.findManyByConfig(parent._id);
    },
  });
}

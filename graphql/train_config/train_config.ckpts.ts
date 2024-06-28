import { PothosFieldType } from "@/graphql/builder";
import { TrainConfig } from "@/models";
import { CheckpointType } from "../checkpoint/checkpoint.type";

// This is an example of splitting out a field to its own file
// in the event the field definition itself is pretty large
export function userCkptsField(t: PothosFieldType<TrainConfig>) {
  return t.field({
    type: [CheckpointType],
    description: `TrainConfig's Checkpoints`,
    resolve: async (parent, args, context) => {
      if (!context.dataSources) {
        return [];
      }
      return context.dataSources.ckpts.findManyByConfig(parent._id);
    },
  });
}

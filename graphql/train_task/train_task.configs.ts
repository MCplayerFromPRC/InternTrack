import { PothosFieldType } from "@/graphql/builder";
import { TrainTask } from "@/models";
import { TrainConfigType } from "../train_config/train_config.type";

// This is an example of splitting out a field to its own file
// in the event the field definition itself is pretty large
export function userConfigsField(t: PothosFieldType<TrainTask>) {
  return t.field({
    type: [TrainConfigType],
    description: `TrainTask's TrainConfig`,
    resolve: async (parent, args, context) => {
      if (!context.dataSources) {
        return [];
      }
      return context.dataSources.config.findManyByTask(parent._id);
    },
  });
}

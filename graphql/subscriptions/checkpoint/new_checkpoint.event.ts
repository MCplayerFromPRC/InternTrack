import { Checkpoint } from "@/models";
import { PothosFieldType, builder } from "@/graphql/builder";
import { CheckpointType } from "@/graphql/checkpoint/checkpoint.type";
import {
  BaseCkptEvent,
  CkptEventType,
  IBaseCkptEvent,
} from "./ckpt_event.interface";

export class NewCkptEvent extends BaseCkptEvent {
  result: Checkpoint;

  constructor({ result }: { result: Checkpoint }) {
    super(CkptEventType.NewCkpt);

    this.result = result;
  }
}

builder.objectType(NewCkptEvent, {
  name: "NewPostEvent",
  description: "When a new post is created",
  interfaces: [IBaseCkptEvent],
  isTypeOf: (value: any) => {
    // This is the recommended approach to type things in isTypeOf
    // https://github.com/hayes/pothos/issues/336
    return (value as NewCkptEvent).eventType === CkptEventType.NewCkpt;
  },
  fields: (t: PothosFieldType<NewCkptEvent>) => ({
    result: t.expose("result", {
      type: CheckpointType,
    }),
  }),
});

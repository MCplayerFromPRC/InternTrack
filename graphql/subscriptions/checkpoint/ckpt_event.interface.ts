import { EnumRef, InterfaceRef } from "@pothos/core";
import { builder } from "@/graphql/builder";

export const CkptEventLabel = "CKPT_EVENT";

export enum CkptEventType {
  NewCkpt = "start",
}

export const CkptEventTypeGql: EnumRef<CkptEventType> = builder.enumType(
  CkptEventType,
  {
    name: "CkptEventType",
  },
);

export class BaseCkptEvent {
  eventType: CkptEventType;

  constructor(eventType: CkptEventType) {
    this.eventType = eventType;
  }
}

export const IBaseCkptEvent: InterfaceRef<BaseCkptEvent> =
  builder.interfaceType(BaseCkptEvent, {
    name: "IBaseCkptEvent",
    fields: (t) => ({
      eventType: t.field({
        type: CkptEventTypeGql,
        description: "Event type",
        resolve: (event) => {
          return event.eventType;
        },
      }),
    }),
  });

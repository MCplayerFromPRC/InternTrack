import { ObjectRef } from "@pothos/core";
import { Roadmap, Node, Line, Warning } from "@/models";
import { builder } from "@/graphql/builder";

export const NodeType: ObjectRef<Partial<Node>> = builder.objectType(Node, {
  name: "RoadmapNode",
  description: "InternLM Roadmap Node",
  fields: (t) => ({
    id: t.exposeString("id"),
    key: t.exposeString("key"),
    revision: t.exposeString("revision"),
    type: t.exposeString("type"),
    isDeliveryBranch: t.exposeBoolean("isDeliveryBranch"),
    taskName: t.exposeString("taskName", { nullable: true }),
    taskDesc: t.exposeString("taskDesc", { nullable: true }),
    md5: t.exposeString("md5", { nullable: true }),
    isSnapshot: t.exposeBoolean("isSnapshot", { nullable: true }),
    isDelivery: t.exposeBoolean("isDelivery", { nullable: true }),
    isRewardModel: t.exposeBoolean("isRewardModel", { nullable: true }),
    ckptPath: t.exposeString("ckptPath", { nullable: true }),
    saveTime: t.expose("saveTime", {
      type: "DateTime",
      nullable: true,
    }),
    step: t.exposeInt("step", { nullable: true }),
    startStep: t.exposeInt("startStep", { nullable: true }),
    stopStep: t.exposeInt("stopStep", { nullable: true }),
  }),
});

export const LineType: ObjectRef<Partial<Line>> = builder.objectType(Line, {
  name: "RoadmapLine",
  description: "InternLM Roadmap Line",
  fields: (t) => ({
    id: t.exposeString("id", { nullable: true }),
    key: t.exposeString("key", { nullable: true }),
    revision: t.exposeString("revision", { nullable: true }),
    type: t.exposeString("type"),
    from: t.exposeString("from"),
    to: t.exposeString("to"),
    steps: t.expose("steps", { type: "PositiveInt", nullable: true }),
    tokens: t.expose("tokens", { type: "PositiveInt", nullable: true }),
    duration: t.expose("duration", { type: "Duration", nullable: true }),
  }),
});

export const WarningType: ObjectRef<Warning> = builder.objectType(Warning, {
  name: "RoadmapWarning",
  description: "InternLM Roadmap Warning",
  fields: (t) => ({
    id: t.exposeString("id"),
    message: t.exposeString("message"),
  }),
});

export const RoadmapType: ObjectRef<Roadmap> = builder.objectType(Roadmap, {
  name: "Roadmap",
  description: "InternLM Roadmap",
  fields: (t) => ({
    nodes: t.expose("nodes", { type: [NodeType] }),
    lines: t.expose("lines", { type: [LineType] }),
    warnings: t.expose("warnings", { type: [WarningType], nullable: true }),
  }),
});

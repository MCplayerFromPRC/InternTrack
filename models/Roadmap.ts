import { Duration } from "moment";

export class Node {
  id: string;
  key: string;
  revision: string;
  type: "task" | "config" | "ckpt";
  isDeliveryBranch: boolean;

  taskName: string;
  taskDesc: string;

  md5: string;
  config: string;
  step: number;
  isSnapshot: boolean;
  isDelivery: boolean;
  isRewardModel: boolean;
  ckptPath: string;
  saveTime: Date;

  startStep: number;
  stopStep: number;

  constructor(
    id: string,
    key: string,
    revision: string,
    type: "task" | "config" | "ckpt",
    isDeliveryBranch: boolean,
    taskName: string,
    taskDesc: string,
    md5: string,
    config: string,
    isSnapshot: boolean,
    isDelivery: boolean,
    isRewardModel: boolean,
    ckptPath: string,
    saveTime: Date,
    step: number,
    startStep: number,
    stopStep: number,
  ) {
    this.id = id;
    this.key = key;
    this.revision = revision;
    this.type = type;
    this.isDeliveryBranch = isDeliveryBranch;
    this.taskName = taskName;
    this.taskDesc = taskDesc;
    this.md5 = md5;
    this.config = config;
    this.isSnapshot = isSnapshot;
    this.isDelivery = isDelivery;
    this.isRewardModel = isRewardModel;
    this.ckptPath = ckptPath;
    this.saveTime = saveTime;
    this.step = step;
    this.startStep = startStep;
    this.stopStep = stopStep;
  }
}

export class Line {
  id: string;
  key: string;
  revision: string;
  type: "resume" | "step";

  from: string;
  to: string;

  steps: number;
  tokens: number;
  duration: Duration;

  constructor(
    id: string,
    key: string,
    revision: string,
    type: "resume" | "step",
    from: string,
    to: string,
    steps: number,
    tokens: number,
    duration: Duration,
  ) {
    this.id = id;
    this.key = key;
    this.revision = revision;
    this.type = type;
    this.from = from;
    this.to = to;
    this.steps = steps;
    this.tokens = tokens;
    this.duration = duration;
  }
}

export class Warning {
  id: string;
  message: string;

  constructor(id: string, message: string) {
    this.id = id;
    this.message = message;
  }
}

export class Roadmap {
  nodes: Partial<Node>[];
  lines: Partial<Line>[];
  warnings: Warning[];

  constructor(
    nodes: Partial<Node>[],
    lines: Partial<Line>[],
    warnings: Warning[],
  ) {
    this.nodes = nodes;
    this.lines = lines;
    this.warnings = warnings;
  }
}

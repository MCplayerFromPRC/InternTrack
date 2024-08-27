export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: string;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: Record<string, any>;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number;
  /** Integers that will have a value greater than 0. */
  PositiveInt: number;
};

/** Large Language Model Checkpoint */
export type Checkpoint = {
  __typename?: "Checkpoint";
  config: Scalars["String"];
  id: Scalars["String"];
  isDelivery: Scalars["Boolean"];
  isRewardModel: Scalars["Boolean"];
  isSnapshot: Scalars["Boolean"];
  key: Scalars["String"];
  md5: Scalars["String"];
  path: Scalars["String"];
  revision: Scalars["String"];
  saveTime: Scalars["DateTime"];
  step: Scalars["Int"];
};

export enum CkptEventType {
  NewCkpt = "NewCkpt",
}

export type CkptInput = {
  config: Scalars["String"];
  isDelivery?: InputMaybe<Scalars["Boolean"]>;
  isRewardModel?: InputMaybe<Scalars["Boolean"]>;
  isSnapshot?: InputMaybe<Scalars["Boolean"]>;
  md5: Scalars["String"];
  path: Scalars["String"];
  saveTime: Scalars["DateTime"];
  step: Scalars["Int"];
};

/** The step between two saved checkpoints */
export type CkptStep = {
  __typename?: "CkptStep";
  duration: Scalars["Duration"];
  from: Scalars["String"];
  id: Scalars["String"];
  key: Scalars["String"];
  revision: Scalars["String"];
  steps: Scalars["PositiveInt"];
  to: Scalars["String"];
  tokens: Scalars["PositiveInt"];
};

export type CkptStepInput = {
  duration: Scalars["Duration"];
  from: Scalars["String"];
  to: Scalars["String"];
  tokens: Scalars["Int"];
};

/** Checkpoint's EvalResult */
export type EvalResult = {
  __typename?: "EvalResult";
  ckpt: Scalars["String"];
  finishTime: Scalars["DateTime"];
  id: Scalars["String"];
  isValid: Scalars["Boolean"];
  key: Scalars["String"];
  logFolder?: Maybe<Scalars["String"]>;
  revision: Scalars["String"];
  scores: Array<EvalResultScore>;
};

/** Checkpoint's EvalResult score */
export type EvalResultScore = {
  __typename?: "EvalResultScore";
  datasetMd5: Scalars["String"];
  datasetName: Scalars["String"];
  metric: Scalars["String"];
  mode: Scalars["String"];
  score: Scalars["Int"];
  subsetName: Scalars["String"];
};

export type IBaseCkptEvent = {
  /** Event type */
  eventType: CkptEventType;
};

export type Mutation = {
  __typename?: "Mutation";
  createCheckpoint: Checkpoint;
  createCkptStep: CkptStep;
  createEvalResult: EvalResult;
  createResumeCkpt: ResumeCkpt;
  createTrainConfig: TrainConfig;
  createTrainTask: TrainTask;
  deleteEvalResult: EvalResult;
};

export type MutationCreateCheckpointArgs = {
  input: CkptInput;
};

export type MutationCreateCkptStepArgs = {
  input: CkptStepInput;
};

export type MutationCreateEvalResultArgs = {
  result: ResultInput;
};

export type MutationCreateResumeCkptArgs = {
  input: ResumeCkptInput;
};

export type MutationCreateTrainConfigArgs = {
  input: TrainConfigInput;
};

export type MutationCreateTrainTaskArgs = {
  input: TrainTaskInput;
};

export type MutationDeleteEvalResultArgs = {
  ckptId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
};

/** When a new post is created */
export type NewPostEvent = IBaseCkptEvent & {
  __typename?: "NewPostEvent";
  /** Event type */
  eventType: CkptEventType;
  result: Checkpoint;
};

export type Query = {
  __typename?: "Query";
  /** All the Checkpoints */
  allCheckpoints?: Maybe<Array<Checkpoint>>;
  /** Query the step by id */
  allCkptSteps?: Maybe<Array<CkptStep>>;
  /** All the EvalResults */
  allEvalResults?: Maybe<Array<EvalResult>>;
  /** Query the relationships all the configs and the checkpoints they resumed from */
  allResumeCkpts?: Maybe<Array<ResumeCkpt>>;
  /** TrainConfig */
  allTrainConfigs?: Maybe<Array<TrainConfig>>;
  /** TrainTask */
  allTrainTasks?: Maybe<Array<TrainTask>>;
  /** Saved Checkpoint */
  checkpoint?: Maybe<Checkpoint>;
  /** Query the step by id */
  ckptStep?: Maybe<CkptStep>;
  /** Saved Checkpoint */
  evalResult?: Maybe<EvalResult>;
  /** Query the step by id */
  resumeCkpt?: Maybe<ResumeCkpt>;
  /** Saved Checkpoint */
  roadmap?: Maybe<Roadmap>;
  /** TrainConfig */
  trainConfig?: Maybe<TrainConfig>;
  /** TrainTask */
  trainTask?: Maybe<TrainTask>;
};

export type QueryAllResumeCkptsArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryCheckpointArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryCkptStepArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryEvalResultArgs = {
  ckptId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryResumeCkptArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryRoadmapArgs = {
  keyword?: InputMaybe<Scalars["String"]>;
  limit?: InputMaybe<Scalars["Int"]>;
  viewType?: InputMaybe<Scalars["String"]>;
};

export type QueryTrainConfigArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryTrainTaskArgs = {
  id?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type ResultInput = {
  ckpt: Scalars["String"];
  finishTime: Scalars["DateTime"];
  isValid: Scalars["Boolean"];
  logFolder: Scalars["String"];
  scores: Array<ScoreInput>;
};

/** Continue training config from checkpoints */
export type ResumeCkpt = {
  __typename?: "ResumeCkpt";
  from: Scalars["String"];
  id: Scalars["String"];
  key: Scalars["String"];
  revision: Scalars["String"];
  to: Scalars["String"];
};

export type ResumeCkptInput = {
  from: Scalars["String"];
  to: Scalars["String"];
};

/** InternLM Roadmap */
export type Roadmap = {
  __typename?: "Roadmap";
  lines: Array<RoadmapLine>;
  nodes: Array<RoadmapNode>;
  warnings?: Maybe<Array<RoadmapWarning>>;
};

/** InternLM Roadmap Line */
export type RoadmapLine = {
  __typename?: "RoadmapLine";
  duration?: Maybe<Scalars["Duration"]>;
  from: Scalars["String"];
  id?: Maybe<Scalars["String"]>;
  key?: Maybe<Scalars["String"]>;
  revision?: Maybe<Scalars["String"]>;
  steps?: Maybe<Scalars["PositiveInt"]>;
  to: Scalars["String"];
  tokens?: Maybe<Scalars["PositiveInt"]>;
  type: Scalars["String"];
};

/** InternLM Roadmap Node */
export type RoadmapNode = {
  __typename?: "RoadmapNode";
  ckptPath?: Maybe<Scalars["String"]>;
  config?: Maybe<Scalars["String"]>;
  hasEvalResult?: Maybe<Scalars["Boolean"]>;
  id: Scalars["String"];
  isDelivery?: Maybe<Scalars["Boolean"]>;
  isDeliveryBranch: Scalars["Boolean"];
  isRewardModel?: Maybe<Scalars["Boolean"]>;
  isSearchResult?: Maybe<Scalars["Boolean"]>;
  isSnapshot?: Maybe<Scalars["Boolean"]>;
  key: Scalars["String"];
  md5?: Maybe<Scalars["String"]>;
  revision: Scalars["String"];
  saveTime?: Maybe<Scalars["DateTime"]>;
  startStep?: Maybe<Scalars["Int"]>;
  step?: Maybe<Scalars["Int"]>;
  stopStep?: Maybe<Scalars["Int"]>;
  taskDesc?: Maybe<Scalars["String"]>;
  taskName?: Maybe<Scalars["String"]>;
  type: Scalars["String"];
};

/** InternLM Roadmap Warning */
export type RoadmapWarning = {
  __typename?: "RoadmapWarning";
  id: Scalars["String"];
  message: Scalars["String"];
};

export type ScoreInput = {
  datasetMd5: Scalars["String"];
  datasetName: Scalars["String"];
  metric: Scalars["String"];
  mode: Scalars["String"];
  score: Scalars["Float"];
  subsetName: Scalars["String"];
};

export type Subscription = {
  __typename?: "Subscription";
  /** Events related to posts */
  postEvents: IBaseCkptEvent;
};

export enum TaskType {
  Pretrain = "pretrain",
  RlhfPpo = "rlhf_ppo",
  RlhfRm = "rlhf_rm",
  Sft = "sft",
}

/** Training Config */
export type TrainConfig = {
  __typename?: "TrainConfig";
  /** TrainConfig's Checkpoints */
  ckpts: Array<Checkpoint>;
  configContent: Scalars["String"];
  dataConfig: Scalars["JSON"];
  id: Scalars["String"];
  key: Scalars["String"];
  modelConfig: Scalars["JSON"];
  optimizerConfig: Scalars["JSON"];
  parallelConfig: Scalars["JSON"];
  revision: Scalars["String"];
  startStep: Scalars["Int"];
  task: Scalars["String"];
};

export type TrainConfigInput = {
  configContent: Scalars["String"];
  dataConfig?: InputMaybe<Scalars["JSON"]>;
  modelConfig?: InputMaybe<Scalars["JSON"]>;
  optimizerConfig?: InputMaybe<Scalars["JSON"]>;
  parallelConfig?: InputMaybe<Scalars["JSON"]>;
  startStep?: InputMaybe<Scalars["Int"]>;
  task?: InputMaybe<Scalars["String"]>;
};

/** Training Task */
export type TrainTask = {
  __typename?: "TrainTask";
  /** TrainTask's TrainConfig */
  configs: Array<TrainConfig>;
  desc: Scalars["String"];
  id: Scalars["String"];
  key: Scalars["String"];
  name: Scalars["String"];
  revision: Scalars["String"];
  type: Scalars["String"];
};

export type TrainTaskInput = {
  desc?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  type?: InputMaybe<TaskType>;
};

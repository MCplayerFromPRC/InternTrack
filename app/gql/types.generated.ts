export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
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
  JSON: Record;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number;
  /** Integers that will have a value greater than 0. */
  PositiveInt: number;
};

/** Large Language Model Checkpoint */
export type Checkpoint = {
  __typename?: 'Checkpoint';
  config: Scalars['String'];
  id: Scalars['String'];
  isDelivery: Scalars['Boolean'];
  key: Scalars['String'];
  md5: Scalars['String'];
  revision: Scalars['String'];
  saveTime: Scalars['DateTime'];
  step: Scalars['Int'];
};

export enum CkptEventType {
  NewCkpt = 'NewCkpt'
}

export type CkptInput = {
  config: Scalars['String'];
  isDelivery: Scalars['Boolean'];
  md5: Scalars['String'];
  saveTime: Scalars['DateTime'];
  step: Scalars['Int'];
};

/** The step between two saved checkpoints */
export type CkptStep = {
  __typename?: 'CkptStep';
  duration: Scalars['Duration'];
  from: Scalars['String'];
  id: Scalars['String'];
  key: Scalars['String'];
  revision: Scalars['String'];
  to: Scalars['String'];
  tokens: Scalars['PositiveInt'];
};

export type CkptStepInput = {
  duration: Scalars['Duration'];
  from: Scalars['String'];
  to: Scalars['String'];
  tokens: Scalars['Int'];
};

export type IBaseCkptEvent = {
  /** Event type */
  eventType: CkptEventType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCheckpoint: Checkpoint;
  createCkptStep: CkptStep;
  createResumeCkpt: ResumeCkpt;
  createRoadmap: Roadmap;
  createTrainConfig: TrainConfig;
};


export type MutationCreateCheckpointArgs = {
  input: CkptInput;
};


export type MutationCreateCkptStepArgs = {
  input: CkptStepInput;
};


export type MutationCreateResumeCkptArgs = {
  input: ResumeCkptInput;
};


export type MutationCreateRoadmapArgs = {
  ckptList: Array<CkptInput>;
  ckptStepList: Array<CkptStepInput>;
  resumeCkptList: Array<ResumeCkptInput>;
  trainConfigList: Array<TrainConfigInput>;
};


export type MutationCreateTrainConfigArgs = {
  input: TrainConfigInput;
};

/** When a new post is created */
export type NewPostEvent = IBaseCkptEvent & {
  __typename?: 'NewPostEvent';
  /** Event type */
  eventType: CkptEventType;
  result: Checkpoint;
};

export type Query = {
  __typename?: 'Query';
  /** All the Checkpoints */
  allCheckpoints?: Maybe<Array<Checkpoint>>;
  /** Query the step by id */
  allCkptSteps?: Maybe<Array<CkptStep>>;
  /** Query the relationships all the configs and the checkpoints they resumed from */
  allResumeCkpts?: Maybe<Array<ResumeCkpt>>;
  /** TrainConfig */
  allTrainConfigs?: Maybe<Array<TrainConfig>>;
  /** Saved Checkpoint */
  checkpoint?: Maybe<Checkpoint>;
  /** Query the step by id */
  ckptStep?: Maybe<CkptStep>;
  /** Query the step by id */
  resumeCkpt?: Maybe<ResumeCkpt>;
  /** Saved Checkpoint */
  roadmap?: Maybe<Roadmap>;
  /** TrainConfig */
  trainConfig?: Maybe<TrainConfig>;
};


export type QueryAllResumeCkptsArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryCheckpointArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryCkptStepArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryResumeCkptArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryTrainConfigArgs = {
  id?: InputMaybe<Scalars['String']>;
};

/** Continue training config from checkpoints */
export type ResumeCkpt = {
  __typename?: 'ResumeCkpt';
  from: Scalars['String'];
  id: Scalars['String'];
  isSameTask: Scalars['Boolean'];
  key: Scalars['String'];
  revision: Scalars['String'];
  to: Scalars['String'];
};

export type ResumeCkptInput = {
  from: Scalars['String'];
  isSameTask: Scalars['Boolean'];
  to: Scalars['String'];
};

/** InternLM Roadmap */
export type Roadmap = {
  __typename?: 'Roadmap';
  ckptList: Array<Checkpoint>;
  ckptStepList: Array<CkptStep>;
  resumeCkptList: Array<ResumeCkpt>;
  trainConfigList: Array<TrainConfig>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Events related to posts */
  postEvents: IBaseCkptEvent;
};

/** Training Config */
export type TrainConfig = {
  __typename?: 'TrainConfig';
  /** TrainConfig's Checkpoints */
  ckpts: Array<Checkpoint>;
  dataConfig: Scalars['JSON'];
  id: Scalars['String'];
  key: Scalars['String'];
  modelConfig: Scalars['JSON'];
  modelName: Scalars['String'];
  optimizerConfig: Scalars['JSON'];
  parallelConfig: Scalars['JSON'];
  revision: Scalars['String'];
};

export type TrainConfigInput = {
  dataConfig: Scalars['JSON'];
  modelConfig: Scalars['JSON'];
  modelName: Scalars['String'];
  optimizerConfig: Scalars['JSON'];
  parallelConfig: Scalars['JSON'];
};

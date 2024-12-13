import { Database } from "arangojs";
import { Analyzer } from "arangojs/analyzer";
import { CreateArangoSearchViewOptions } from "arangojs/view";

const options: CreateArangoSearchViewOptions = {
  type: "arangosearch",
  primarySort: [
    {
      field: "TrainTask.name",
      asc: true,
    },
    {
      field: "TrainTask.desc",
      asc: true,
    },
    {
      field: "TrainConfig.configContent",
      asc: true,
    },
    {
      field: "Checkpoint.md5",
      asc: true,
    },
    {
      field: "TrainTask._id",
      asc: true,
    },
    {
      field: "TrainConfig._id",
      asc: true,
    },
    {
      field: "Checkpoint._id",
      asc: true,
    },
  ],
  storedValues: [
    ["TrainTask._id", "TrainTask.type", "TrainTask.desc"],
    [
      "TrainConfig._id",
      "TrainConfig.startStep",
      "TrainConfig.modelConfig",
      "TrainConfig.dataConfig",
      "TrainConfig.optimizerConfig",
      "TrainConfig.parallelConfig",
    ],
    [
      "Checkpoint._id",
      "Checkpoint.md5",
      "Checkpoint.isSnapshot",
      "Checkpoint.isDelivery",
      "Checkpoint.isRewardModel",
      "Checkpoint.step",
      "Checkpoint.saveTime",
    ],
    [
      "CkptStep._from",
      "CkptStep._to",
      "CkptStep.steps",
      "CkptStep.tokens",
      "CkptStep.duration",
    ],
    ["ResumeCkpt._from", "ResumeCkpt._to"],
  ],
  links: {
    TrainTask: {
      includeAllFields: false,
      fields: {
        name: { analyzers: ["tokenizer"] },
        type: { analyzers: ["identity"] },
        desc: { analyzers: ["tokenizer"] },
      },
    },
    TrainConfig: {
      includeAllFields: false,
      fields: {
        configContent: { analyzers: ["tokenizer"] },
        startStep: { analyzers: ["identity"] },
        modelConfig: { analyzers: ["text_en"] },
        dataConfig: { analyzers: ["text_en"] },
        optimizerConfig: { analyzers: ["text_en"] },
        parallelConfig: { analyzers: ["text_en"] },
      },
    },
    Checkpoint: {
      includeAllFields: false,
      fields: {
        isSnapshot: { analyzers: ["identity"] },
        isDelivery: { analyzers: ["identity"] },
        isRewardModel: { analyzers: ["identity"] },
        step: { analyzers: ["identity"] },
        saveTime: { analyzers: ["text_en"] },
      },
    },
    CkptStep: {
      includeAllFields: false,
      fields: {
        _from: { analyzers: ["identity"] },
        _to: { analyzers: ["identity"] },
        steps: { analyzers: ["identity"] },
        tokens: { analyzers: ["identity"] },
        duration: { analyzers: ["identity"] },
      },
    },
    ResumeCkpt: {
      includeAllFields: false,
      fields: {
        _from: { analyzers: ["identity"] },
        _to: { analyzers: ["identity"] },
      },
    },
  },
};

export async function seed(db: Database) {
  try {
    const analyzer = new Analyzer(db, "tokenizer");
    await analyzer.create({
      type: "pipeline",
      properties: {
        pipeline: [
          { type: "delimiter", properties: { delimiter: "-" } },
          { type: "delimiter", properties: { delimiter: "_" } },
          { type: "delimiter", properties: { delimiter: "." } },
          {
            type: "text",
            properties: {
              locale: "en",
              stemming: true,
            },
          },
        ],
      },
    });
    const view = await db.createView("RetrievalView", options);
    console.log(`view properties: ${view.properties}`);
  } catch (err) {
    console.error("Failed to create view for full database search:", err);
  }
}

import { Database } from "arangojs";
import { CreateArangoSearchViewOptions } from "arangojs/view";

const options: CreateArangoSearchViewOptions = {
  type: "arangosearch",
  primarySort: [
    {
      field: "TrainTask.name",
      asc: true,
    },
    {
      field: "TrainConfig.configContent",
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
        name: { analyzers: ["text_en"] },
        type: { analyzers: ["identity"] },
        desc: { analyzers: ["text_en"] },
      },
    },
    TrainConfig: {
      includeAllFields: false,
      fields: {
        configContent: { analyzers: ["text_en"] },
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
    const view = await db.createView("RetrievalView", options);
    console.log(`view properties: ${view.properties}`);
  } catch (err) {
    console.error("Failed to create view for full database search:", err);
  }
}

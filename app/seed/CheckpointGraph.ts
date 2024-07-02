import { Database } from "arangojs";
import { EdgeDefinitionOptions } from "arangojs/graph";

const options: EdgeDefinitionOptions[] = [
  {
    collection: "CkptStep",
    from: ["Checkpoint", "TrainConfig"],
    to: ["Checkpoint"],
  },
  {
    collection: "ResumeCkpt",
    from: ["Checkpoint"],
    to: ["TrainConfig"],
  },
  {
    collection: "CkptEval",
    from: ["Checkpoint"],
    to: ["EvalResult"],
  },
];

export async function seed(db: Database) {
  try {
    const graph = db.graph("InternLMRoadmap");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const graphInfo = await graph.create(options);

    const vertex = await graph.listVertexCollections();
    const edge = await graph.listEdgeCollections();
    console.log(`graph vertex: ${vertex}, graph edge: ${edge}`);
  } catch (err) {
    console.error("Failed to create graph for full database search:", err);
  }
}

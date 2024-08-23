import { db } from "@/lib/database";

export async function GET() {
  const graph = await db.graph("InternLMRoadmap");
  const view = await db.view("RetrievalView");
  const evalCollection = await db.collection("EvalResult");
  const ckptEvalCollection = await db.collection("CkptEval");
  const procCollection = await db.collection("TrainProc");
  const logCollection = await db.collection("TrainLog");
  await view.drop();
  await graph.drop(true);
  await evalCollection.drop();
  await ckptEvalCollection.drop();
  await procCollection.drop();
  await logCollection.drop();
}

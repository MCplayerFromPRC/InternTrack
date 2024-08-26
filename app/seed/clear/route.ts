import { db } from "@/lib/database";

export async function GET() {
  const graph = await db.graph("InternLMRoadmap");
  const view = await db.view("RetrievalView");
  const procCollection = await db.collection("TrainProc");
  const logCollection = await db.collection("TrainLog");
  await view.drop();
  await graph.drop(true);
  await procCollection.drop();
  await logCollection.drop();
  return Response.json({ message: "Database droped successfully" });
}
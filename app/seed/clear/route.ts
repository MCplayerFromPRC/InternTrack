import { db } from "@/lib/database";

export async function GET() {
  const graph = await db.graph("InternLMRoadmap");
  const view = await db.view("RetrievalView");
  const procCollection = await db.collection("TrainProc");
  const logCollection = await db.collection("TrainLog");
  const userCollection = await db.collection("User");
  const groupCollection = await db.collection("Group");
  const memberCollection = await db.collection("MemberOf");
  const analyzer = await db.analyzer("tokenizer");
  await view.drop();
  await graph.drop(true);
  await analyzer.drop();
  await procCollection.drop();
  await logCollection.drop();
  await userCollection.drop();
  await groupCollection.drop();
  await memberCollection.drop();
  return Response.json({ message: "Database droped successfully" });
}

import { seed as seedGraph } from "./CheckpointGraph";
import { seed as seedView } from "./RetrievalView";
import { seed as seedCollection } from "./collections";
import { seed as seedData } from "./seeds";
import { db } from "@/lib/database";

export async function GET() {
  try {
    await seedCollection(db);
    await seedGraph(db);
    await seedView(db);
    await seedData();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

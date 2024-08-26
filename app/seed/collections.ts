import { Database } from "arangojs";
import { CollectionType } from "arangojs/collection";

const collections: string[] = ["TrainLog", "TrainProc", "EvalResult"];
const edgeCollections: string[] = ["CkptEval"];

export async function seed(db: Database) {
  for (const name of collections) {
    const collection = db.collection(name);
    const collectionInfo = await collection.create({
      type: CollectionType.DOCUMENT_COLLECTION,
    });
    console.log(collectionInfo);
  }
  for (const name of edgeCollections) {
    const collection = db.collection(name);
    const collectionInfo = await collection.create({
      type: CollectionType.EDGE_COLLECTION,
    });
    console.log(collectionInfo);
  }
}

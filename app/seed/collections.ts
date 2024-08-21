import { Database } from "arangojs";
import { CollectionType } from "arangojs/collection";

const collections: string[] = ["TrainingLog", "TrainingTask"];

const option = { type: CollectionType.DOCUMENT_COLLECTION };

export async function seed(db: Database) {
  for (const name of collections) {
    const collection = db.collection(name);
    const collectionInfo = await collection.create(option);
    console.log(collectionInfo);
  }
}

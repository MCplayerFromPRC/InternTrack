import { Database } from "arangojs";
import { CreateArangoSearchViewOptions } from "arangojs/view";

const options: CreateArangoSearchViewOptions = {
  type: "arangosearch",
  primarySort: [
    {
      field: "flights.DepTimeUTC",
      asc: true,
    },
  ],
  storedValues: [
    [
      "flights._from",
      "flights._to",
      "flights.UniqueCarrier",
      "flights.FlightNum",
    ],
    ["airports.name", "airports.city", "airports.country"],
  ],
  links: {
    flights: {
      includeAllFields: false,
      fields: {
        DepTimeUTC: { analyzers: ["identity"] },
        _from: { analyzers: ["identity"] },
        _to: { analyzers: ["identity"] },
        UniqueCarrier: { analyzers: ["text_en"] },
        FlightNum: { analyzers: ["text_en"] },
      },
    },
    airports: {
      includeAllFields: false,
      fields: {
        name: { analyzers: ["text_en"] },
        city: { analyzers: ["text_en"] },
        country: { analyzers: ["text_en"] },
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

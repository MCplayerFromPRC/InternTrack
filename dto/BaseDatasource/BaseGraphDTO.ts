/*
## quote:
1. https://docs.arangodb.com/3.11/aql/graphs/traversals/
*/

import { Database } from "arangojs";
import { Graph } from "arangojs/graph";

import { NodeDocument } from "@/models";
import { BaseDatasource } from "./BaseDTO";

export class BaseGraphDatasource<
  TData extends NodeDocument,
> extends BaseDatasource {
  graph: Graph;

  constructor(db: Database, graph: Graph, fields: string[], options = {}) {
    super(db, options);
    this.graph = graph;
  }

  async traverse(
    startVertex: string,
    minDepth: number = 0,
    maxDepth: number | null = null,
    directive: "INBOUND" | "OUTBOUND" | "ANY" = "ANY",
  ) {
    const depth = maxDepth ? `${minDepth}..${maxDepth}` : `${minDepth}`;
    const query = `FOR vertex IN ${depth} ${directive} ${startVertex} GRAPH ${this.graph.name}`;
    return this.executeQuery<TData>(query);
  }
}

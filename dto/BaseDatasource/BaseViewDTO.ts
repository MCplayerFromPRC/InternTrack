/*
## quote:
1. https://colab.research.google.com/github/joerg84/ArangoDBUniversity/blob/master/FuzzySearch.ipynb#scrollTo=sm48Mt5jplnb
2. https://docs.arangodb.com/3.11/aql/functions/string/#json_stringify
3. https://docs.arangodb.com/3.11/index-and-search/arangosearch/arangosearch-views-reference/
4. https://docs.arangodb.com/3.11/index-and-search/arangosearch/phrase-and-proximity-search/#proximity-search
5.
*/

import { Database } from "arangojs";
import { ArangoSearchViewProperties, View } from "arangojs/view";
import { injectable } from "inversify";

import { NodeDocument } from "@/models";
import { BaseDatasource } from "./BaseDTO";

// BaseViewDatasource<Checkpoint|TrainingConfig>
@injectable()
export class BaseViewDatasource<
  TData extends Partial<NodeDocument>,
> extends BaseDatasource {
  view: View;
  fields: string[] = ["TrainTask.name", "TrainConfig.configContent"];

  constructor(db: Database, view: View, options = {}) {
    super(db, options);
    this.view = view;
    // this.getFields();
  }

  async getFields() {
    const properties =
      (await this.view.properties()) as ArangoSearchViewProperties;
    this.fields = Object.keys(properties.links).reduce(
      (prev: string[], key: string) => {
        prev.concat(Object.keys(properties.links[key].fields));
        return prev;
      },
      [],
    );
  }

  async tokenMatch(searchKey: string, matchNum: number = 1) {
    const allFieldsMatching = this.fields
      .map(
        (field) =>
          `ANALYZER(TOKENS("${searchKey}", "text_en") AT LEAST (${matchNum}) == doc.${field}, "text_en")`,
      )
      .join(" OR ");
    const query = `FOR doc IN ${this.view.name} SEARCH ${allFieldsMatching} RETURN doc`;
    return this.executeQuery<TData>(query);
  }

  async bm25(searchKey: string, limit: number = 10) {
    const allFieldsMatching = this.fields
      .map(
        (field) =>
          `ANALYZER(doc.${field} IN TOKENS("${searchKey}", "text_en"), "text_en")`,
      )
      .join(" OR ");
    const query = `FOR doc IN ${this.view.name} SEARCH ${allFieldsMatching} SORT BM25(doc) DESC LIMIT ${limit} RETURN doc`;
    return this.executeQuery<TData>(query);
  }
}

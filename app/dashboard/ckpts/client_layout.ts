import { RoadmapQuery } from "@/app/gql/fragments.generated";
import { RGJsonData } from "relation-graph-react";


export function layout(params: RoadmapQuery): RGJsonData {
    return {
        rootId: "",
        nodes: [],
        lines: []
    };
}
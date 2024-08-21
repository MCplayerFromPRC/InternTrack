import { RoadmapQuery } from "@/app/gql/fragments.generated";
import { RGJsonData, JsonNode, JsonLine } from "relation-graph-react";

export function layout(params: RoadmapQuery): RGJsonData {
  const nodes: JsonNode[] = [];
  const lines: JsonLine[] = [];
  if (params.roadmap) {
    params.roadmap.ckptList.forEach((node) => {
      const { id, config, ...others } = node;
      nodes.push({
        id,
        text: config,
        data: {
          type: "ckpt",
          ...others,
        },
      });
    });
    params.roadmap.trainConfigList.forEach((node) => {
      const { id, modelName, ...others } = node;
      nodes.push({
        id,
        text: modelName,
        height: 100,
        width: 100,
        data: {
          type: "config",
          ...others,
        },
      });
    });
    params.roadmap.ckptStepList.forEach((line) => {
      const { id, from, to, ...others } = line;
      lines.push({
        id,
        from,
        to,
        data: { ...others },
      });
    });
    params.roadmap.resumeCkptList.forEach((line) => {
      const { id, from, to, ...others } = line;
      lines.push({
        id,
        from,
        to,
        data: { ...others },
      });
    });
  }
  return {
    // rootId: "",
    nodes,
    lines,
  };
}

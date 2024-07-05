import { RoadmapQuery } from "@/app/gql/fragments.generated";
import { RGJsonData } from "relation-graph-react";


export function layout(params: RoadmapQuery): RGJsonData {
    const nodes: any[] = []
    const lines: any[] = []
    if (params.roadmap) {
        params.roadmap.ckptList.forEach(node => {
            const {id, config, ...others } = node
            nodes.push({
                id,
                text: config,
                myicon: "el-icon-star-on",
                data: { ...others }
            });
        });
        params.roadmap.trainConfigList.forEach(node => {
            const {id, modelName, ...others } = node
            nodes.push({
                id,
                text: modelName,
                myicon: "el-icon-sunny",
                data: { ...others }
            });
        });
        params.roadmap.ckptStepList.forEach(line => {
            const {id, from, to, ...others } = line
            lines.push({
                id, 
                from, 
                to,
                data: { ...others }
            });
        });
        params.roadmap.ckptStepList.forEach(line => {
            const {id, from, to, ...others } = line
            lines.push({
                id, 
                from, 
                to,
                data: { ...others }
            });
        });
    }
    return {
        // rootId: "",
        nodes,
        lines
    };
}
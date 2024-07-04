import { injectable, inject } from "inversify";
import { JsonNode, JsonLine } from "relation-graph-react"

import { NodeDocument, EdgeDocument } from "@/models";

import { 
  CheckpointDatasource,
  CkptStepDatasource,
  ResumeCkptDatasource,
  TrainConfigDatasource,
} from "@/dto";

@injectable()
export class RoadmapService {
  private ckptDTO: CheckpointDatasource;
  private ckptStepDTO: CkptStepDatasource;
  private resumeCkptDTO: ResumeCkptDatasource;
  private trainConfigDTO: TrainConfigDatasource;

  constructor(
    @inject(CheckpointDatasource) ckptDTO: CheckpointDatasource,
    @inject(CkptStepDatasource) ckptStepDTO: CkptStepDatasource,
    @inject(ResumeCkptDatasource) resumeCkptDTO: ResumeCkptDatasource,
    @inject(TrainConfigDatasource) trainConfigDTO: TrainConfigDatasource,
  ) {
    this.ckptDTO = ckptDTO;
    this.ckptStepDTO = ckptStepDTO;
    this.resumeCkptDTO = resumeCkptDTO;
    this.trainConfigDTO = trainConfigDTO;
  }

  async fetchGraph() {
    const ckpt_list = await this.ckptDTO.findAll();
    const ckpt_step_list = await this.ckptStepDTO.findAll();
    const train_config_list = await this.trainConfigDTO.findAll();
    const resume_ckpt_list = await this.resumeCkptDTO.findAll();
    return [...ckpt_list, ...ckpt_step_list, ...train_config_list, ...resume_ckpt_list];
  }

  async getGraphView(){
    const nodeList = await this.fetchGraph();
    return nodeList.map(elem => this.transformObject(elem));
  }

  transformObject(obj: NodeDocument): JsonNode|JsonLine {
    if (obj instanceof EdgeDocument){
      const { _id, _from, _to, ...others } = obj;
      return {
        id: _id,          // 直接使用id
        from: _from,  // 直接使用attr_a
        to: _to,
        data: others
      }
    } else {
      const { _id, ...others } = obj;
      return {
        id: _id,
        data: others
      }  
    }
  }
  
}

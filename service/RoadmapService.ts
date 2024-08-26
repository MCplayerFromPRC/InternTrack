import { injectable, inject } from "inversify";
import moment from "moment";

import {
  Checkpoint,
  CkptStep,
  ResumeCkpt,
  TrainConfig,
  TrainTask,
  Node,
  Line,
  Warning,
  Roadmap,
} from "@/models";

import {
  CheckpointDatasource,
  CkptStepDatasource,
  ResumeCkptDatasource,
  TrainConfigDatasource,
  TrainTaskDatasource,
} from "@/dto";

import { isTypeOf } from "@/lib/utils";

type VertexDocument = Checkpoint | TrainConfig | TrainTask;
type DBEdgeDocument = CkptStep | ResumeCkpt;
type EdgeDocument = DBEdgeDocument | Partial<Line>;

interface WarningArgs {
  id: string;
  nodeType: "Task" | "Config" | "Checkpoint";
  inEdges: string[];
  outEdges: string[];
  wrongInEdges: string[];
  wrongOutEdges: string[];
  [key: string]: any;
}

class WarningMessage {
  static TooManyPredecessors({ id, nodeType, inEdges }: WarningArgs): string {
    return `${nodeType} ${id} has multiple predecessor ${inEdges.join(", ")}`;
  }

  static TooManySuccessors({ id, nodeType, outEdges }: WarningArgs): string {
    return `${nodeType} ${id} has multiple successors ${outEdges.join(", ")}`;
  }

  static WrongTypeChild({ id, nodeType, wrongOutEdges }: WarningArgs): string {
    return `${nodeType} ${id} has wrong type child ${wrongOutEdges.join(", ")}`;
  }

  static WrongTypeParent({ id, nodeType, wrongInEdges }: WarningArgs): string {
    return `${nodeType} ${id} has wrong type child ${wrongInEdges.join(", ")}`;
  }

  // Task Warning
  static PPOMissReward({ id }: WarningArgs): string {
    return `PPO task ${id} miss reward model`;
  }

  static PPOMissReference({ id }: WarningArgs): string {
    return `PPO task ${id} miss reference model`;
  }

  static NoConfigChildForTask({ id }: WarningArgs): string {
    return `Task ${id} has no Config node`;
  }

  // Config Warning
  static ConfigMissTask({ id }: WarningArgs): string {
    return `Config ${id} miss task`;
  }

  static NoCkptChildForConfig({ id }: WarningArgs): string {
    return `Config ${id} has no Checkpoint node`;
  }

  // Checkpoint Warning
  static TooManyCkptChildren({ id, wrongOutEdges }: WarningArgs): string {
    return `Checkpoint ${id} has more than one checkpoint children nodes ${wrongOutEdges.join(", ")}`;
  }
}

function isTrainTask(vertex: VertexDocument): vertex is TrainTask {
  return isTypeOf(vertex, TrainTask);
}

function isTrainConfig(vertex: VertexDocument): vertex is TrainConfig {
  return isTypeOf(vertex, TrainConfig);
}

function isCheckpoint(vertex: VertexDocument): vertex is Checkpoint {
  return isTypeOf(vertex, Checkpoint);
}

function isCkptStep(edge: DBEdgeDocument): edge is CkptStep {
  return isTypeOf(edge, CkptStep);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isResumeCkpt(edge: DBEdgeDocument): edge is ResumeCkpt {
  return isTypeOf(edge, ResumeCkpt);
}

class Graph {
  vertices = new Map<string, VertexDocument>();
  nodes = new Map<string, Partial<Node>>();
  warnings: Warning[] = [];
  adjacencyList: Map<string, EdgeDocument[]> = new Map();
  reverseAdjacencyList: Map<string, EdgeDocument[]> = new Map();

  addVertex(vertex: VertexDocument): void {
    this.vertices.set(vertex._id, vertex);
    if (!this.adjacencyList.has(vertex._id)) {
      this.adjacencyList.set(vertex._id, []);
    }
    if (!this.reverseAdjacencyList.has(vertex._id)) {
      this.reverseAdjacencyList.set(vertex._id, []);
    }
  }

  addEdge(edge: DBEdgeDocument): void {
    if (this.adjacencyList.has(edge._from)) {
      this.adjacencyList.get(edge._from)!.push(edge);
    } else {
      this.adjacencyList.set(edge._from, [edge]);
    }
    if (this.reverseAdjacencyList.has(edge._to)) {
      this.reverseAdjacencyList.get(edge._to)!.push(edge);
    } else {
      this.reverseAdjacencyList.set(edge._to, [edge]);
    }
  }

  topologicalSort(viewType: "ckpt" | "config") {
    const zeroInDegreeQueue: string[] = [];
    const orderList = [];

    // Calculate in-degrees by using the reverse adjacency list
    const inDegrees: Map<string, number> = new Map();
    this.vertices.forEach((_, id) => {
      const inDeg = this.reverseAdjacencyList.get(id)?.length || 0;
      inDegrees.set(id, inDeg);
      if (inDeg === 0) {
        zeroInDegreeQueue.push(id);
      }
    });

    // Process the queue
    while (zeroInDegreeQueue.length) {
      const nodeId = zeroInDegreeQueue.shift()!;
      (<DBEdgeDocument[]>this.adjacencyList.get(nodeId)!).forEach(
        (adjacent) => {
          const currentInDegree = (inDegrees.get(adjacent._to) || 0) - 1;
          inDegrees.set(adjacent._to, currentInDegree);
          if (currentInDegree === 0) {
            zeroInDegreeQueue.push(adjacent._to);
          }
        },
      );
      const node = this.vertices.get(nodeId)!;
      this.processNode(node, viewType);
      orderList.push(node);
    }

    if (orderList.length !== this.vertices.size) {
      throw new Error("Graph has a cycle, topological sorting not possible");
    }

    for (const node of orderList) {
      this.skipNodeNotInView(node, viewType);
    }
  }

  processNode(vertex: VertexDocument, viewType: "ckpt" | "config") {
    const outEdges = <DBEdgeDocument[]>this.adjacencyList.get(vertex._id) || [];
    const inEdges =
      <DBEdgeDocument[]>this.reverseAdjacencyList.get(vertex._id) || [];
    this.validateVertex(vertex, outEdges, inEdges, viewType);
    this.switchNodeView(vertex, viewType);
    const inLines = this.switchEdgeView(inEdges);
    if (inLines) {
      this.reverseAdjacencyList.set(vertex._id, inLines);
    }
  }

  validateVertex(
    vertex: VertexDocument,
    outEdges: DBEdgeDocument[],
    inEdges: DBEdgeDocument[],
    viewType: "ckpt" | "config",
  ) {
    const wrongOutEdges = new Set<string>();
    const wrongInEdges = new Set<string>();
    const messageTypes = new Set<(args: WarningArgs) => string>();

    // Check the number of inEdges
    if (isTrainTask(vertex) && vertex.type == "rlhf_ppo") {
      if (inEdges.length > 2) {
        messageTypes.add(WarningMessage.TooManyPredecessors);
      }
    } else if (inEdges.length > 1) {
      messageTypes.add(WarningMessage.TooManyPredecessors);
    }

    // Check TrainTask type node
    if (isTrainTask(vertex)) {
      if (outEdges.length > 1) {
        messageTypes.add(WarningMessage.TooManySuccessors);
      } else if (outEdges.length === 0) {
        messageTypes.add(WarningMessage.NoConfigChildForTask);
      } else if (outEdges.length > 0) {
        for (const outEdge of outEdges) {
          const outTarget = this.vertices.get(outEdge._to)!;
          if (!isTrainConfig(outTarget)) {
            wrongOutEdges.add(outTarget._id);
            messageTypes.add(WarningMessage.WrongTypeChild);
          }
        }
      }
      if (
        inEdges.length === 1 ||
        (vertex.type == "rlhf_ppo" && inEdges.length === 2)
      ) {
        const ckptType = [];
        for (const inEdge of inEdges) {
          const inSource = this.vertices.get(inEdge._from)!;
          if (!isCheckpoint(inSource)) {
            wrongInEdges.add(inSource._id);
            messageTypes.add(WarningMessage.WrongTypeParent);
          } else {
            ckptType.push(inSource.isRewardModel);
          }
        }
        if (vertex.type == "rlhf_ppo" && ckptType.length === 2) {
          if (ckptType[0] && ckptType[1]) {
            messageTypes.add(WarningMessage.PPOMissReference);
          } else if (!ckptType[0] && !ckptType[1]) {
            messageTypes.add(WarningMessage.PPOMissReward);
          }
        }
      }
    }

    // Check TrainConfig type node
    if (isTrainConfig(vertex)) {
      if (viewType == "config") {
        if (outEdges.length > 1) {
          messageTypes.add(WarningMessage.TooManySuccessors);
        } else if (outEdges.length === 0) {
          messageTypes.add(WarningMessage.NoCkptChildForConfig);
        } else if (outEdges.length === 1) {
          const outTarget = this.vertices.get(outEdges[0]._to)!;
          if (!isCheckpoint(outTarget)) {
            wrongOutEdges.add(outTarget._id);
            messageTypes.add(WarningMessage.WrongTypeChild);
          }
        }
        if (inEdges.length === 1) {
          const inSource = this.vertices.get(inEdges[0]._from)!;
          if (!isTrainTask(inSource)) {
            wrongInEdges.add(inSource._id);
            messageTypes.add(WarningMessage.WrongTypeParent);
          }
        } else if (inEdges.length === 0) {
          messageTypes.add(WarningMessage.ConfigMissTask);
        }
      } else {
        return;
      }
    }

    // Check Checkpoint type node
    if (isCheckpoint(vertex)) {
      if (viewType == "ckpt") {
        for (const outEdge of outEdges) {
          const outTarget = this.vertices.get(outEdge._to)!;
          if (isCheckpoint(outTarget)) {
            wrongOutEdges.add(outTarget._id);
          }
        }
        if (wrongOutEdges.size > 1) {
          messageTypes.add(WarningMessage.TooManyCkptChildren);
        }
      } else {
        return;
      }
    }

    if (messageTypes.size) {
      const messages = [];
      for (const warningMessage of messageTypes) {
        messages.push(
          warningMessage({
            id: vertex._id,
            nodeType: isTrainTask(vertex)
              ? "Task"
              : isTrainConfig(vertex)
                ? "Config"
                : "Checkpoint",
            inEdges: inEdges.map((inEdge) => inEdge._from),
            outEdges: outEdges.map((outEdge) => outEdge._to),
            wrongInEdges: Array.from(wrongInEdges),
            wrongOutEdges: Array.from(wrongOutEdges),
          }),
        );
      }
      this.warnings.push({ id: vertex._id, message: messages.join("\n") });
    }
  }

  switchNodeView(vertex: VertexDocument, viewType: "ckpt" | "config") {
    if (isTrainTask(vertex)) {
      const { _id, _key, _rev, name, desc } = vertex;
      this.nodes.set(_id, {
        id: _id,
        key: _key,
        revision: _rev,
        type: "task",
        isDeliveryBranch: false,
        taskName: name,
        taskDesc: desc,
      });
      return _id;
    }

    if (isTrainConfig(vertex) && viewType === "config") {
      const { _id, _key, _rev, startStep } = vertex;
      this.nodes.set(_id, {
        id: _id,
        key: _key,
        revision: _rev,
        type: "config",
        isDeliveryBranch: false,
        startStep,
        stopStep: -1,
      });
      return _id;
    }

    if (isCheckpoint(vertex) && viewType === "ckpt") {
      const { _id, _key, _rev, path, ...others } = vertex;
      this.nodes.set(_id, {
        id: _id,
        key: _key,
        revision: _rev,
        type: "ckpt",
        isDeliveryBranch: false,
        ckptPath: path,
        ...others,
      });
      return _id;
    }
  }

  switchEdgeView(inEdges: DBEdgeDocument[]): Partial<Line>[] {
    const inLines: Partial<Line>[] = [];

    for (const inEdge of inEdges) {
      const { _id, _key, _rev, _from, _to, ...others } = inEdge;
      const inLine: Partial<Line> = {
        id: _id,
        key: _key,
        revision: _rev,
        from: _from,
        to: _to,
        type: isCkptStep(inEdge) ? "step" : "resume",
        ...others,
      };

      const outEdges = this.adjacencyList.get(_from);
      if (outEdges) {
        const processedEdges = outEdges.map((outEdge) => {
          if ("_to" in outEdge && outEdge._to === _to) {
            return inLine;
          } else {
            return outEdge;
          }
        });
        this.adjacencyList.set(_from, processedEdges);
      }
      inLines.push(inLine);
    }

    return inLines;
  }

  skipNodeNotInView(vertex: VertexDocument, viewType: "ckpt" | "config"): void {
    if (
      (isTrainConfig(vertex) && viewType == "ckpt") ||
      (isCheckpoint(vertex) && viewType == "config")
    ) {
      this.removeNode(vertex._id);
    }
  }

  mergeProps<T>(
    propSource: T | undefined,
    propTarget: T | undefined,
    combineFn: (a: T, b: T) => any,
  ): T | undefined {
    return propSource
      ? propTarget
        ? combineFn(propTarget, propSource)
        : propSource
      : propTarget;
  }

  removeNode(vertexId: string) {
    const targets = <Partial<Line>[]>this.adjacencyList.get(vertexId) || [];
    const sources =
      <Partial<Line>[]>this.reverseAdjacencyList.get(vertexId) || [];
    const forwardAdjList: Map<string, Partial<Line>[]> = new Map();
    const reverseAdjList: Map<string, Partial<Line>[]> = new Map();

    targets.forEach((target) => {
      reverseAdjList.set(target.to!, []);
    });
    sources.forEach((source) => {
      forwardAdjList.set(source.from!, []);
    });

    targets.forEach((target) => {
      sources.forEach((source) => {
        const crossLine: Partial<Line> = {
          id: source.id + "->" + target.id,
          type:
            target.type === "step" || source.type === "step"
              ? "step"
              : "resume",
          from: source.from,
          to: target.to,
          steps: this.mergeProps(
            source.steps,
            target.steps,
            (a = 0, b = 0) => a + b,
          ),
          tokens: this.mergeProps(
            source.tokens,
            target.tokens,
            (a = 0, b = 0) => a + b,
          ),
          duration: this.mergeProps(source.duration, target.duration, (a, b) =>
            moment.duration(a).add(moment.duration(b)).toISOString(),
          ),
        };
        forwardAdjList.get(source.from!)!.push(crossLine);
        reverseAdjList.get(target.to!)!.push(crossLine);
      });
    });

    targets.forEach((target) => {
      const revList = this.reverseAdjacencyList.get(target.to!) || [];
      const list = revList.filter(
        (line) => "from" in line && line.from !== vertexId,
      );
      list.push(...(reverseAdjList.get(target.to!) || []));
      this.reverseAdjacencyList.set(target.to!, list);
    });
    this.adjacencyList.delete(vertexId);

    sources?.forEach((source) => {
      const adjList = this.adjacencyList.get(source.from!) || [];
      const list = adjList.filter(
        (line) => "to" in line && line.to !== vertexId,
      );
      list.push(...(forwardAdjList.get(source.from!) || []));
      this.adjacencyList.set(source.from!, list);
    });
    this.reverseAdjacencyList.delete(vertexId);
  }

  isDeliveryBranchNodes(): void {
    const visited = new Set<string>();

    const dfs = (vertexId: string) => {
      visited.add(vertexId);
      this.nodes.get(vertexId)!.isDeliveryBranch = true;
      const neighbors = <Partial<Line>[]>(
        this.reverseAdjacencyList.get(vertexId)
      );
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor.from!)) {
            dfs(neighbor.from!);
          }
        }
      }
    };

    this.nodes.forEach((startNode, id) => {
      if (
        startNode.type === "ckpt" &&
        startNode.isDelivery &&
        !visited.has(id)
      ) {
        dfs(id);
      }
    });
  }

  getConnectedComponents(nodes: string[]) {
    const components = this.findWeaklyConnectedComponents(nodes);
    this.vertices = new Map<string, VertexDocument>(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Array.from(this.vertices).filter(([key, _]) => components.includes(key)),
    );
    this.adjacencyList = new Map<string, EdgeDocument[]>(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Array.from(this.adjacencyList).filter(([key, _]) =>
        components.includes(key),
      ),
    );
    this.reverseAdjacencyList = new Map<string, EdgeDocument[]>(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Array.from(this.reverseAdjacencyList).filter(([key, _]) =>
        components.includes(key),
      ),
    );
  }

  findWeaklyConnectedComponents(nodes: string[]): string[] {
    const visited = new Set<string>();

    for (const nodeId of nodes) {
      if (!visited.has(nodeId)) {
        this.bfs(nodeId, visited);
      }
    }
    return Array.from(visited);
  }

  bfs(startId: string, visited: Set<string>): void {
    const queue: string[] = [startId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      if (!visited.has(currentId)) {
        visited.add(currentId);
        const neighbors = [
          ...((<DBEdgeDocument[]>this.adjacencyList.get(currentId)).map(
            (outEdge) => outEdge._to,
          ) || []),
          ...((<DBEdgeDocument[]>this.reverseAdjacencyList.get(currentId)).map(
            (inEdge) => inEdge._from,
          ) || []),
        ];
        if (neighbors) {
          for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
              queue.push(neighbor);
            }
          }
        }
      }
    }
  }

  returnGraph(): Roadmap {
    return {
      nodes: Array.from(this.nodes.values()),
      lines: <Line[]>Array.from(this.adjacencyList.values()).flat(),
      warnings: this.warnings,
    };
  }
}

@injectable()
export class RoadmapService {
  private ckptDTO: CheckpointDatasource;
  private ckptStepDTO: CkptStepDatasource;
  private resumeCkptDTO: ResumeCkptDatasource;
  private trainConfigDTO: TrainConfigDatasource;
  private trainTaskDTO: TrainTaskDatasource;

  constructor(
    @inject(CheckpointDatasource) ckptDTO: CheckpointDatasource,
    @inject(CkptStepDatasource) ckptStepDTO: CkptStepDatasource,
    @inject(ResumeCkptDatasource) resumeCkptDTO: ResumeCkptDatasource,
    @inject(TrainConfigDatasource) trainConfigDTO: TrainConfigDatasource,
    @inject(TrainTaskDatasource) trainTaskDTO: TrainTaskDatasource,
  ) {
    this.ckptDTO = ckptDTO;
    this.ckptStepDTO = ckptStepDTO;
    this.resumeCkptDTO = resumeCkptDTO;
    this.trainConfigDTO = trainConfigDTO;
    this.trainTaskDTO = trainTaskDTO;
  }

  async fetchGraph(): Promise<Graph> {
    const graph = new Graph();
    const ckpt_list = await this.ckptDTO.findAll();
    ckpt_list.forEach((ckpt) => graph.addVertex(ckpt));

    const train_config_list = await this.trainConfigDTO.findAll();
    train_config_list.forEach((train_config) => graph.addVertex(train_config));

    const train_task_list = await this.trainTaskDTO.findAll();
    train_task_list.forEach((train_task) => graph.addVertex(train_task));

    const ckpt_step_list = await this.ckptStepDTO.findAll();
    ckpt_step_list.forEach((ckpt_step) => graph.addEdge(ckpt_step));

    const resume_ckpt_list = await this.resumeCkptDTO.findAll();
    resume_ckpt_list.forEach((resume_ckpt) => graph.addEdge(resume_ckpt));

    return graph;
  }

  async getGraphView(
    viewType: "ckpt" | "config",
    nodes: string[] = [],
  ): Promise<Roadmap> {
    const graph = await this.fetchGraph();
    if (nodes.length) {
      graph.getConnectedComponents(nodes);
    }
    graph.topologicalSort(viewType);
    graph.isDeliveryBranchNodes();
    return graph.returnGraph();
  }
}

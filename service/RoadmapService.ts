import { injectable, inject } from "inversify";
import { Database } from "arangojs";
import { Transaction } from "arangojs/transaction";
import moment from "moment";

import {
  Checkpoint,
  CkptStep,
  ResumeCkpt,
  TrainConfig,
  TrainTask,
  EvalResult,
  CkptEval,
  TrainLog,
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
  CkptEvalDatasource,
  EvalResultDatasource,
  TrainLogDatasource,
  TrainProcDatasource,
} from "@/dto";

import { TYPES } from "@/lib/properties";
import { isTypeOf, splitObject } from "@/lib/utils";

type VertexDocument = Checkpoint | TrainConfig | TrainTask | EvalResult;
type DBEdgeDocument = CkptStep | ResumeCkpt | CkptEval;
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
    return `${nodeType} ${id} has wrong type parent ${wrongInEdges.join(", ")}`;
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

function isEvalResult(vertex: VertexDocument): vertex is EvalResult {
  return isTypeOf(vertex, EvalResult);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isCkptEval(edge: DBEdgeDocument): edge is CkptEval {
  return isTypeOf(edge, CkptEval);
}

class Graph {
  vertices = new Map<string, VertexDocument>();
  nodes = new Map<string, Partial<Node>>();
  searchedNodes: string[] = [];
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
          if (!(isTrainTask(inSource) || isCheckpoint(inSource))) {
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
    const isSearchResult = this.searchedNodes.includes(vertex._id);
    if (isTrainTask(vertex)) {
      const { _id, _key, _rev, name, desc } = vertex;
      this.nodes.set(_id, {
        id: _id,
        key: _key,
        revision: _rev,
        type: "task",
        isDeliveryBranch: false,
        isSearchResult,
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
        isSearchResult,
        startStep,
        stopStep: -1,
      });
      return _id;
    }

    if (isCheckpoint(vertex)) {
      if (viewType === "config") {
        if (vertex.isDelivery) {
          const config = this.nodes.get(vertex.config)!;
          config.isDelivery = true;
          this.nodes.set(vertex.config, config);
        }
      } else if (viewType === "ckpt") {
        const { _id, _key, _rev, path, ...others } = vertex;
        const outEdges = <DBEdgeDocument[]>this.adjacencyList.get(_id)!;
        let hasEvalResult = false;
        for (const outEdge of outEdges) {
          const child = this.vertices.get(outEdge._to)!;
          if (isEvalResult(child) && child.isValid) {
            hasEvalResult = true;
            break;
          }
        }
        this.nodes.set(_id, {
          id: _id,
          key: _key,
          revision: _rev,
          type: "ckpt",
          isDeliveryBranch: false,
          isSearchResult,
          ckptPath: path,
          hasEvalResult,
          ...others,
        });
        return _id;
      }
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
      (isCheckpoint(vertex) && viewType == "config") ||
      isEvalResult(vertex)
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
      if (startNode.isDelivery && !visited.has(id)) {
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
    this.searchedNodes = nodes;
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
  private db: Database;
  private ckptDTO: CheckpointDatasource;
  private ckptStepDTO: CkptStepDatasource;
  private resumeCkptDTO: ResumeCkptDatasource;
  private trainConfigDTO: TrainConfigDatasource;
  private trainTaskDTO: TrainTaskDatasource;
  private evalResultDTO: EvalResultDatasource;
  private ckptEvalDTO: CkptEvalDatasource;
  private logDTO: TrainLogDatasource;
  private procDTO: TrainProcDatasource;

  constructor(
    @inject(TYPES.Database) db: Database,
    @inject(CheckpointDatasource) ckptDTO: CheckpointDatasource,
    @inject(CkptStepDatasource) ckptStepDTO: CkptStepDatasource,
    @inject(ResumeCkptDatasource) resumeCkptDTO: ResumeCkptDatasource,
    @inject(TrainConfigDatasource) trainConfigDTO: TrainConfigDatasource,
    @inject(TrainTaskDatasource) trainTaskDTO: TrainTaskDatasource,
    @inject(EvalResultDatasource) evalResultDTO: EvalResultDatasource,
    @inject(CkptEvalDatasource) ckptEvalDTO: CkptEvalDatasource,
    @inject(TrainLogDatasource) logDTO: TrainLogDatasource,
    @inject(TrainProcDatasource) procDTO: TrainProcDatasource,
  ) {
    this.db = db;
    this.ckptDTO = ckptDTO;
    this.ckptStepDTO = ckptStepDTO;
    this.resumeCkptDTO = resumeCkptDTO;
    this.trainConfigDTO = trainConfigDTO;
    this.trainTaskDTO = trainTaskDTO;
    this.evalResultDTO = evalResultDTO;
    this.ckptEvalDTO = ckptEvalDTO;
    this.logDTO = logDTO;
    this.procDTO = procDTO;
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

    const eval_result_list = await this.evalResultDTO.findAll();
    eval_result_list.forEach((eval_result) => graph.addVertex(eval_result));

    const ckpt_eval_list = await this.ckptEvalDTO.findAll();
    ckpt_eval_list.forEach((ckpt_eval) => graph.addEdge(ckpt_eval));

    return graph;
  }

  async getGraphView(
    viewType: "ckpt" | "config",
    nodes: string[] | null = null,
  ): Promise<Roadmap> {
    const graph = await this.fetchGraph();
    if (nodes !== null) {
      graph.getConnectedComponents(nodes);
    }
    graph.topologicalSort(viewType);
    graph.isDeliveryBranchNodes();
    return graph.returnGraph();
  }

  async saveRoadmapOffline(graph: any) {
    const trx = await this.db.beginTransaction([
      this.trainTaskDTO.collection,
      this.trainConfigDTO.collection,
      this.ckptDTO.collection,
      this.ckptStepDTO.collection,
      this.resumeCkptDTO.collection,
      this.logDTO.collection,
    ]);
    let count = 0;
    const taskList = [];
    const taskMap = new Map<string, string[]>();
    let allCkptMap = new Map<string, string>();
    for (const { loadCkpt, configs, ...task } of graph) {
      count++;
      if (configs.length === 0) {
        throw new Error(`Nothing to save for the ${count}th data.`);
      }
      let savedTaskId;
      if ("name" in task) {
        const savedTask = await trx.step(() =>
          this.trainTaskDTO.createOne(task),
        );
        taskList.push(savedTask);
        if (loadCkpt) {
          await this.createResumeCkptByResume(
            savedTask,
            loadCkpt,
            allCkptMap,
            taskMap,
            trx,
          );
        }
        savedTaskId = savedTask._id;
      } else {
        if (!loadCkpt) {
          throw new Error(
            `Must have "loadCkpt" for no "name" data as the ${count}th one.`,
          );
        }
        const ckpt = await this.ckptDTO.findOnlyOneByMd5(loadCkpt);
        const lastConfig = await this.trainConfigDTO.findOneById(ckpt.config);
        savedTaskId = lastConfig!.task;
      }
      const configMap = new Map<string, string[]>();
      const ckptMap = new Map<string, string>();
      const configIter = this.createTrainConfigs(configs, savedTaskId, trx);
      for await (const config of configIter) {
        if ("loadCkpt" in config && config.loadCkpt) {
          const configLoadCkpt = config.loadCkpt;
          if (configLoadCkpt) {
            if (allCkptMap.has(configLoadCkpt)) {
              throw new Error(
                `${config.configPath} should not be resumed from checkpoint ${configLoadCkpt}, but a checkpoint under ${count}th task.`,
              );
            }
            await this.createResumeCkptByResume(
              config,
              configLoadCkpt,
              ckptMap,
              configMap,
              trx,
            );
          }
        } else {
          await trx.step(() =>
            this.resumeCkptDTO.createOne({
              _from: savedTaskId,
              _to: config._id,
            }),
          );
        }

        const ckptStep = {
          _from: config._id,
          _to: undefined,
          steps: config.ckpts[0].step - (config.startStep || 0),
          tokens:
            config.ckpts[0].tokens !== undefined
              ? config.ckpts[0].tokens - (config.startToken || 0)
              : undefined,
          duration:
            config.startTime && config.ckpts[0].saveTime
              ? moment.duration(
                  moment(config.ckpts[0].saveTime).diff(
                    moment(new Date(config.startTime)),
                  ),
                )
              : undefined,
        };

        const savedCkpts = await this.createCheckpoints(
          config.ckpts,
          ckptStep,
          trx,
        );

        for (const savedCkpt of savedCkpts) {
          await this.createResumeCkptByCkpt(
            savedCkpt,
            ckptMap,
            taskMap,
            configMap,
            trx,
          );
        }
      }
      if (configMap.size > 0) {
        throw new Error(
          `No Checkpoints ${Array.from(configMap.keys())} for Configs to resume.`,
        );
      }
      allCkptMap = new Map<string, string>([...allCkptMap, ...ckptMap]);
    }
    if (taskMap.size > 0) {
      for (const [key, value] of taskMap) {
        await this.saveResumeCkpt(key, value, trx);
      }
    }
    await trx.commit();
    return taskList;
  }

  async saveNewProcOnline(
    procInfo: any,
    procMd5: string,
    ckptMd5: string | null = null,
  ) {
    let savedConfig;
    const trx = await this.db.beginTransaction([
      this.trainTaskDTO.collection,
      this.trainConfigDTO.collection,
      this.ckptDTO.collection,
      this.ckptStepDTO.collection,
      this.resumeCkptDTO.collection,
      this.procDTO.collection,
      this.logDTO.collection,
    ]);
    const [task, taskLeft] = splitObject<TrainTask>(procInfo);
    if (task) {
      const savedTask = await trx.step(() => this.trainTaskDTO.createOne(task));
      if (ckptMd5) {
        await this.saveResumeCkpt(ckptMd5, [savedTask._id], trx);
      }
      const configIter = this.createTrainConfigs(
        [taskLeft],
        savedTask._id,
        trx,
      );
      for await (const config of configIter) {
        trx.step(() =>
          this.resumeCkptDTO.createOne({
            _from: savedTask._id,
            _to: config._id,
          }),
        );
        trx.step(() =>
          this.procDTO.createOne({
            md5: procMd5,
            config: config._id,
            ...config.proc,
          }),
        );
        savedConfig = config;
      }
    } else {
      if (!ckptMd5) {
        throw new Error(
          `Must input resume checkpoint MD5 if no task name is specified.`,
        );
      } else {
        const ckpt = await this.ckptDTO.findOnlyOneByMd5(ckptMd5);
        const lastConfig = await this.trainConfigDTO.findOneById(ckpt.config);
        const configIter = this.createTrainConfigs(
          [taskLeft],
          lastConfig!.task,
          trx,
        );
        for await (const config of configIter) {
          await trx.step(() =>
            this.resumeCkptDTO.createOne({
              _from: lastConfig!.task,
              _to: config._id,
            }),
          );
          await trx.step(() =>
            this.procDTO.createOne({
              md5: procMd5,
              config: config._id,
              ...config.proc,
            }),
          );
          savedConfig = config;
        }
      }
    }
    trx.commit();
    return savedConfig;
  }

  async saveNewCkptOnline(ckptInfo: any, procMd5: string) {
    const trx = await this.db.beginTransaction([
      this.ckptDTO.collection,
      this.ckptStepDTO.collection,
    ]);
    const proc = await this.procDTO.findOnlyOneByMd5(procMd5);
    const lastCkpt = await this.findLastCkptByConfig(proc.config);
    const ckpt = await trx.step(() => this.ckptDTO.createOne(ckptInfo));
    await trx.step(() => this.ckptStepDTO.createStepByCkpts(lastCkpt, ckpt));
    await trx.commit();
    return ckpt;
  }

  async saveResumeCkpt(
    ckptMd5: string,
    outEdges: string[],
    trx: Transaction | null = null,
  ) {
    const ckpt = await this.ckptDTO.findOnlyOneByMd5(ckptMd5);
    for (const outEdge of outEdges) {
      const resume = {
        _from: ckpt._id,
        _to: outEdge,
      };
      if (trx) {
        await trx.step(() => this.resumeCkptDTO.createOne(resume));
      } else {
        await this.resumeCkptDTO.createOne(resume);
      }
    }
  }

  async saveCheckpoint(
    ckpt: Partial<Checkpoint>,
    ckptStep: Partial<CkptStep>,
    trx: Transaction | null = null,
  ) {
    if (trx) {
      const savedCkpt = await trx.step(() => this.ckptDTO.createOne(ckpt));
      ckptStep._to = savedCkpt._id;
      await trx.step(() => this.ckptStepDTO.createOne(ckptStep));
      return savedCkpt;
    } else {
      const savedCkpt = await this.ckptDTO.createOne(ckpt);
      ckptStep._to = savedCkpt._id;
      await this.ckptStepDTO.createOne(ckptStep);
      return savedCkpt;
    }
  }

  async createCheckpoints(
    ckpts: Partial<Checkpoint & { tokens: number }>[],
    ckptStep: Partial<CkptStep>,
    trx: Transaction | null = null,
  ) {
    const config = ckptStep._from;
    const savedCkpts = [];
    ckpts.sort((a, b) => a.step! - b.step!);
    for (let i = 0; i < ckpts.length; i++) {
      const ckpt = ckpts[i];
      ckpt.config = config;
      const savedCkpt = await this.saveCheckpoint(ckpt, ckptStep, trx);
      if (savedCkpt) {
        savedCkpts.push(savedCkpt);
        ckpt._id = savedCkpt._id;
      }
      if (i < ckpts.length - 1) {
        const nextCkpt = ckpts[i + 1];
        const step = await this.ckptStepDTO.createStepByCkpts(
          ckpt,
          nextCkpt,
          false,
        );
        if (savedCkpt) {
          ckptStep = step;
        } else {
          ckptStep.steps = step.steps
            ? step.steps + (ckptStep.steps || 0)
            : undefined;
          ckptStep.tokens = step.tokens
            ? step.tokens + (ckptStep.tokens || 0)
            : undefined;
          ckptStep.duration =
            step.duration && ckptStep.duration
              ? step.duration.add(ckptStep.duration)
              : undefined;
        }
      }
    }
    return savedCkpts;
  }

  async *createTrainConfigs(
    configs: any,
    taskId: string,
    trx: Transaction | null = null,
  ) {
    for (const { ckpts, loadCkpt, ...taskLeft } of configs) {
      const [config, configLeft] = splitObject<TrainConfig>(
        taskLeft as Required<TrainConfig>,
      );
      const [log, proc] = splitObject<TrainLog>(
        configLeft as Required<TrainLog>,
      );
      config.task = taskId;
      let savedConfig;
      if (trx) {
        savedConfig = await trx.step(() =>
          this.trainConfigDTO.createOne(config),
        );
      } else {
        savedConfig = await this.trainConfigDTO.createOne(config);
      }
      log.config = savedConfig._id;
      let savedLog;
      if (trx) {
        savedLog = await trx.step(() => this.logDTO.createOne(log));
      } else {
        savedLog = await this.logDTO.createOne(log);
      }
      yield {
        ckpts,
        loadCkpt,
        proc,
        log: savedLog,
        ...savedConfig,
      };
    }
  }

  async createResumeCkptByCkpt(
    node: Checkpoint,
    md5CkptMap: Map<string, string>,
    taskMap: Map<string, string[]>,
    configMap: Map<string, string[]>,
    trx: Transaction | null = null,
  ) {
    md5CkptMap.set(node.md5, node._id);
    if (taskMap.has(node.md5)) {
      for (const taskId in taskMap.get(node.md5)) {
        const resume = {
          _from: node._id,
          _to: taskId,
        };
        if (trx) {
          await trx.step(() => this.resumeCkptDTO.createOne(resume));
        } else {
          await this.resumeCkptDTO.createOne(resume);
        }
      }
      taskMap.delete(node.md5);
    }
    if (configMap.has(node.md5)) {
      for (const configId in configMap.get(node.md5)) {
        const resume = {
          _from: node._id,
          _to: configId,
        };
        if (trx) {
          await trx.step(() => this.resumeCkptDTO.createOne(resume));
        } else {
          await this.resumeCkptDTO.createOne(resume);
        }
      }
      configMap.delete(node.md5);
    }
  }

  async createResumeCkptByResume(
    node: TrainConfig | TrainTask,
    ckptMd5: string,
    md5CkptMap: Map<string, string>,
    resumeMap: Map<string, string[]>,
    trx: Transaction | null = null,
  ) {
    if (md5CkptMap.has(ckptMd5)) {
      const resume = {
        _from: md5CkptMap.get(ckptMd5)!,
        _to: node._id,
      };
      if (trx) {
        await trx.step(() => this.resumeCkptDTO.createOne(resume));
      } else {
        await this.resumeCkptDTO.createOne(resume);
      }
    } else if (resumeMap.has(ckptMd5)) {
      const resumes = resumeMap.get(ckptMd5)!;
      resumes.push(node._id);
      resumeMap.set(ckptMd5, resumes);
    } else {
      resumeMap.set(ckptMd5, [node._id]);
    }
  }

  async findLastCkptByConfig(configId: string) {
    const config = await this.trainConfigDTO.findOneById(configId);
    if (!config) {
      throw new Error(`Config ${configId} not found.`);
    }
    const ckpts = await this.ckptDTO.findManyByConfig(configId);
    const proc = await this.procDTO.findOnlyOneByConfig(configId);
    ckpts.sort((a, b) => a.step - b.step);
    let lastCkpt: any = {
      _id: config._id,
      step: config.startStep || 0,
      tokens: config.startToken || 0,
      saveTime: proc.startTime || undefined,
    };
    for (const ckpt of ckpts) {
      const step = await this.ckptStepDTO.findManyByKeys({
        _from: lastCkpt._id,
        _to: ckpt._id,
      });
      if (step.length === 0) {
        throw new Error(`No edge found from ${lastCkpt._id} to ${ckpt._id}`);
      } else if (step.length > 1) {
        throw new Error(`No edge found from ${lastCkpt._id} to ${ckpt._id}`);
      } else {
        const tokens = lastCkpt.tokens + (step[0].tokens || 0);
        lastCkpt = ckpt;
        lastCkpt.tokens = tokens;
      }
    }
    if (
      lastCkpt._id !== config._id &&
      lastCkpt.tokens === (config.startToken || 0)
    ) {
      delete lastCkpt.tokens;
    }
    return lastCkpt;
  }
}

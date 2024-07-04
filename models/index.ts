/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Checkpoint } from "./Checkpoint";
import { CkptStep } from "./CkptStep";
import { TrainConfig, ResumeCkpt } from "./TrainConfig";

export class Roadmap {
    ckptList: Checkpoint[];
    ckptStepList: CkptStep[];
    trainConfigList: TrainConfig[];
    resumeCkptList: ResumeCkpt[];

    constructor(
        ckptList: Checkpoint[],
        ckptStepList: CkptStep[],
        trainConfigList: TrainConfig[],
        resumeCkptList: ResumeCkpt[],
    ){
        this.ckptList = ckptList;
        this.ckptStepList = ckptStepList;
        this.trainConfigList = trainConfigList;
        this.resumeCkptList = resumeCkptList;
    }
}

export { Checkpoint, CkptStep, TrainConfig, ResumeCkpt };
export * from "./Document";
export * from "./EvalResult";
export * from "./TrainLog";
export * from "./TrainTask";
export * from "./users";
export * from "./workspace";
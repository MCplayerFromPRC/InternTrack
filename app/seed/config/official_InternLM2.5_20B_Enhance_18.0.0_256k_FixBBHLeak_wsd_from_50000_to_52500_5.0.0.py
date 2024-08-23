# Copyright (c) InternLM. All rights reserved.
import os
from functools import partial

from configs._base_.default_runtime import *  # pylint: disable=wildcard-import,unused-wildcard-import
from configs._base_.models.internlm.internlm2_20B import *  # pylint: disable=wildcard-import,unused-wildcard-import
from configs._base_.monitors.base import *  # pylint: disable=wildcard-import,unused-wildcard-import

from configs.filter_funcs.prev_filter_op_0130 import *
from torch.optim.lr_scheduler import _LRScheduler

# model['extra_pred_tokens'] = N
# note off the script above will envoke training with multi-token-prediction: predict next N+1 tokens.

if "JOB_NAME" in os.environ:
    JOB_NAME = os.environ["JOB_NAME"]
else:
    JOB_NAME = os.path.basename(__file__).split(".py")[0]

VOCAB_FILE = "/ailab_internlm_data/share_data/zhangshuo/tokenizers/v13.model"

parallel = dict(
    zero1=dict(size=2),
    tensor=dict(size=8, mode="msp"),
    pipeline=dict(size=1, interleaved_overlap=True),
    weight=dict(size=1, overlap=True, memory_pool=True),
)

model["checkpoint"] = False
model['mlp_layer_fusion'] = True
model["rope_base"] = 50_000_000

# If set, will enable debug mode
# In non-debug mode, all the local changes are requested to be committed, otherwise the training will not start
DEBUG = 1

# Whether to enble `spawn` mode for pytorch multiprocessing. If set to False, will use `fork` mode during training.
MP_SPAWN = False

ENABLE_SAVE_CKPT = True

# Dataset path
TRAIN_FOLDER = f"/data/ailab_internlm_data/share_data/zhangshuo/datasets/official_InternLM2.5_20B_Enhance_14.0.0_32k_FixBBHLeak_wsd_from_10000_to_12500_5.0.0/"
VALID_FOLDER: str = None

TOTAL_STEP = 52500
VALID_EVERY = TOTAL_STEP + 1

MICRO_NUM = 2
VALID_MICRO_NUM = 1
GRADIENT_ACCUMULATION = MICRO_NUM

MICRO_BATCH_SIZE = 1  # packed_length = micro_batch_size * seq_len
SEQ_LEN = 4096
MIN_LENGTH = 0

# Two settings: "streaming" and "tokenized"
# If set to "streaming", will use streaming dataset (on-the-fly tokenize)
# If set to "tokenized", will use pre-tokenized dataset
DATASET_TYPE = "streaming"

# Truncation rules for the pack process.
# It is recommended to set it to :
# `none`(streaming dataset v1)     | "cut"(streaming dataset v2) for pre-training
# `complete`(streaming dataset v1) | "pad"(streaming dataset v2) for fine-tuning tasks to keep the context intact.
# "pad"(tokenized dataset) | "cut"(tokenized dataset)
PACK_DATASET_BREAK_MODE = "pad"

# if VALID_PACK_DATASET_BREAK_MODE set to None, won't use packed validation
# It is recommended to set it to :
# "cut"(streaming dataset v2) for pre-training
# "pad"(streaming dataset v2) for fine-tuning tasks to keep the context intact.
# only v2 version is supported.
# when set to packed mode, we will disable VALID_MICRO_NUM.
VALID_PACK_DATASET_BREAK_MODE = None

# You might change it for better tgs
VALID_PACKED_LENGTH = SEQ_LEN

# If set to -1, will use SEQ_LEN as the max length of each sample
MAX_LENGTH_PER_SAMPLE = SEQ_LEN  # Or set as -1

# There are four tokenizer_wrapper types: "pretrain", "sft", "sft_multi_round", "fim", "online_prompt"
TOKENIZER_WRAPPER_TYPE = "sft"

LEARNING_RATE = 4.3177856934944e-06
MIN_LEARNING_RATE = 1e-6
WEIGHT_DECAY = 0.
WARMUP_RATIO = 2000 / TOTAL_STEP
OPTIMIZER_WARMUP_STEP = 0

CHECKPOINT_EVERY = 2000
SNAPSHOT_FREQ = CHECKPOINT_EVERY // 4


# The following configs are OSS_NAME & OSS_IP in different clusters.
OSS_HEAD = "boto3:s3"
OSS_NAME = "checkpoints_ssd_02"
OSS_IP = "10.135.7.249"  # P/T cluster

# OSS_HEAD = "boto3:s3"
# OSS_NAME = "{USER}_openlmlab"
# OSS_IP = "10.140.86.165"  # Langchao cluster

# OSS_HEAD = "boto3:s3"
# OSS_NAME = "model_weights"
# OSS_IP = "10.140.14.252"  # S cluster

# OSS_HEAD = "volc:vc"
# OSS_NAME = "tos-sh-llm"
# OSS_IP = "tos-cn-shanghai.ivolces.com"

# OSS_HEAD = "oss2:ali"
# OSS_NAME = "pjlab-lingjun-a100-test"
# OSS_IP = "oss-cn-wulanchabu-internal.aliyuncs.com"


# Ckpt folder format:
#  fs: 'local: /mnt/nfs/XXX'
# oss: 'boto3: s3://model_weights/XXX'
SAVE_CKPT_FOLDER = f"local:/ailab_internlm_data/share_data/zhangshuo/ckpts/{JOB_NAME}"

# If you want to train from scratch, set LOAD_CKPT_FOLDER to None.
LOAD_CKPT_FOLDER = "local:/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/50000"
# LOAD_CKPT_FOLDER = f"boto3:s3://{OSS_NAME}.{OSS_IP}/{JOB_NAME}/{CHECKPOINT_EVERY}"

# NOTE: there are 2 params in LOAD_CKPT_FOLDER_INFO: content and ckpt_type.
# content should be in "all", "model", "sampler", "optimizer", "scheduler"
# ckpt_type should be in "internlm", "llama", "fuxi", "newton", "maibao", "plato", "to_internlm2", "internlm2"
LOAD_CKPT_FOLDER_INFO = dict(path=LOAD_CKPT_FOLDER, content=["model", "dataset"], ckpt_type="internlm2")

DATASET_WEIGHTS = {
    "Magicoder-OSS-Instruct-75K": 0.06846083460942362,
    "Magicoder-Evol-Instruct-110K": 0.1087770520141705,
    "P_math_fp_v1.0.0_20240522": 0.3862431305036553,
    "P_sc_math_cot_v1.0.0_20240522": 0.4177553777296132,
    "P_math_enhancement_v1.0.0_20240714": 0.0017133297724154033,
    "passage_retrieval_en": 0.005571928294498622,
    "passage_retrieval_zh": 0.011478347076223364
}
SUBSET_PARAMS = {
    # aops
    "aops_1210": {"tokenizer_wrapper": "pretrain"},
    "aops_1225": {"tokenizer_wrapper": "pretrain"},
    # code
    "1220_commit_data": {"tokenizer_wrapper": "pretrain"},
    "evol_code_v4x_r2_0_merged_shuffled": {"prompt_text_field": "instruction"},
    "Magicoder-OSS-Instruct-75K": {"output_text_field": "content"},
    "Magicoder-Evol-Instruct-110K": {"output_text_field": "content"},
    "P_code_simulation_v1.0.0_20240617": {"tokenizer_wrapper": "base_format"},
    # math
    "P_math_fp_v1.0.0_20240522": {"tokenizer_wrapper": "pretrain"},
    "P_sc_math_cot_v1.0.0_20240522": {"prompt_text_field": "query", "output_text_field": "response"},
    # math_construct
    "P_mixed_math_construct_v2.0.0_240326": {"tokenizer_wrapper": "sft_multi_round"},
    # recall
    "kaoshi_wizardcot": {"tokenizer_wrapper": "pretrain"},
    "math": {"tokenizer_wrapper": "pretrain"},
    "mmlu": {"tokenizer_wrapper": "pretrain"},
    "retrieval_from_eval": {"tokenizer_wrapper": "pretrain"},
    "P_cc_math_v1.3.0_240514": {"tokenizer_wrapper": "pretrain"},
    "P_TheoremQA_recall_v1.0.0_20240605": {"tokenizer_wrapper": "pretrain"},
    "P_exam_recall_v1.0.0_20240615_GPQA_diamond": {"tokenizer_wrapper": "pretrain"},
    "P_exam_recall_v1.0.0_20240615_GaokaoBench": {"tokenizer_wrapper": "pretrain"},
    "P_exam_recall_v1.0.0_20240615_ceval_test": {"tokenizer_wrapper": "pretrain"},
    "P_exam_recall_v1.0.0_20240615_cmmlu": {"tokenizer_wrapper": "pretrain"},
    # cn_feature
    "leizhikai_cn_tese2": {"tokenizer_wrapper": "pretrain"},
    # stock
    "P_stock_v1.0.0_20240522": {"tokenizer_wrapper": "io_format", "prompt_text_field": "input"},
    # kaoshi
    "pinshi_shuffle": {"tokenizer_wrapper": "pretrain"},
    "shigeyuan_shuffle": {"tokenizer_wrapper": "pretrain"},
    "wenyanwen_trains_shuffle": {"tokenizer_wrapper": "pretrain"},
    # P_kaoshi_pot_v1.0.0_20240617
    "multi_round": {"tokenizer_wrapper": "sft_multi_round"},
    # P_orca_v1.0.0_20240618
    "shibing624_sharegpt_gpt4": {"tokenizer_wrapper": "sft_multi_round"},
    "m-a-p_neo_sft_phase2": {"tokenizer_wrapper": "sft_multi_round"},
}

for key, value in {
    key: {
        "tokenizer_wrapper": "base_format",
        "break_mode": "pad",
        "min_length": 0
    } for key in os.listdir(os.path.join(TRAIN_FOLDER, "P_longbench_enhancement_2.0.0_20240622"))
}.items():
    if key not in SUBSET_PARAMS:
        SUBSET_PARAMS[key] = value
    else:
        SUBSET_PARAMS[key] = {**SUBSET_PARAMS[key], **value}

ckpt = dict(
    # Save ckpt settings
    enable_save_ckpt=ENABLE_SAVE_CKPT,  # If set to True, will save ckpt to save_ckpt_folder.
    save_ckpt_folder=SAVE_CKPT_FOLDER,  # Path to save ckpt.
    # Save ckpt frequency
    checkpoint_every=CHECKPOINT_EVERY,
    oss_snapshot_freq=SNAPSHOT_FREQ,
    # Load ckpt settings
    auto_resume=False,  # If set to True, will auto-load the latest checkpoint in save_ckpt_folder.
    load_ckpt_info=LOAD_CKPT_FOLDER_INFO,  # If auto_resume is False, will load checkpoint from load_ckpt_folder.
    # Other infos
    async_upload=True,
    async_upload_tmp_folder=f"/dev/shm/internlm_tmp_ckpt_{JOB_NAME}/",
    stop_file_path=f"llm_alter/{JOB_NAME}.log",
)

# if set to True, model's norm will use fp32 instead of model.dtype
use_fp32_norm = True

# Frequency of checking the model weights under different process groups
parallel_check_freq = 100

# if you want to filter something or use online prompt by generating dynamic attibutes:
# folder that save meta info for attibutes dataset
META_FOLDER = None

# Use mmap version of meta data. Enabling this option helps prevent memory overflow,
# but you need to use tools/scripts/make_mmap_meta_file.py to pre-process meta data.
# '0' means that the mmap mode is not applicable, '1' means that the mmap mode is
# started for the *.npy file nearby, and '2' means that the mmap mode is further
# started for the *.npz file, which is more time-consuming but saves more memory.
MMAP_META_STAGE = 1

# field that you want use in meta infos
# for example ATTRIBUTES = {"advertisement", "influency"}
ATTRIBUTES = None

# function name that reflects from train_internlm/data/attribute_manager/attibute_filter_ops.py
# use this if only you can decide wether to filter by only extra attributes
# you may create your own function in train_internlm/data/attribute_manager/attibute_filter_ops.py
# for example PREV_FILTER_FUNC = "prev_filter_op"
PREV_FILTER_FUNC = None

# function name that reflects from train_internlm/data/attribute_manager/attibute_filter_ops.py
# use this if you want to filter with content info or you want generate dynamic attibutes
# you may create your own function in train_internlm/data/attribute_manager/attibute_filter_ops.py
# for example DYNAMIC_ATTRIBUTE_FUNC = "dynamic_attr_op"
DYNAMIC_ATTRIBUTE_FUNC = None

# if you want do online prompting on jsonl samples, you should do like we do in below:
# according to data filed "data_type" generating online prompt
# most of the time it is a must to use DYNAMIC_ATTRIBUTE_FUNC with it
# You should also set tokenizer_wrapper to `online_prompt`
# ONLINE_PROMPT = {
#     "porn":{"This is a porn sample:\n":0.3, "This is a good sample with porn information:\n":0.6},
#     "politic":{"This is a politic sample:\n":0.7},
# }

FIM_CONF = None

data = dict(
    type=DATASET_TYPE,
    tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
    train_folder=TRAIN_FOLDER,
    valid_folder=VALID_FOLDER,
    vocab_file=VOCAB_FILE,  # pylint: disable=undefined-variable
    seq_len=SEQ_LEN,
    # Datasets with less than `MIN_LENGTH` will be discarded
    min_length=MIN_LENGTH,
    # micro_num means the number of micro_batch contained in one gradient update
    micro_num=MICRO_NUM,
    micro_bsz=MICRO_BATCH_SIZE,
    # defaults to the value of micro_num
    valid_micro_num=VALID_MICRO_NUM,
    total_steps=TOTAL_STEP,
    # defaults to 0, means disable evaluate
    valid_every=VALID_EVERY,
    pack_sample_into_one=False,
    skip_batches="",
    rampup_batch_size="",
    num_worker=4,
    gradient_accumulation=GRADIENT_ACCUMULATION,
    text_field="content",
    val_text_field="content",
    # prompt_text_field="prompt",
    # output_text_field="content",
    dataset_weights=DATASET_WEIGHTS,  # sample_data_weights
    break_mode=PACK_DATASET_BREAK_MODE,
    drop_last=True,
    max_length_per_sample=MAX_LENGTH_PER_SAMPLE,
    meta_folder=META_FOLDER,
    mmap_meta_stage=MMAP_META_STAGE,
    attributes=ATTRIBUTES,
    prev_filter_func_str=PREV_FILTER_FUNC,
    dynamic_attributes_func_str=DYNAMIC_ATTRIBUTE_FUNC,
    # which means loading arributes on the fly
    lazy_load_attribute=True,
    online_prompt=None,
    fim_conf=FIM_CONF,
    empty_cache_and_diag_interval=500,
    diag_outlier_ratio=1.1,
    # only work for TOKENIZER_WRAPPER_TYPE = "pretrain"
    # if set to True, each splited sample will have bos
    always_bos=False,
    valid_pack_mode=VALID_PACK_DATASET_BREAK_MODE,
    valid_packed_length=VALID_PACKED_LENGTH,
    valid_drop_last=False,
    subset_params=SUBSET_PARAMS,
    probe_size=1e6,
    tokenizer_chunk_num=8
)

grad_scaler = dict(
    fp16=dict(
        # the initial loss scale, defaults to 2**16
        initial_scale=2**14,
        # the minimum loss scale, defaults to None
        min_scale=1,
        # the number of steps to increase loss scale when no overflow occurs
        growth_interval=1000,
    ),
    # the multiplication factor for increasing loss scale, defaults to 2
    growth_factor=2,
    # the multiplication factor for decreasing loss scale, defaults to 0.5
    backoff_factor=0.5,
    # the maximum loss scale, defaults to None
    max_scale=2**24,
    # the number of overflows before decreasing loss scale, defaults to 2
    hysteresis=2,
)

loss = dict(label_smoothing=0.0)

adam = dict(
    lr=LEARNING_RATE,
    adam_beta1=0.9,
    adam_beta2=0.95,
    adam_beta2_c=0,
    adam_eps=1e-8,
    weight_decay=WEIGHT_DECAY,
)

class WSDLinearDecayLR(_LRScheduler):
    """A custom learning rate scheduler with a constant decay factor."""

    def __init__(self, optimizer, total_steps, decay_steps, last_epoch=-1, verbose=False):
        self.total_steps = total_steps
        self.decay_steps = decay_steps
        super().__init__(optimizer, last_epoch, verbose)

    def get_lr(self):
        if self.last_epoch == 0:
            return self.base_lrs

        decay_factor = 0.1 + ((self.decay_steps - self.last_epoch) / self.decay_steps)*0.9
        return [group_lr * decay_factor for group_lr in self.base_lrs]

lr_scheduler = dict(
    type="ConstantStableDecayWarmupLR",
    total_steps=data["total_steps"],
    warmup_steps=OPTIMIZER_WARMUP_STEP,
    decay_steps=2500,  # 衰减step比例
    custom_scheduler=WSDLinearDecayLR, # 一个类，可以自己传
    last_epoch=50000
)

beta2_scheduler = dict(
    init_beta2=adam["adam_beta2"],
    c=adam["adam_beta2_c"],
    cur_iter=-1,
)
parallel_check_freq=10000000000000000
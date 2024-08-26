# Copyright (c) InternLM. All rights reserved.
import os
from functools import partial

from configs._base_.default_runtime import *  # pylint: disable=wildcard-import,unused-wildcard-import
from configs._base_.models.internlm.internlm2_20B import *  # pylint: disable=wildcard-import,unused-wildcard-import
from configs._base_.monitors.base import *  # pylint: disable=wildcard-import,unused-wildcard-import

from configs.filter_funcs.prev_filter_op_0130 import *

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
    pipeline=dict(size=2, interleaved_overlap=True),
    weight=dict(size=1, overlap=True, memory_pool=True),
)

model["checkpoint"] = True
model['mlp_layer_fusion'] = True

# If set, will enable debug mode
# In non-debug mode, all the local changes are requested to be committed, otherwise the training will not start
DEBUG = 1

# Whether to enble `spawn` mode for pytorch multiprocessing. If set to False, will use `fork` mode during training.
MP_SPAWN = False

ENABLE_SAVE_CKPT = True

# Dataset path
TRAIN_FOLDER = f"/ailab_internlm_data/share_data/zhangshuo/datasets/{JOB_NAME}"
VALID_FOLDER: str = None

TOTAL_STEP = 110000
VALID_EVERY = TOTAL_STEP + 1

MICRO_NUM = 2
VALID_MICRO_NUM = 1
GRADIENT_ACCUMULATION = MICRO_NUM

MICRO_BATCH_SIZE = 8  # packed_length = micro_batch_size * seq_len
SEQ_LEN = 4096
MIN_LENGTH = 50

# Two settings: "streaming" and "tokenized"
# If set to "streaming", will use streaming dataset (on-the-fly tokenize)
# If set to "tokenized", will use pre-tokenized dataset
DATASET_TYPE = "streaming"

# Truncation rules for the pack process.
# It is recommended to set it to :
# `none`(streaming dataset v1)     | "cut"(streaming dataset v2) for pre-training
# `complete`(streaming dataset v1) | "pad"(streaming dataset v2) for fine-tuning tasks to keep the context intact.
# "pad"(tokenized dataset) | "cut"(tokenized dataset)
PACK_DATASET_BREAK_MODE = "cut"

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
TOKENIZER_WRAPPER_TYPE = "pretrain"

LEARNING_RATE = 5e-5
MIN_LEARNING_RATE = 5e-6
WEIGHT_DECAY = 0.1
WARMUP_RATIO = 2000 / TOTAL_STEP
OPTIMIZER_WARMUP_STEP = 0

CHECKPOINT_EVERY = 2000
SNAPSHOT_FREQ = CHECKPOINT_EVERY // 2

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
# LOAD_CKPT_FOLDER = "local:/nas/shared/alillm2/zhangshuo/ckpts/official_Tangwan_20B_1.0.0/0/"
# LOAD_CKPT_FOLDER = f"boto3:s3://{OSS_NAME}.{OSS_IP}/{JOB_NAME}/{CHECKPOINT_EVERY}"
LOAD_CKPT_FOLDER = "local:/data/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_1.4.0/snapshot/0/"
# NOTE: there are 2 params in LOAD_CKPT_FOLDER_INFO: content and ckpt_type.
# content should be in "all", "model", "sampler", "optimizer", "scheduler"
# ckpt_type should be in "internlm", "llama", "fuxi", "newton", "maibao", "plato", "to_internlm2", "internlm2"
# LOAD_CKPT_FOLDER_INFO = dict(path=LOAD_CKPT_FOLDER, content=["model",], ckpt_type="to_internlm2")
LOAD_CKPT_FOLDER_INFO = dict(path=LOAD_CKPT_FOLDER, content=["model", "dataset", "scheduler", "sampler"], ckpt_type="internlm2")

DATASET_WEIGHTS = {
    "github_go": 0.00019635531443333332,
    "github_javascript": 0.0007343693793666667,
    "starcoder_cpp": 0.0007144600925666667,
    "starcoder_python": 0.0008847706572999999,
    "github_python": 0.0004145138755666666,
    "starcoder_javascript": 0.0014701967142333333,
    "github_java": 0.0019109503111666665,
    "starcoder_java": 0.003066311460933333,
    "github_rust": 0.00014241431633333333,
    "starcoder_go": 0.0006635498934,
    "github_cpp": 0.0005920306070333333,
    "starcoder_rust": 0.00041734433026666666,
    "starcoder_sql": 0.0024598563648666662,
    "github_typescript": 0.0012006922801333331,
    "github_sql": 0.0006360641134,
    "starcoder_shell": 0.0005852819698,
    "starcoder_css": 0.0022606981222999998,
    "starcoder_typescript": 0.0041631237737666665,
    "starcoder_c-sharp": 0.005902809131833333,
    "github_css": 0.0011572435152333333,
    "github_shell": 0.000392812916,
    "retrieval_data_for_humaneval_x_shuffle": 0.001383864791,
    "retrieval_data_for_humaneval_eval_shuffle": 0.00014007768239999999,
    "retrieval_data_for_ds1000_shuffle": 0.0015751520042666667,
    "retrieval_data_for_mbpp_shuffle": 0.0007494690137666666,
    "retrieval_data_for_codereval_shuffle": 0.0012649662306333334,
    "tutorial_markdown_subset": 0.0002730154099,
    "leizhikai_cn_tese2": 0.00036242120506666664,
    "P_mixed_math_construct_v2.0.0_240326": 0.0001721843637333333,
    "P_symbolab_v1.0.0_20240518_merged": 0.0007046552382,
    "P_retrieve_for_mm_v1.0.0_240312_zh": 0.0009277082816666666,
    "kaoshi_wizardcot": 0.015464191240533333,
    "old_kaoshi_retrieve": 7.48384293e-05,
    "P_arenav2_recall_v1.0.0_20240521": 0.00019862990639999998,
    "openwebmath": 0.003849756517266666,
    "P_cc_math_v1.3.0_240514": 0.021402908786974997,
    "math": 0.00021664439349999997,
    "P_chat_recall_v1.0.0_20240521": 0.021072164226266666,
    "arxiv": 6.790225383333333e-05,
    "mmlu": 0.0007833571142,
    "algebraic-stack": 0.0021013889230000003,
    "P_retrieve_for_mm_v1.0.0_240312_en": 0.040062334011333335,
    "P_math_fp_v1.0.0_20240522": 0.00027322119320000003,
    "cpp_dependency": 0.022546807824316666,
    "cpp_random": 0.0024836853694,
    "go_dependency": 0.003959102544533333,
    "go_random": 0.0003429228572333333,
    "java_dependency": 0.011794867195524998,
    "java_random": 0.00038419895376666665,
    "js_dependency": 0.008805376568,
    "js_random": 0.0013830386931666667,
    "markdown_random": 0.0119926890229,
    "php_dependency": 0.011288937412033332,
    "php_random": 0.0003196465798,
    "python_random": 0.0017949500526,
    "P_html_data_v1.0.0_20240515": 0.02644797643525,
    "P_verilog_sft_v1.0.0_20240515": 3.3732163e-06,
    "python_stack_v2_add_comment_deepseek": 0.028909130067866665,
    "zh-magazine-longyuanqikan": 0.0068405097206,
    "zh-baidu-jingyan": 0.0004355575603749979,
    "zh-ebook": 0.010190503957450001,
    "zh-baike-teen": 5.693302499972311e-08,
    "zh-chatglm-fin": 0.00040711458697500027,
    "zh-baidu-zhidao": 0.0008467663309999994,
    "zh-baike-chinese": 0.00026920931089999907,
    "zh-baike-wiki": 0.00014906996250000013,
    "zh-quanzhishi-app": 3.3003566199999906e-05,
    "zh-baidu-baike": 0.008522126632666667,
    "zh-magazine-rendabaokan": 0.003007269657600001,
    "zh-dictionary-handian-ciyu": 4.449949656666861e-05,
    "zh-dictionary-handian-shici": 3.070625624997797e-06,
    "zh-dictionary-handian-zi": 7.5019828000004445e-06,
    "zh-knowledge-39healthy": 5.345937849999486e-06,
    "zh-psychspace-laiyinside": 1.2603275699999815e-05,
    "zh-cnipa-patent": 0.008837559531562499,
    "zh-zhihu-article-discipline": 0.0041535744219,
    "zh-zhihu-article-other": 0.00915569277775,
    "zh-baidu-aibangong": 3.9424640266665784e-05,
    "zh-wikihow": 1.0794137500000703e-05,
    "zh-paper-cnki": 0.022273762733725,
    "zh-zhihu-answer-discipline": 0.0028559749760749997,
    "zh-cnculture-gushici": 0.0002878958294249974,
    "zh-cnculture-duilian": 1.3334342025001118e-05,
    "zh-kepuchina": 6.240894232500023e-05,
    "zh-zhihu-answer-other": 0.004397144294900001,
    "zh-marxist": 3.2811014500003403e-06,
    "zh-chickensoup": 6.969985507499906e-05,
    "zh-judgement": 0.010947652291910002,
    "zh-news": 0.0021497953213249978,
    "zh-toutiao-news": 0.021947715443187497,
    "zh-xiaohongshu": 0.004907410433350003,
    "zh-law": 1.8927697399999736e-05,
    "zh-cnculture-guwen": 0.00023148701205000214,
    "en-ebook": 0.014483203584625,
    "en-cnipa-patent": 0.018854642881175002,
    "en-baike-britannica": 1.8082144200000025e-05,
    "en-baike-wiki": 0.004696274666624999,
    "en-national-geographic": 9.80263627500099e-06,
    "en-aops-community": 3.762616549998678e-06,
    "en-aops-wiki": 3.7834376999966445e-06,
    "en-wikihow": 6.523493249997562e-06,
    "en-paper-arxiv": 0.019647674453374998,
    "en-magazine-longyuanqikan": 5.327477640000161e-05,
    "en-magazine-rendabaokan": 1.059416249983569e-07,
    "en-sciencedaily": 0.00012741815197499158,
    "pile-wikipedia-en": 0.0019560520567499973,
    "pile-dm-mathematics": 8.723469216249182e-05,
    "pile-enron-emails": 8.066373049994343e-06,
    "pile-europarl": 0.00026674198609999997,
    "pile-freelaw": 0.002485301970625,
    "pile-hackernews": 7.509607405000013e-05,
    "pile-nih-exporter": 0.00011023942357500068,
    "pile-opensubtitles": 7.3882039124999295e-06,
    "pile-openwebtext2": 0.0013218743547875002,
    "pile-philpapers": 0.00011762675847499862,
    "pile-pubmed-abstracts": 0.0010083603947750044,
    "pile-pubmed-central": 0.007569713972924999,
    "pile-stackexchange": 0.0015595160335125,
    "pile-uspto-backgrounds": 0.0008056473893249989,
    "high_freq_high_trans": 0.0022293099889833332,
    "high_freq_low_trans": 0.016663494310333333,
    "increase_ins": 0.049196978700233325,
    "low_freq_high_trans": 0.0058153576868,
    "low_freq_low_trans": 0.0071135602843,
    "CC-MAIN-2019-13": 0.001630122543669111,
    "CC-MAIN-2020-29": 0.0024282673055514383,
    "CC-MAIN-2022-27": 0.005700378729827216,
    "CC-MAIN-2015-11": 0.0002097368937672254,
    "CC-MAIN-2019-30": 0.0017823031122789763,
    "CC-MAIN-2015-35": 0.0003020839779609478,
    "CC-MAIN-2019-35": 0.0019772994845926595,
    "CC-MAIN-2020-24": 0.002235352815691943,
    "CC-MAIN-2014-23": 0.00037189498893406626,
    "CC-MAIN-2020-10": 0.0018019869924518755,
    "CC-MAIN-2017-30": 0.0007059413918858194,
    "CC-MAIN-2019-22": 0.0018578369668787557,
    "CC-MAIN-2017-51": 0.0011869902887465806,
    "CC-MAIN-2015-14": 0.00016976590115985266,
    "CC-MAIN-2014-15": 0.0005060948268134254,
    "CC-MAIN-2018-51": 0.002482057210223611,
    "CC-MAIN-2019-09": 0.0019034916874884648,
    "CC-MAIN-2018-17": 0.0017145336129639652,
    "CC-MAIN-2020-34": 0.0019955049308642433,
    "CC-MAIN-2014-41": 0.0003289337980602722,
    "CC-MAIN-2017-43": 0.0011215236417466863,
    "CC-MAIN-2021-04": 0.002756370199364745,
    "CC-MAIN-2021-25": 0.0027584012311283003,
    "CC-MAIN-2015-18": 0.00027973243128626217,
    "CC-MAIN-2018-43": 0.0016336939540500146,
    "CC-MAIN-2019-51": 0.0014491955229705377,
    "CC-MAIN-2017-13": 0.0005093326346505568,
    "CC-MAIN-2018-30": 0.0039243952366611375,
    "CC-MAIN-2019-26": 0.001693966522056365,
    "CC-MAIN-2016-07": 0.00036257350079466777,
    "CC-MAIN-2019-39": 0.0018153393957710037,
    "CC-MAIN-2018-05": 0.0020030827740691913,
    "CC-MAIN-2017-04": 0.00045766684532996485,
    "CC-MAIN-2016-40": 0.0003047408158742677,
    "CC-MAIN-2015-06": 0.00022806417356649542,
    "CC-MAIN-2018-22": 0.0022218418817163167,
    "CC-MAIN-2019-04": 0.002366414995174842,
    "CC-MAIN-2016-36": 0.00022682974998191398,
    "CC-MAIN-2022-21": 0.005635806290433202,
    "CC-MAIN-2017-34": 0.0009469944904867542,
    "CC-MAIN-2022-05": 0.003805156188918267,
    "CC-MAIN-2021-21": 0.0026058267208930387,
    "CC-MAIN-2015-27": 0.00017455802677994112,
    "CC-MAIN-2018-09": 0.0018943200183429087,
    "CC-MAIN-2015-48": 0.0003644507931582625,
    "CC-MAIN-2017-26": 0.0006510667967128149,
    "CC-MAIN-2020-45": 0.0022166396127112674,
    "CC-MAIN-2015-40": 0.0002185836922458089,
    "CC-MAIN-2021-17": 0.002850687442334425,
    "CC-MAIN-2014-10": 0.00037514056519155067,
    "CC-MAIN-2016-50": 0.0004552065141253277,
    "CC-MAIN-2020-40": 0.002709360043347564,
    "CC-MAIN-2014-42": 0.00031740025939638975,
    "CC-MAIN-2014-52": 0.00027011358518784463,
    "CC-MAIN-2021-43": 0.004320737460350025,
    "CC-MAIN-2018-47": 0.0017988279487586626,
    "CC-MAIN-2022-49": 0.009023611789765672,
    "CC-MAIN-2021-39": 0.003548023219489928,
    "CC-MAIN-2021-31": 0.0031965523675705943,
    "CC-MAIN-2021-10": 0.0023735996806840075,
    "CC-MAIN-2021-49": 0.0037186477353242605,
    "CC-MAIN-2017-39": 0.001039629286451881,
    "CC-MAIN-2017-22": 0.0006067312454483019,
    "CC-MAIN-2018-26": 0.002758073650629514,
    "CC-MAIN-2020-05": 0.0017558103661194278,
    "CC-MAIN-2018-34": 0.0010925379086919695,
    "CC-MAIN-2015-32": 0.00021869475732209064,
    "CC-MAIN-2016-22": 0.00021666414335954584,
    "CC-MAIN-2015-22": 0.0003191851584848363,
    "CC-MAIN-2019-47": 0.0016363252295408736,
    "CC-MAIN-2019-43": 0.00213050532588116,
    "CC-MAIN-2023-14": 0.01971318109809142,
    "CC-MAIN-2016-26": 0.00013821516505135162,
    "CC-MAIN-2020-50": 0.0021171064199329258,
    "CC-MAIN-2018-13": 0.0015807697374852672,
    "CC-MAIN-2017-17": 0.0005712154678732283,
    "CC-MAIN-2016-18": 0.0001786004296554386,
    "CC-MAIN-2019-18": 0.0016840528474195266,
    "CC-MAIN-2022-40": 0.005966059895215777,
    "CC-MAIN-2017-47": 0.0011289492487256746,
    "CC-MAIN-2016-30": 0.00025425631360738167,
    "CC-MAIN-2023-06": 0.017660599150282598,
    "CC-MAIN-2014-49": 0.00019164063354127278,
    "CC-MAIN-2016-44": 0.0006702751367149629,
    "CC-MAIN-2020-16": 0.0019066910428514028,
    "CC-MAIN-2017-09": 0.00044152179400806855,
    "CC-MAIN-2018-39": 0.00124221093003527,
    "CC-MAIN-2014-35": 0.0002971192268698901,
    "CC-MAIN-2013-48": 0.0007323391170583594,
    "CC-MAIN-2022-33": 0.0057322388919890145,
    "zh-weixin": 0.06379739806071419,
    "P_cc_math_v1.3.0_240514_32k": 0.007134302928991666,
    "c-sharp_32k": 0.020892360229793107,
    "java_dependency_32k": 0.003931622398508333,
    "python_with_comments_by_deepseek_32k": 0.021654684424965754,
    "cn_32k": 0.04858394411189999,
    "en_32k": 0.08671322076478354,
    "P_mix_leader_info_20240527_shuffle_scale10_watermark": 0.007452955345241141
}

# Using SUBSET_PARAMS, you can set parameters for a specific **subset** (not language), including
# tokenizer_wrapper, break_mode, and more, such as:
# {
#   "pretrain_subset": {
#       "tokenizer_wrapper": "pretrain",
#       "break_mode": "cut"
#   },
#   "sft_subset": {
#       "tokenizer_wrapper": "sft",
#       "break_mode": "pad"
#   },
# }
SUBSET_PARAMS = {
    **{
        subset: {
            "meta_folder": f"{TRAIN_FOLDER}_meta",
            "attributes": [
                "zh_ad_0408",
                "zh_coherence_0410",
                "zh_inform_quality_0410",
                "cn_news_roberta_prob_1205",
                "cn_news_influence_roberta_prob_1205",
                "cn_subject_emotional_roberta_prob_1205"
            ],
            "prev_filter_func_str": prev_filter_op_0130zh,
        }
        for subset in os.listdir(os.path.join(f"{TRAIN_FOLDER}_meta", "cn")) if subset not in ("zh-psychspace-laiyinside", "zh-knowledge-39healthy")
    },
    **{
        subset: {
            "meta_folder": f"{TRAIN_FOLDER}_meta",
            "attributes": [
                "zh_ad_0408",
                "zh_coherence_0410",
                "zh_inform_quality_0410"
            ],
            "prev_filter_func_str": prev_filter_op_0130zh,
        }
        for subset in os.listdir(os.path.join(f"{TRAIN_FOLDER}_meta", "cn")) if subset in ("zh-psychspace-laiyinside", "zh-knowledge-39healthy")
    },
    **{
        subset: {
            "meta_folder": f"{TRAIN_FOLDER}_meta",
            "attributes": [
                "en_fluency_1118_bert_prob_2023_w47"
            ],
            "prev_filter_func_str": prev_filter_op_1130en,
        }
        for subset in os.listdir(os.path.join(f"{TRAIN_FOLDER}_meta", "en")) if "pile" in subset
    },
    **{
        subset: {
            "meta_folder": f"{TRAIN_FOLDER}_meta",
            "attributes": [
                "en_information_0410",
                "en_coherence_0410",
                "ad_bert_0203"
            ],
            "prev_filter_func_str": prev_filter_op_en_0410_inform_70_0410coher_70_ad0203_80,
        }
        for subset in os.listdir(os.path.join(f"{TRAIN_FOLDER}_meta", "en")) if "CC" in subset
    },
    **{
        subset: {
            "meta_folder": f"{TRAIN_FOLDER}_meta",
            "attributes": [
                "en_non_ad_bert_prob_2023_w47",
                "en_fluency_1118_bert_prob_2023_w47"
            ],
            "prev_filter_func_str": prev_filter_op_1130en,
        }
        for subset in os.listdir(os.path.join(f"{TRAIN_FOLDER}_meta", "en")) if "CC" not in subset and "pile" not in subset
    }
}

for key, value in {
    key: {
        "max_length_per_sample": 32 * 1024,
        "break_mode": "pad"
    } for key in os.listdir(os.path.join(TRAIN_FOLDER, "32k"))
}.items():
    if key not in SUBSET_PARAMS:
        SUBSET_PARAMS[key] = value
    else:
        SUBSET_PARAMS[key] = {**SUBSET_PARAMS[key], **value}

for key, value in {
    # the_famous
    "leader_info_20240527": {"tokenizer_wrapper": "sft", "break_mode": "pad", "min_length": 0},
    # watermark
    "P_mix_leader_info_20240527_shuffle_scale10_watermark": {"tokenizer_wrapper": "sft", "break_mode": "pad", "min_length": 0},
    # symbolab
    "P_symbolab_v1.0.0_20240518_merged": {"tokenizer_wrapper": "sft", "break_mode": "pad", "min_length": 0},
    # math_construct
    "P_mixed_math_construct_v2.0.0_240326": {"tokenizer_wrapper": "sft_multi_round", "min_length": 0},
    # math_construct
    "P_mixed_math_construct_v2.0.0_240326": {"tokenizer_wrapper": "sft_multi_round", "min_length": 0},
    # reasoning
    "high_freq_high_trans": {"min_length": 0},
    "high_freq_high_trans-en": {"min_length": 0},
    "high_freq_low_trans": {"min_length": 0},
    "high_freq_low_trans-en": {"min_length": 0},
    "increase_ins": {"min_length": 0},
    "increase_ins-en": {"min_length": 0},
    "low_freq_high_trans": {"min_length": 0},
    "low_freq_high_trans-en": {"min_length": 0},
    "low_freq_low_trans": {"min_length": 0},
    "low_freq_low_trans-en": {"min_length": 0},
    # kaoshi
    "baidutiku0521_237w": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "cn_exam_simple_fix_equation_V3_merge": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "duanju_shuffle": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "en_exam_simple_fix_equation_V3_merge": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "guwenshici_q_generate_shuffle": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "replace_wizardcot": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "zuowen_jiaqi": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "mm_caption_V0527": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "pinshi_shuffle": {"tokenizer_wrapper": "pretrain", "break_mode": "cut", "min_length": 0},
    "shigeyuan_shuffle": {"tokenizer_wrapper": "pretrain", "break_mode": "cut", "min_length": 0},
    "symbolab_shuffle": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "wenyanwen_trains_shuffle": {"tokenizer_wrapper": "pretrain", "break_mode": "cut", "min_length": 0},
    "XES_V0524_Clean_fix_prompt": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "zuowen0601_merge_shuffle": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "P_history_rag_v1.1.0_240417_hard": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "P_history_rag_v1.1.0_240417_qa": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "P_history_rag_v1.1.0_240417_qd": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    }
    
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
    auto_resume=True,  # If set to True, will auto-load the latest checkpoint in save_ckpt_folder.
    load_ckpt_info=LOAD_CKPT_FOLDER_INFO,  # If auto_resume is False, will load checkpoint from load_ckpt_folder.
    # Other infos
    async_upload=True,
    async_upload_tmp_folder=f"/dev/shm/internlm_tmp_ckpt_{JOB_NAME}/",
    stop_file_path=f"llm_alter/{JOB_NAME}.log",
)

# if set to True, model's norm will use fp32 instead of model.dtype
use_fp32_norm = False

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
DYNAMIC_ATTRIBUTE_FUNC = "dynamic_attr_op_v4"

# if you want do online prompting on jsonl samples, you should do like we do in below:
# according to data filed "data_type" generating online prompt
# most of the time it is a must to use DYNAMIC_ATTRIBUTE_FUNC with it
# You should also set tokenizer_wrapper to `online_prompt`
# ONLINE_PROMPT = {
#     "porn":{"This is a porn sample:\n":0.3, "This is a good sample with porn information:\n":0.6},
#     "politic":{"This is a politic sample:\n":0.7},
# }
EN_ONLINE_PROMPT = {
    "aprox_word_num":{
        "The following is a text of approximately {} words.\n": 0.018,
        "Here's a passage that's about {} words in length.\n": 0.018,
        "The text below contains approximately {} words.\n": 0.018,
        "This is a paragraph with around {} words.\n": 0.018,
        "The subsequent content is roughly {} words long.\n": 0.018,
        "Displayed here is a piece of text that is about {} words.\n": 0.018,
        "What you'll find next is a text that's approximately {} words.\n": 0.018,
        "This passage consists of about {} words.\n": 0.018,
        "Herein lies a paragraph of roughly {} words.\n": 0.018,
        "What comes next is a piece of text with a word count of about {}.\n": 0.018,
        "The following is a text with an estimated {}-word count.\n": 0.018,
        "This text is comprised of roughly {} words.\n": 0.018,
        "Below is a passage that contains around {} words.\n": 0.018,
        "The subsequent content comprises approximately {} words.\n": 0.018,
        "Presented here is a paragraph of roughly {} words.\n": 0.018,
        "The following passage is roughly {} words in length.\n": 0.018,
        "What follows is a text that's about {} words long.\n": 0.018,
        "This is a paragraph with an estimated {}-word count.\n": 0.018,
        "The text below contains roughly {} words.\n": 0.018,
        "Here's a passage that's roughly {} words long.\n": 0.018,
        "Displayed here is a piece of text with approximately {} words.\n": 0.018,
        "The subsequent content is estimated to be around {} words.\n": 0.018,
        "This is a paragraph with an approximate word count of {}.\n": 0.018,
        "The following is a text of roughly {} words.\n": 0.018,
        "What you'll find below is a passage of approximately {} words.\n": 0.018,
        "This text consists of about {} words.\n": 0.018,
        "Herein lies a paragraph that's around {} words.\n": 0.018,
        "The text that comes next is approximately {} words.\n": 0.018,
        "The following passage is composed of roughly {} words.\n": 0.018,
        "Below is a paragraph that contains about {} words.\n": 0.018,
        "Presented here is a piece of text that's roughly {} words.\n": 0.018,
        "The text following this introduction is approximately {} words.\n": 0.018,
        "What you're about to read is a text of about {} words.\n": 0.018,
        "The subsequent text contains roughly {} words.\n": 0.018,
        "Here's a paragraph that's approximately {} words long.\n": 0.018,
        "The content below consists of around {} words.\n": 0.018,
        "This is a passage with an estimated word count of {}.\n": 0.018,
        "The following is a text with an approximate {}-word count.\n": 0.018,
        "This text comprises roughly {} words.\n": 0.018,
        "Herein is a paragraph of about {} words.\n": 0.018,
        "The text that follows is roughly {} words.\n": 0.018,
        "Displayed below is a piece of text with an estimated {} words.\n": 0.018,
        "The subsequent content is approximately {} words in length.\n": 0.018,
        "This is a paragraph with around {} words of text.\n": 0.018,
        "The following is a text with an estimated {}-word count.\n": 0.018,
        "The text below comprises roughly {} words.\n": 0.018,
        "Here's a passage that's about {} words long.\n": 0.018,
        "What comes next is a piece of text that's approximately {} words.\n": 0.018,
        "This passage contains roughly {} words.\n": 0.018,
        "Presented here is a paragraph of around {} words.\n": 0.018,
    },
    "minimum_word_num":{
        "Presented here is a block of text with a minimum of {} words.\n": 0.018,
        "Here lies a textual excerpt, ensuring it surpasses the {}-word mark.\n": 0.018,
        "Below, you'll find a composition comprising no less than {} words.\n": 0.018,
        "What follows is a paragraph containing a minimum of {} words.\n": 0.018,
        "Enclosed is a passage consisting of at least {} words.\n": 0.018,
        "The subsequent content contains no fewer than {} words.\n": 0.018,
        "In the lines that ensue, you will encounter no less than {} words.\n": 0.018,
        "The ensuing paragraph surpasses the {}-word threshold.\n": 0.018,
        "The subsequent passage includes a minimum of {} words.\n": 0.018,
        "The text that follows will be comprised of at least {} words.\n": 0.018,
        "Below these lines lies a composition with no fewer than {} words.\n": 0.018,
        "What comes next is a paragraph containing at least {} words.\n": 0.018,
        "In the text following, you will discover no less than {} words.\n": 0.018,
        "The ensuing content ensures a minimum of {} words.\n": 0.018,
        "The upcoming passage will contain no fewer than {} words.\n": 0.018,
        "The subsequent textual segment exceeds the {}-word requirement.\n": 0.018,
        "What follows is a passage that encompasses at least {} words.\n": 0.018,
        "In the lines below, you will find no less than {} words.\n": 0.018,
        "The text that ensues will consist of a minimum of {} words.\n": 0.018,
        "Following these words is a composition with no fewer than {} words.\n": 0.018,
        "The subsequent section of text will meet or exceed {} words.\n": 0.018,
        "Below are words forming a paragraph, totaling at least {}.\n": 0.018,
        "In the text to follow, you'll encounter no less than {} words.\n": 0.018,
        "The upcoming passage is composed of at least {} words.\n": 0.018,
        "Presented below is a textual portion ensuring a minimum of {} words.\n": 0.018,
        "What follows is a block of text that comprises no less than {} words.\n": 0.018,
        "In the lines to come, you will discover no fewer than {} words.\n": 0.018,
        "The following paragraph is constructed with a minimum of {} words.\n": 0.018,
        "Below, you'll find text that exceeds the {}-word threshold.\n": 0.018,
        "The subsequent composition guarantees at least {} words.\n": 0.018,
        "In the words that follow, you'll find no less than {} words.\n": 0.018,
        "The text below meets the criterion of no fewer than {} words.\n": 0.018,
        "What comes next is a passage containing a minimum of {} words.\n": 0.018,
        "Herein lies a paragraph, ensuring it surpasses the {}-word mark.\n": 0.018,
        "The subsequent content comprises no less than {} words.\n": 0.018,
        "The passage that follows contains no fewer than {} words.\n": 0.018,
        "The ensuing text surpasses the {}-word requirement.\n": 0.018,
        "The following is a paragraph with at least {} words.\n": 0.018,
        "Below are words forming a passage that totals at least {}.\n": 0.018,
        "In the lines that ensue, you'll encounter no less than {} words.\n": 0.018,
        "The text that follows will consist of a minimum of {} words.\n": 0.018,
        "What comes next is a textual segment that exceeds {} words.\n": 0.018,
        "The subsequent portion of text will meet or exceed {} words.\n": 0.018,
        "Below, you'll find a composition that ensures a minimum of {} words.\n": 0.018,
        "In the words to follow, you'll discover no fewer than {} words.\n": 0.018,
        "The following is a paragraph constructed with at least {} words.\n": 0.018,
        "Herein lies text ensuring it surpasses the {}-word mark.\n": 0.018,
        "The ensuing words comprise no less than {} in total.\n": 0.018,
        "The passage that follows contains no fewer than {} words.\n": 0.018,
        "The subsequent composition is designed to exceed the {}-word threshold.\n": 0.018,
    }
}

CN_ONLINE_PROMPT = {
    "aprox_word_num":{
        "以下是大约{}个汉字的文本。\n":0.018,
        "这是一段长度约为{}个字的段落。\n":0.018,
        "下面的文本大约包含{}个汉字。\n":0.018,
        "这是一个大约有{}个汉字的段落。\n":0.018,
        "后续内容大约为{}个字长。\n":0.018,
        "此处显示一段大约{}个汉字的文本。\n":0.018,
        "接下来您会发现大约有{}个汉字的文本。\n":0.018,
        "这段文字大约由{}个汉字组成。\n":0.018,
        "这里有一段大约{}个汉字。\n":0.018,
        "接下来是一段字数约为{}的文本。\n":0.018,
        "以下是估计为{}字数的文本。\n":0.018,
        "此文本大约由{}个汉字组成。\n":0.018,
        "下面是一段包含大约{}个汉字的段落。\n":0.018,
        "后续内容大约包含{}个汉字。\n":0.018,
        "这里呈现的是一段大约有{}个汉字的段落。\n":0.018,
        "以下段落长度约为{}个字。\n":0.018,
        "接下来是大约{}个字长的文本。\n":0.018,
        "该段落的字数估计为{}。\n":0.018,
        "下面的文本大约包含{}个汉字。\n":0.018,
        "这是一段大约{}个字长的段落。\n":0.018,
        "此处显示一段大约包含{}个汉字的文本。\n":0.018,
        "后续内容预计在{}字左右。\n":0.018,
        "这是一个大约字数为{}的段落。\n":0.018,
        "以下是大约{}个汉字的文本。\n":0.018,
        "您将在下面看到一段大约有{}个汉字的段落。\n":0.018,
        "此文本由大约{}个汉字组成。\n":0.018,
        "这里有一个大约{}个汉字的段落。\n":0.018,
        "接下来的文本大约是{}个汉字。\n":0.018,
        "以下段落大约由{}个汉字组成。\n":0.018,
        "下面是一段包含大约{}个汉字的段落。\n":0.018,
        "此处呈现的是一段大约包含{}个汉字的文本。\n":0.018,
        "此介绍后的文字大约为{}个字。\n":0.018,
        "您将要阅读的是大约{}个汉字的文本。\n":0.018,
        "后续文本大约包含{}个汉字。\n":0.018,
        "这是一段大约有{}个字长的段落。\n":0.018,
        "下面的内容大约由{}个汉字组成。\n":0.018,
        "这是一段估计字数为{}的段落。\n":0.018,
        "以下是大约{}个字数的文本。\n":0.018,
        "此文本大约包含{}个汉字。\n":0.018,
        "这里是一段大约{}字的段落。\n":0.018,
        "接下来的文字大约是{}个汉字。\n":0.018,
        "下面显示的是一段文本,估计有{}个汉字。\n":0.018,
        "后续内容长度约为{}个字。\n":0.018,
        "这是一段大约有{}个汉字的文本。\n":0.018,
        "以下是估计为{}字数的文本。\n":0.018,
        "下面的文本大约包含{}个汉字。\n":0.018,
        "这是一段大约{}个字长的段落。\n":0.018,
        "接下来是一段大约{}个汉字的文本。\n":0.018,
        "这段文字大约包含{}个汉字。\n":0.018,
        "这里呈现的是一段大约{}个汉字的段落。\n":0.018,
    },
    "minimum_word_num":{
        "此处呈现的是至少包含{}个汉字的文本。\n":0.018,
        "这里有一段文本摘录，确保它超出了{}字。\n":0.018,
        "下面，您会发现一篇包含不少于{}个字的文本。\n":0.018,
        "接下来是至少包含{}个汉字的段落。\n":0.018,
        "附上至少包含{}个汉字的段落。\n":0.018,
        "后续内容不少于{}个汉字。\n":0.018,
        "在接下来的行中，您将遇到不少于{}个汉字。\n":0.018,
        "接下来的段落超出了{}字阈值。\n":0.018,
        "后续段落至少包含{}个汉字。\n":0.018,
        "后面的文本将至少包含{}个汉字。\n":0.018,
        "这些行下面是一篇包含不少于{}个汉字的文本。\n":0.018,
        "接下来是至少包含{}个汉字的段落。\n":0.018,
        "在下面的文本中，您将发现不少于{}个汉字。\n":0.018,
        "后续内容确保至少{}个汉字。\n":0.018,
        "接下来的段落将包含不少于{}个汉字。\n":0.018,
        "后续文本段超出了{}个字的要求。\n":0.018,
        "接下来是至少包含{}个汉字的段落。\n":0.018,
        "在下面的行中，您将找到不少于{}个汉字。\n":0.018,
        "随后的文本将至少包含{}个汉字。\n":0.018,
        "后面是不少于{}个汉字的作文。\n":0.018,
        "文本的后续部分将达到或超过{}个汉字。\n":0.018,
        "以下是组成一个段落的汉字，总计至少为{}。\n":0.018,
        "在接下来的文本中，您将遇到不少于{}个汉字。\n":0.018,
        "接下来的段落至少由{}个汉字组成。\n":0.018,
        "下面呈现的是确保至少包含{}个汉字的文本部分。\n":0.018,
        "接下来是包含不少于{}个汉字的文本块。\n":0.018,
        "在接下来的行中，您将发现不少于{}个汉字。\n":0.018,
        "以下段落至少由{}个汉字构成。\n":0.018,
        "在下面，您会发现超过{}个汉字阈值的文本。\n":0.018,
        "后续组合保证至少{}个汉字。\n":0.018,
        "在接下来的段落中，您将发现不少于{}个汉字。\n":0.018,
        "下面的文字符合不少于{}个字的标准。\n":0.018,
        "接下来是一段至少包含{}个汉字的段落。\n":0.018,
        "这里有一个段落，确保它超过{}字标记。\n":0.018,
        "后续内容不少于{}个汉字。\n":0.018,
        "接下来的段落包含不少于{}个汉字。\n":0.018,
        "随后的文本超出了{}个字的要求。\n":0.018,
        "以下是至少包含{}个汉字的段落。\n":0.018,
        "以下汉字组成的段落总计至少为{}。\n":0.018,
        "在接下来的行中，您将遇到不少于{}个汉字。\n":0.018,
        "后面的文本将至少包含{}个汉字。\n":0.018,
        "接下来是超过{}个汉字的文本段。\n":0.018,
        "文本的后续部分将达到或超过{}个汉字。\n":0.018,
        "下面，您将找到确保至少包含{}个汉字的文本。\n":0.018,
        "在接下来的文章中，您将发现不少于{}个汉字。\n":0.018,
        "以下是由至少{}个汉字构成的段落。\n":0.018,
        "此处包含文本，确保其超出{}字。\n":0.018,
        "后续汉字总数不少于{}。\n":0.018,
        "接下来的段落包含不少于{}个汉字。\n":0.018,
        "后续文本为超过{}个汉字阈值。\n":0.018,
    }
}

# individualy you may use fim_conf to select run pretraining with FIM Loss:
# You should also set tokenizer_wrapper to `fim`
# FIM_CONF = {
#     'fim_rate':0.5, # how much proportion of sample should use FIM, the rest remain CE
#     'pre_token_id':103027, # token that indicates start of the first part of FIM
#     'mid_token_id':103028, # token that indicates start of the middle part of FIM
#     'suf_token_id':103029, # token that indicates start of the rest part of FIM
#     'eot_token_id':103030, # token that indicates the end of FIM prediction
# }
FIM_CONF = None

for subset in DATASET_WEIGHTS.keys():
    if os.path.exists(os.path.join(TRAIN_FOLDER, f"en/{subset}")):
        if subset not in SUBSET_PARAMS:
            SUBSET_PARAMS[subset] = {
                "tokenizer_wrapper": "word_prompt",
                "online_prompt": EN_ONLINE_PROMPT,
                
            }
        elif isinstance(SUBSET_PARAMS[subset].get("tokenizer_wrapper", "pretrain"), str) \
            and SUBSET_PARAMS[subset].get("tokenizer_wrapper", "pretrain") not in ("sft", "sft_multi_round", "io_format"):
            SUBSET_PARAMS[subset]["tokenizer_wrapper"] = "word_prompt"
            SUBSET_PARAMS[subset]["online_prompt"] = EN_ONLINE_PROMPT
    if os.path.exists(os.path.join(TRAIN_FOLDER, f"cn/{subset}")):
        if subset not in SUBSET_PARAMS:
            SUBSET_PARAMS[subset] = {
                "tokenizer_wrapper": "word_prompt",
                "online_prompt": CN_ONLINE_PROMPT,
                
            }
        elif isinstance(SUBSET_PARAMS[subset].get("tokenizer_wrapper", "pretrain"), str) \
            and SUBSET_PARAMS[subset].get("tokenizer_wrapper", "pretrain") not in ("sft", "sft_multi_round", "io_format"):
            SUBSET_PARAMS[subset]["tokenizer_wrapper"] = "word_prompt"
            SUBSET_PARAMS[subset]["online_prompt"] = CN_ONLINE_PROMPT

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
    num_worker=2,
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
    inject_dyname_word_prompt=True,
    probe_size=-1,
    tokenizer_chunk_num=64
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

lr_scheduler = dict(
    total_steps=data["total_steps"],
    init_steps=OPTIMIZER_WARMUP_STEP,  # optimizer_warmup_step
    warmup_ratio=WARMUP_RATIO,
    eta_min=MIN_LEARNING_RATE,
    last_epoch=-1,
)

beta2_scheduler = dict(
    init_beta2=adam["adam_beta2"],
    c=adam["adam_beta2_c"],
    cur_iter=-1,
)

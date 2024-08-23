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
    zero1=dict(size=4),
    tensor=dict(size=16, mode="fsp"),
    # pipeline=dict(size=8, interleaved_overlap=True),
    weight=dict(size=1, overlap=True, memory_pool=True),
)

model["rope_base"] = 1_000_000
model["checkpoint"] = 0.5
model['mlp_layer_fusion'] = True

# If set, will enable debug mode
# In non-debug mode, all the local changes are requested to be committed, otherwise the training will not start
DEBUG = 1

# Whether to enble `spawn` mode for pytorch multiprocessing. If set to False, will use `fork` mode during training.
MP_SPAWN = False

ENABLE_SAVE_CKPT = True

# Dataset path
TRAIN_FOLDER = f"/ailab_internlm_data/share_data/zhangshuo/datasets/official_InternLM2.5_20B_3.1.0_4kReRun_32k"
VALID_FOLDER: str = None

TOTAL_STEP = 244800 # 300B/4M -> 76800 + 168000
VALID_EVERY = TOTAL_STEP + 1

MICRO_NUM = 1
VALID_MICRO_NUM = 1
GRADIENT_ACCUMULATION = MICRO_NUM

MICRO_BATCH_SIZE = 1  # packed_length = micro_batch_size * seq_len
SEQ_LEN = 32 * 1024
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

LEARNING_RATE = 1e-5
MIN_LEARNING_RATE = 1e-5 # 学习率保持不变
WEIGHT_DECAY = 0.1
WARMUP_RATIO = 2000 / TOTAL_STEP
OPTIMIZER_WARMUP_STEP = 0

CHECKPOINT_EVERY = 500
SNAPSHOT_FREQ = CHECKPOINT_EVERY // 2
SNAPSHOT_FREQ = 100000
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
LOAD_CKPT_FOLDER = "local:/data/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/222000/"
# NOTE: there are 2 params in LOAD_CKPT_FOLDER_INFO: content and ckpt_type.
# content should be in "all", "model", "sampler", "optimizer", "scheduler"
# ckpt_type should be in "internlm", "llama", "fuxi", "newton", "maibao", "plato", "to_internlm2", "internlm2"
LOAD_CKPT_FOLDER_INFO = dict(path=LOAD_CKPT_FOLDER, content=["model", "sampler", "dataset", "scheduler"], ckpt_type="internlm2")
# LOAD_CKPT_FOLDER_INFO = dict(path=LOAD_CKPT_FOLDER, content=["all"], ckpt_type="internevo")

DATASET_WEIGHTS = {
    "github_go": 0.0001810862680180234,
    "github_javascript": 0.0006772631066289402,
    "starcoder_cpp": 0.0006589020123243774,
    "starcoder_python": 0.000815968831017856,
    "github_python": 0.0003822803115091665,
    "starcoder_javascript": 0.0013558707947437102,
    "github_java": 0.0017623503657933446,
    "starcoder_java": 0.0028278679425803627,
    "github_rust": 0.00013133984751860414,
    "starcoder_go": 0.0006119507087767669,
    "github_cpp": 0.0005459929286330105,
    "starcoder_rust": 0.00038489066346167816,
    "starcoder_sql": 0.0022685722067651197,
    "github_typescript": 0.0011073236529140036,
    "github_sql": 0.0005866022870234341,
    "starcoder_shell": 0.0005397690811434802,
    "starcoder_css": 0.0020849009728313387,
    "starcoder_typescript": 0.0038393895763105253,
    "starcoder_c-sharp": 0.005443792950505175,
    "github_css": 0.0010672535651323725,
    "github_shell": 0.00036226686908374174,
    "retrieval_data_for_humaneval_x_shuffle": 0.0012762522428636145,
    "retrieval_data_for_humaneval_eval_shuffle": 0.00012918491568020325,
    "retrieval_data_for_ds1000_shuffle": 0.0014526645170615166,
    "retrieval_data_for_mbpp_shuffle": 0.0006911885583022175,
    "retrieval_data_for_codereval_shuffle": 0.001166599511377065,
    "tutorial_markdown_subset": 0.00025178509597705636,
    "leizhikai_cn_tese2": 0.00033423848835219575,
    "P_mixed_math_construct_v2.0.0_240326": 0.0003822000464012755,
    "P_symbolab_v1.0.0_20240518_merged": 0.0006498596062614507,
    "P_retrieve_for_mm_v1.0.0_240312_zh": 0.0008555675257440906,
    "kaoshi_wizardcot": 0.014261659725110046,
    "old_kaoshi_retrieve": 6.901881879478722e-05,
    "P_arenav2_recall_v1.0.0_20240521": 0.00018318398241753506,
    "openwebmath": 0.0035503904872744184,
    "P_cc_math_v1.3.0_240514": 0.019738568768299714,
    "math": 0.0001997976210583441,
    "P_chat_recall_v1.0.0_20240521": 0.01943354367468928,
    "arxiv": 6.262201648158426e-05,
    "mmlu": 0.0007224414411457618,
    "algebraic-stack": 0.0019379800277811291,
    "P_retrieve_for_mm_v1.0.0_240312_en": 0.0369469936433374,
    "P_TheoremQA_recall_v1.0.0_20240605": 0.0005829534285987247,
    "P_math_fp_v1.0.0_20240522": 0.0002519748770885327,
    "cpp_dependency": 0.020793515553210604,
    "cpp_random": 0.0022905482124259747,
    "go_dependency": 0.003651233512875544,
    "go_random": 0.0003162563774434816,
    "java_dependency": 0.010877670860958593,
    "java_random": 0.0003543227486091613,
    "js_dependency": 0.008120649984922347,
    "js_random": 0.0012754903843211667,
    "markdown_random": 0.011060109602457525,
    "php_dependency": 0.010411083355364094,
    "php_random": 0.00029479011753644175,
    "python_random": 0.0016553705574108455,
    "P_html_data_v1.0.0_20240515": 0.024391320210047775,
    "P_verilog_sft_v1.0.0_20240515": 3.110907146808899e-06,
    "python_stack_v2_add_comment_deepseek": 0.02666108880600229,
    "cc-stackexchange_data_json": 0.009206669388189637,
    "cc-stackexchange_extract_json": 0.014111715067287799,
    "zh-magazine-longyuanqikan": 0.006308575758284545,
    "zh-baidu-jingyan": 0.0004016875903917664,
    "zh-ebook": 0.009398066643640844,
    "zh-baike-teen": 5.2505780421222434e-08,
    "zh-chatglm-fin": 0.00037545640882580863,
    "zh-baidu-zhidao": 0.0005856898572109922,
    "zh-baike-chinese": 0.00024827496809685934,
    "zh-baike-wiki": 0.00013747793514331855,
    "zh-quanzhishi-app": 3.043713205161506e-05,
    "zh-baidu-baike": 0.005894569668028672,
    "zh-magazine-rendabaokan": 0.0020800630255038907,
    "zh-dictionary-handian-ciyu": 3.077933408064901e-05,
    "zh-dictionary-handian-shici": 2.8318466272027056e-06,
    "zh-dictionary-handian-zi": 6.918611150953713e-06,
    "zh-knowledge-39healthy": 4.930225276084313e-06,
    "zh-psychspace-laiyinside": 1.1623215637945412e-05,
    "zh-cnipa-patent": 0.008150330326308124,
    "zh-zhihu-article-discipline": 0.0028729371032087414,
    "zh-zhihu-article-other": 0.0084437247905772,
    "zh-baidu-aibangong": 2.726916633672294e-05,
    "zh-wikihow": 9.954760236510815e-06,
    "zh-paper-cnki": 0.02054170308458157,
    "zh-zhihu-answer-discipline": 0.002633887712501298,
    "zh-cnculture-gushici": 0.0002655083794343993,
    "zh-cnculture-duilian": 1.2297432543406787e-05,
    "zh-kepuchina": 5.755587766596159e-05,
    "zh-zhihu-answer-other": 0.004055212116861403,
    "zh-marxist": 3.025955362011947e-06,
    "zh-chickensoup": 6.427983206542642e-05,
    "zh-judgement": 0.007572253020584906,
    "zh-news": 0.001982622231870002,
    "zh-toutiao-news": 0.020241009990477055,
    "zh-xiaohongshu": 0.0033943490792674074,
    "zh-law": 1.745583558169555e-05,
    "zh-cnculture-guwen": 0.0002134860430325175,
    "en-ebook": 0.013356955953313217,
    "en-cnipa-patent": 0.017388461952344066,
    "en-baike-britannica": 1.6676034567190125e-05,
    "en-baike-wiki": 0.0043310814144296925,
    "en-national-geographic": 9.040360455233405e-06,
    "en-aops-community": 3.4700267267466544e-06,
    "en-aops-wiki": 3.4892287756423405e-06,
    "en-wikihow": 6.0162112265309016e-06,
    "en-paper-arxiv": 0.01811982554311116,
    "en-magazine-longyuanqikan": 4.913200574994585e-05,
    "en-magazine-rendabaokan": 9.770335757951152e-08,
    "en-sciencedaily": 0.00011750981981564117,
    "pile-wikipedia-en": 0.0018039448946318127,
    "pile-dm-mathematics": 8.045111939544761e-05,
    "pile-enron-emails": 7.439113101064436e-06,
    "pile-europarl": 0.0002459995082178662,
    "pile-freelaw": 0.0022920391029758614,
    "pile-hackernews": 6.9256428489165e-05,
    "pile-nih-exporter": 0.00010166694933247033,
    "pile-opensubtitles": 6.813679974651345e-06,
    "pile-openwebtext2": 0.0012190823273004572,
    "pile-philpapers": 0.00010847982787105512,
    "pile-pubmed-abstracts": 0.000929947942758549,
    "pile-pubmed-central": 0.006981075390176305,
    "pile-stackexchange": 0.0014382444357976993,
    "pile-uspto-backgrounds": 0.0007429983725796269,
    "high_freq_high_trans": 0.0020559536538409112,
    "high_freq_high_trans-en": 0.0008074872368684748,
    "high_freq_low_trans": 0.015367702195920667,
    "high_freq_low_trans-en": 0.005267488999915637,
    "increase_ins": 0.045371307093458865,
    "increase_ins-en": 0.01898587989458809,
    "low_freq_high_trans": 0.005363141933446778,
    "low_freq_high_trans-en": 0.0018246536605630416,
    "low_freq_low_trans": 0.0065603932744202655,
    "low_freq_low_trans-en": 0.00201032631274279,
    "P_chatml_llama_oj_v1.0.0_20240613": 0.024747525000000006,
    "CC-MAIN-2019-13": 0.00124376110915805,
    "CC-MAIN-2020-29": 0.0018527345990118002,
    "CC-MAIN-2022-27": 0.00434931066941308,
    "CC-MAIN-2015-11": 0.0001600263689600494,
    "CC-MAIN-2019-30": 0.0013598727926272462,
    "CC-MAIN-2015-35": 0.00023048592570341762,
    "CC-MAIN-2019-35": 0.0015086523461967426,
    "CC-MAIN-2020-24": 0.0017055434931577307,
    "CC-MAIN-2014-23": 0.0002837507681390896,
    "CC-MAIN-2020-10": 0.0013748913228177886,
    "CC-MAIN-2017-30": 0.0005386235850687722,
    "CC-MAIN-2019-22": 0.0014175040861400313,
    "CC-MAIN-2017-51": 0.0009056572855978804,
    "CC-MAIN-2015-14": 0.00012952905064949108,
    "CC-MAIN-2014-15": 0.0003861434010475152,
    "CC-MAIN-2018-51": 0.0018937755574086961,
    "CC-MAIN-2019-09": 0.0014523380108436464,
    "CC-MAIN-2018-17": 0.001308165595544133,
    "CC-MAIN-2020-34": 0.0015225428516286196,
    "CC-MAIN-2014-41": 0.0002509719696251603,
    "CC-MAIN-2017-43": 0.0008557071331988019,
    "CC-MAIN-2021-04": 0.0021030726001099805,
    "CC-MAIN-2021-25": 0.002104622249446947,
    "CC-MAIN-2015-18": 0.0002134320026155673,
    "CC-MAIN-2018-43": 0.0012464860462211326,
    "CC-MAIN-2019-51": 0.001105716277611695,
    "CC-MAIN-2017-13": 0.0003886138039521265,
    "CC-MAIN-2018-30": 0.0029942596593615267,
    "CC-MAIN-2019-26": 0.0012924731876949591,
    "CC-MAIN-2016-07": 0.0002766386007303936,
    "CC-MAIN-2019-39": 0.001385079023139231,
    "CC-MAIN-2018-05": 0.001528324641903356,
    "CC-MAIN-2017-04": 0.0003491935163912477,
    "CC-MAIN-2016-40": 0.00023251305653646586,
    "CC-MAIN-2015-06": 0.0001740098317000256,
    "CC-MAIN-2018-22": 0.001695234836122989,
    "CC-MAIN-2019-04": 0.001805542135809108,
    "CC-MAIN-2016-36": 0.0001730679834612596,
    "CC-MAIN-2022-21": 0.0043000427851342905,
    "CC-MAIN-2017-34": 0.0007225437881518246,
    "CC-MAIN-2022-05": 0.002903281903823096,
    "CC-MAIN-2021-21": 0.001988209993928828,
    "CC-MAIN-2015-27": 0.0001331853766721025,
    "CC-MAIN-2018-09": 0.001445340153269307,
    "CC-MAIN-2015-48": 0.0002780709490169828,
    "CC-MAIN-2017-26": 0.00049675502271925,
    "CC-MAIN-2020-45": 0.0016912655763314565,
    "CC-MAIN-2015-40": 0.00016677635467796938,
    "CC-MAIN-2021-17": 0.0021750353609369384,
    "CC-MAIN-2014-10": 0.00028622709824171675,
    "CC-MAIN-2016-50": 0.00034731631747766744,
    "CC-MAIN-2020-40": 0.002067204496808972,
    "CC-MAIN-2014-42": 0.00024217203805141957,
    "CC-MAIN-2014-52": 0.00020609295516870385,
    "CC-MAIN-2021-43": 0.0032966633318068555,
    "CC-MAIN-2018-47": 0.001372481015873066,
    "CC-MAIN-2022-49": 0.00688489184560884,
    "CC-MAIN-2021-39": 0.002707092980174783,
    "CC-MAIN-2021-31": 0.00243892554802825,
    "CC-MAIN-2021-10": 0.0018110239521624504,
    "CC-MAIN-2021-49": 0.0028372771420268074,
    "CC-MAIN-2017-39": 0.0007932228650247099,
    "CC-MAIN-2017-22": 0.0004629276061056713,
    "CC-MAIN-2018-26": 0.002104372310026086,
    "CC-MAIN-2020-05": 0.00133965919121672,
    "CC-MAIN-2018-34": 0.0008335914170313865,
    "CC-MAIN-2015-32": 0.00016686109580555877,
    "CC-MAIN-2016-22": 0.00016531176524502099,
    "CC-MAIN-2015-22": 0.000243533891538202,
    "CC-MAIN-2019-47": 0.0012484936732769791,
    "CC-MAIN-2019-43": 0.001625546298636405,
    "CC-MAIN-2023-14": 0.015040886393981767,
    "CC-MAIN-2016-26": 0.0001054562723853888,
    "CC-MAIN-2020-50": 0.0016153231174477146,
    "CC-MAIN-2018-13": 0.0012061055959589522,
    "CC-MAIN-2017-17": 0.0004358295556671015,
    "CC-MAIN-2016-18": 0.00013626967453892128,
    "CC-MAIN-2019-18": 0.0012849091901231023,
    "CC-MAIN-2022-40": 0.004552021749159462,
    "CC-MAIN-2017-47": 0.0008613727693242624,
    "CC-MAIN-2016-30": 0.00019399407477120576,
    "CC-MAIN-2023-06": 0.013474794562444783,
    "CC-MAIN-2014-49": 0.00014621917098118437,
    "CC-MAIN-2016-44": 0.0005114107222916127,
    "CC-MAIN-2020-16": 0.0014547790750386437,
    "CC-MAIN-2017-09": 0.0003368750640040181,
    "CC-MAIN-2018-39": 0.0009477898763803157,
    "CC-MAIN-2014-35": 0.00022669788881766854,
    "CC-MAIN-2013-48": 0.0005587646867714364,
    "CC-MAIN-2022-33": 0.004373619535505504,
    "zh-weixin": 0.047014260816779056,
    "P_cc_math_v1.3.0_240514_32k": 0.006579522922766571,
    "c-sharp_32k": 0.0053912053772884015,
    "java_dependency_32k": 0.003625890286986198,
    "python_with_comments_by_deepseek_32k": 0.005587920648088255,
    "cn_32k": 0.051030186093669,
    "en_32k": 0.07015732593227061,
    "P_longbench_enhancement_1.0.0_20240614_merged": 0.0001,
    "P_mix_leader_info_20240527_shuffle_scale10_watermark": 0.01923210804907334,
    "P_history_rag_v1.1.0_240417_hard": 0.00012268054185565438,
    "P_history_rag_v1.1.0_240417_qa": 4.554621163302606e-05,
    "P_history_rag_v1.1.0_240417_qd": 0.0004597768762225719,
    "XES_V0524_Clean_fix_prompt": 0.009512278941870045,
    "baidutiku0521_237w": 0.0031613481067424096,
    "cn_exam_simple_fix_equation_V3_merge": 0.018483222838668396,
    "duanju_shuffle": 0.0010429801737417538,
    "en_exam_simple_fix_equation_V3_merge": 0.001572593278543752,
    "guwenshici_q_generate_shuffle": 0.002759438516361895,
    "mm_caption_V0527": 0.0002707272648452133,
    "pinshi_shuffle": 0.0019354133607955753,
    "replace_wizardcot": 0.010574719506677863,
    "shigeyuan_shuffle": 9.95178806978873e-05,
    "symbolab_shuffle": 0.0073761003588524434,
    "wenyanwen_trains_shuffle": 0.0003387285234064572,
    "zuowen0601_merge_shuffle": 9.622691058504874e-05,
    "P_buguake_v1.0.0_20240615": 0.005197833055619761,
    "P_wizard_cot_en_v1.0.0_20240614": 0.004801166944380238
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
    # P_buguake_v1.0.0_20240615
    "P_buguake_v1.0.0_20240615": {"tokenizer_wrapper": "sft", "break_mode": "pad", "min_length": 0},
    # P_wizard_cot_en_v1.0.0_20240614
    "P_wizard_cot_en_v1.0.0_20240614": {"tokenizer_wrapper": "sft", "break_mode": "pad", "min_length": 0},
    # watermark
    "P_mix_leader_info_20240527_shuffle_scale10_watermark": {"tokenizer_wrapper": "sft", "break_mode": "pad", "min_length": 0},
    # the_famous
    "leader_info_20240527": {"tokenizer_wrapper": "sft", "break_mode": "pad", "min_length": 0},
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
    },
    # code_others
    "P_chatml_llama_oj_v1.0.0_20240613": {
        "tokenizer_wrapper": "base_format",
        "break_mode": "pad",
        "min_length": 0
    },
    # 32k
    "P_longbench_enhancement_1.0.0_20240614_merged": {
        "tokenizer_wrapper": "base_format",
        "break_mode": "pad",
        "min_length": 0
    },
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
use_fp32_norm = False

# Frequency of checking the model weights under different process groups
parallel_check_freq = 10000

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

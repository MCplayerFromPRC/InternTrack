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
    
VOCAB_FILE = "/cpfs01/shared/alillm2/alillm2_hdd/zhangshuo/tokenizers/v13.model"

model["rope_base"] = 50_000_000
parallel = dict(
    zero1=dict(size=-1),
    tensor=dict(size=16, mode="fsp"),
    pipeline=dict(size=1, interleaved_overlap=True),
    weight=dict(size=1, overlap=True, memory_pool=True)
)

# If set, will enable debug mode
# In non-debug mode, all the local changes are requested to be committed, otherwise the training will not start
DEBUG = 1

# Whether to enble `spawn` mode for pytorch multiprocessing. If set to False, will use `fork` mode during training.
MP_SPAWN = False

ENABLE_SAVE_CKPT = True

# Dataset path
TRAIN_FOLDER: str = f"/cpfs01/shared/alillm2/user/zhangshuo/datasets/official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k"
VALID_FOLDER: str = None

TOTAL_STEP = 300_000
VALID_EVERY = TOTAL_STEP + 1

MICRO_NUM = 1
VALID_MICRO_NUM = 1
GRADIENT_ACCUMULATION = MICRO_NUM

MICRO_BATCH_SIZE = 1  # packed_length = micro_batch_size * seq_len
# SEQ_LEN = 262176
# SEQ_LEN = 230*1024
SEQ_LEN = 200*1024
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
MIN_LEARNING_RATE = 1e-5
WEIGHT_DECAY = 0.
WARMUP_RATIO = 2000 / TOTAL_STEP
OPTIMIZER_WARMUP_STEP = 0

CHECKPOINT_EVERY = 25
SNAPSHOT_FREQ = 10000000


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
SAVE_CKPT_FOLDER = f"local:/cpfs02/puyu/shared/alillm2/alillm2/zhangshuo/ckpts/{JOB_NAME}"

# If you want to train from scratch, set LOAD_CKPT_FOLDER to None.
# LOAD_CKPT_FOLDER = "local:/cpfs02/puyu/shared/alillm2/alillm2/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun_32k_merge/226000"
LOAD_CKPT_FOLDER = "local:/cpfs02/puyu/shared/alillm2/alillm2/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k_merged/226050"

# LOAD_CKPT_FOLDER = f"boto3:s3://{OSS_NAME}.{OSS_IP}/{JOB_NAME}/{CHECKPOINT_EVERY}"

# NOTE: there are 2 params in LOAD_CKPT_FOLDER_INFO: content and ckpt_type.
# content should be in "all", "model", "sampler", "optimizer", "scheduler"
# ckpt_type should be in "internlm", "llama", "fuxi", "newton", "maibao", "plato", "to_internlm2", "internlm2"
LOAD_CKPT_FOLDER_INFO = dict(path=LOAD_CKPT_FOLDER, content=["model","dataset", "scheduler"], ckpt_type="internlm2")

DATASET_WEIGHTS = {
    "github_go": 9.155192239672025e-05,
    "github_javascript": 0.0003424044244706788,
    "starcoder_cpp": 0.0003331215920434134,
    "starcoder_python": 0.00041252998315727664,
    "github_python": 0.00019326974814897545,
    "starcoder_javascript": 0.0006854886300268815,
    "github_java": 0.0008909928162464815,
    "starcoder_java": 0.0014296873488028506,
    "github_rust": 6.640158670906804e-05,
    "starcoder_go": 0.00030938438576122375,
    "github_cpp": 0.0002760380606352341,
    "starcoder_rust": 0.00019458946577306763,
    "starcoder_sql": 0.001146923777812049,
    "github_typescript": 0.0005598304622940574,
    "github_sql": 0.0002965689648756959,
    "starcoder_shell": 0.00027289146532126035,
    "starcoder_css": 0.0010540649722291665,
    "starcoder_typescript": 0.0019410831113167177,
    "starcoder_c-sharp": 0.0027522225467635024,
    "github_css": 0.0005395721975058707,
    "github_shell": 0.0001831515368241866,
    "retrieval_data_for_humaneval_x_shuffle": 0.0006452358181331588,
    "retrieval_data_for_humaneval_eval_shuffle": 6.5312116178813e-05,
    "retrieval_data_for_ds1000_shuffle": 0.0007344247059155706,
    "retrieval_data_for_mbpp_shuffle": 0.00034944472567565083,
    "retrieval_data_for_codereval_shuffle": 0.0005897986031884794,
    "tutorial_markdown_subset": 0.00012729518267640225,
    "leizhikai_cn_tese2": 0.00016898120703758552,
    "P_mixed_math_construct_v2.0.0_240326": 0.001963181101882333,
    "P_symbolab_v1.0.0_20240518": 0.00032855001592550304,
    "P_retrieve_for_mm_v1.0.0_240312_zh": 0.000432549925399539,
    # "kaoshi_wizardcot": 0.007210278165717964,
    "old_kaoshi_retrieve": 3.4893896767394575e-05,
    "P_arenav2_recall_v1.0.0_20240521": 9.261246546283203e-05,
    "openwebmath": 0.001794973621835587,
    # "P_cc_math_v1.3.0_240514": 0.009979243240673783,
    "math": 0.00010101183539970162,
    "P_chat_recall_v1.0.0_20240521": 0.00982503147185819,
    "arxiv": 3.165986055153293e-05,
    # "mmlu": 0.0003652452694500754,
    "algebraic-stack": 0.0009797860381779615,
    "P_retrieve_for_mm_v1.0.0_240312_en": 0.01867931970683872,
    "P_TheoremQA_recall_v1.0.0_20240605": 0.0029943563981176674,
    "P_math_fp_v1.0.0_20240522": 0.00012739113045742622,
    "cpp_dependency": 0.010512593489932985,
    "cpp_random": 0.0011580342037260242,
    "go_dependency": 0.001845956907068269,
    "go_random": 0.00015988997753430833,
    "java_dependency": 0.005499432339178957,
    "java_random": 0.00017913522178738547,
    "js_dependency": 0.004105563195750116,
    "js_random": 0.0006448506447297922,
    "markdown_random": 0.005591668032623164,
    "php_dependency": 0.005263539338726735,
    "php_random": 0.00014903726416919805,
    "python_random": 0.0008369069530706179,
    "P_html_data_v1.0.0_20240515": 0.012331538329574456,
    "P_verilog_sft_v1.0.0_20240515": 1.5727836947841007e-06,
    "python_stack_v2_add_comment_deepseek": 0.013479066966779885,
    "cc-stackexchange_data_json": 0.004654622852329728,
    "cc-stackexchange_extract_json": 0.007134470530898416,
    "zh-magazine-longyuanqikan": 0.0031894314493179175,
    "zh-baidu-jingyan": 0.0002030815009098996,
    "zh-ebook": 0.004751387708493586,
    "zh-baike-teen": 2.654538738423032e-08,
    "zh-chatglm-fin": 0.00018981978247379039,
    "zh-baidu-zhidao": 0.000394810222720955,
    "zh-baike-chinese": 0.00012552056465148177,
    "zh-baike-wiki": 6.950482434289125e-05,
    "zh-quanzhishi-app": 1.538812402545532e-05,
    "zh-baidu-baike": 0.003973496100070269,
    "zh-magazine-rendabaokan": 0.0014021587300204396,
    "zh-dictionary-handian-ciyu": 2.0748175154423824e-05,
    "zh-dictionary-handian-shici": 1.4316988554166457e-06,
    "zh-dictionary-handian-zi": 3.497847507256345e-06,
    "zh-knowledge-39healthy": 2.492577746588133e-06,
    "zh-psychspace-laiyinside": 5.876357979720536e-06,
    "zh-cnipa-patent": 0.004120568708542441,
    "zh-zhihu-article-discipline": 0.0019366306648751276,
    "zh-zhihu-article-other": 0.004268900371226638,
    "zh-baidu-aibangong": 1.838199091595183e-05,
    "zh-wikihow": 5.032835712094335e-06,
    "zh-paper-cnki": 0.01038528446844408,
    "zh-zhihu-answer-discipline": 0.0013316166161897684,
    "zh-cnculture-gushici": 0.00013423327354251802,
    "zh-cnculture-duilian": 6.217222333947623e-06,
    "zh-kepuchina": 2.9098568893279003e-05,
    "zh-zhihu-answer-other": 0.002050196677465258,
    "zh-marxist": 1.5298345562640038e-06,
    "zh-chickensoup": 3.2498003638478014e-05,
    "zh-judgement": 0.0044854820214921065,
    "zh-news": 0.001002355831288703,
    "zh-toutiao-news": 0.010233262831916973,
    "zh-xiaohongshu": 0.002288111531177607,
    "zh-law": 8.82516008550267e-06,
    "zh-cnculture-guwen": 0.00010793230131922877,
    "en-ebook": 0.006752886390990355,
    "en-cnipa-patent": 0.00879109794841474,
    "en-baike-britannica": 8.430915492876914e-06,
    "en-baike-wiki": 0.0021896681282772877,
    "en-national-geographic": 4.570541918471314e-06,
    "en-aops-community": 1.7543440542384783e-06,
    "en-aops-wiki": 1.764052048718661e-06,
    "en-wikihow": 3.0416204903997134e-06,
    "en-paper-arxiv": 0.009160853995841984,
    "en-magazine-longyuanqikan": 2.4839705554959913e-05,
    "en-magazine-rendabaokan": 4.939596088052444e-08,
    "en-sciencedaily": 5.94095290734215e-05,
    "pile-wikipedia-en": 0.000912021793860447,
    "pile-dm-mathematics": 4.06737336863567e-05,
    "pile-enron-emails": 3.7609980744718317e-06,
    "pile-europarl": 0.00012437015866797725,
    "pile-freelaw": 0.0011587879543964595,
    "pile-hackernews": 3.501402528149162e-05,
    "pile-nih-exporter": 5.139983698085387e-05,
    "pile-opensubtitles": 3.4447973725610143e-06,
    "pile-openwebtext2": 0.000616332380394057,
    "pile-philpapers": 5.484422917077252e-05,
    "pile-pubmed-abstracts": 0.0004701544894610481,
    "pile-pubmed-central": 0.0035294276002389205,
    "pile-stackexchange": 0.0007271343344519101,
    "pile-uspto-backgrounds": 0.0003756382529266613,
    "zh-zhihu-answer-discipline-2": 5.314006848345666e-05,
    "zh-baidu-jingyan-3": 4.4171488581496085e-06,
    "zh-news-4": 3.843690296340475e-05,
    "zh-zhihu-article-other-3": 5.925790749213558e-05,
    "zh-zhihu-answer-other-4": 2.7928936131543486e-05,
    "zh-zhihu-answer-other-2": 7.10519190817063e-05,
    "zh-baike-chinese-4": 3.3952275194119425e-07,
    "zh-baike-wiki-4": 7.881528434253521e-07,
    "zh-baike-wiki-5": 3.1547977432210796e-06,
    "zh-baidu-baike-3": 1.1076749208747955e-05,
    "zh-baidu-baike-4": 2.242810188161264e-05,
    "zh-zhihu-answer-other-5": 0.00027723828802693056,
    "zh-toutiao-news-4": 0.0006215844498876827,
    "high_freq_high_trans-en": 0.00040824193714548664,
    "zh-baidu-jingyan-2": 3.6498208595738417e-06,
    "zh-baidu-zhidao-4": 1.1050362173694083e-05,
    "zh-baidu-zhidao-1": 5.125750510765654e-07,
    "zh-baidu-baike-5": 0.0001385689153924742,
    "zh-toutiao-news-5": 0.004926968474436315,
    "zh-weixin-3": 0.001937627199345418,
    "zh-baike-chinese-2": 5.823302492790584e-07,
    "zh-baike-chinese-3": 2.7656157004392264e-07,
    "zh-weixin-5": 0.016062149099884796,
    "zh-weixin-1": 0.0007346612466471133,
    "zh-zhihu-article-discipline-5": 0.0002319188110479989,
    "zh-baidu-baike-1": 5.425506673821692e-06,
    "zh-news-5": 0.0002796369760560238,
    "zh-zhihu-article-discipline-2": 5.816208131207344e-05,
    "zh-zhihu-answer-discipline-3": 2.4366503315923556e-05,
    "zh-weixin-4": 0.0023966641794125536,
    "zh-zhihu-article-other-5": 0.0005337206883657922,
    "increase_ins-en": 0.0095987057537117,
    "high_freq_low_trans-en": 0.0026630884242302465,
    "zh-toutiao-news-3": 0.0005470415093546112,
    "zh-baidu-jingyan-4": 7.576692594201615e-06,
    "zh-baidu-jingyan-1": 1.4914723938286557e-06,
    "zh-zhihu-article-discipline-4": 3.710062161171972e-05,
    "zh-knowledge-39healthy-5": 1.5804356928072324e-06,
    "zh-zhihu-answer-discipline-1": 1.002276658002594e-05,
    "zh-baidu-zhidao-3": 7.78751365902045e-06,
    "zh-baike-wiki-1": 6.051598567797852e-08,
    "zh-zhihu-article-discipline-3": 2.9187311089586234e-05,
    "zh-baidu-jingyan-5": 2.929093124403809e-05,
    "zh-baidu-baike-2": 1.4929586467229647e-05,
    "zh-baidu-zhidao-2": 1.4758502166428126e-06,
    "zh-zhihu-answer-other-3": 1.712554837310895e-05,
    "low_freq_low_trans-en": 0.0010163622045487976,
    "zh-baike-wiki-2": 2.564147241701842e-07,
    "zh-news-3": 2.2652386954839017e-05,
    "zh-baike-chinese-5": 2.592779114828182e-06,
    "zh-psychspace-laiyinside-5": 9.563636215639934e-07,
    "zh-zhihu-answer-discipline-5": 0.00022929642085943292,
    "zh-zhihu-answer-other-1": 1.1035041050495992e-05,
    "zh-zhihu-article-discipline-1": 1.0958532291502078e-05,
    "zh-news-1": 1.0429037533840773e-05,
    "zh-baidu-zhidao-5": 4.4176365685627225e-05,
    "zh-toutiao-news-1": 0.00022256171912924785,
    "zh-zhihu-article-other-2": 0.00014548487258928138,
    "low_freq_high_trans-en": 0.0009224915404194681,
    "zh-toutiao-news-2": 0.0018071497705979193,
    "zh-weixin-2": 0.005482601116997361,
    "zh-baike-wiki-3": 8.635598540835131e-08,
    "zh-baike-chinese-1": 9.340218425946685e-08,
    "zh-zhihu-article-other-1": 2.5297100614039607e-05,
    "zh-news-2": 0.00010782810607635888,
    "zh-zhihu-article-other-4": 7.882037494547275e-05,
    "zh-zhihu-answer-discipline-4": 2.8371458326330606e-05,
    "P_chatml_llama_oj_v1.0.0_20240613": 0.0037462499999999996,
    "CC-MAIN-2019-13": 0.0006303141356545711,
    "CC-MAIN-2020-29": 0.0009389301520803893,
    "CC-MAIN-2022-27": 0.0022041467409606424,
    "CC-MAIN-2015-11": 8.109827658244911e-05,
    "CC-MAIN-2019-30": 0.0006891572968262745,
    "CC-MAIN-2015-35": 0.00011680582064399624,
    "CC-MAIN-2019-35": 0.0007645559043407932,
    "CC-MAIN-2020-24": 0.000864336539223936,
    "CC-MAIN-2014-23": 0.00014379941521244573,
    "CC-MAIN-2020-10": 0.0006967683981914413,
    "CC-MAIN-2017-30": 0.0002729640418613923,
    "CC-MAIN-2019-22": 0.0007183637245636377,
    "CC-MAIN-2017-51": 0.0004589696405263251,
    "CC-MAIN-2015-14": 6.56428240126915e-05,
    "CC-MAIN-2014-15": 0.00019569002622597077,
    "CC-MAIN-2018-51": 0.0009597289180394613,
    "CC-MAIN-2019-09": 0.0007360168855921876,
    "CC-MAIN-2018-17": 0.0006629530868726241,
    "CC-MAIN-2020-34": 0.0007715953445199656,
    "CC-MAIN-2014-41": 0.00012718775248961908,
    "CC-MAIN-2017-43": 0.0004336558669218811,
    "CC-MAIN-2021-04": 0.0010657966215509675,
    "CC-MAIN-2021-25": 0.0010665819539393215,
    "CC-MAIN-2015-18": 0.00010816322142499089,
    "CC-MAIN-2018-43": 0.0006316950811890341,
    "CC-MAIN-2019-51": 0.0005603556781686142,
    "CC-MAIN-2017-13": 0.00019694197875935683,
    "CC-MAIN-2018-30": 0.0015174330305225713,
    "CC-MAIN-2019-26": 0.0006550004773104175,
    "CC-MAIN-2016-07": 0.00014019510597666613,
    "CC-MAIN-2019-39": 0.0007019313281746469,
    "CC-MAIN-2018-05": 0.0007745254442897052,
    "CC-MAIN-2017-04": 0.00017696453751422103,
    "CC-MAIN-2016-40": 0.00011783313144305895,
    "CC-MAIN-2015-06": 8.818482573204583e-05,
    "CC-MAIN-2018-22": 0.0008591123107119103,
    "CC-MAIN-2019-04": 0.0009150139221597157,
    "CC-MAIN-2016-36": 8.770751521464621e-05,
    "CC-MAIN-2022-21": 0.00217917872767734,
    "CC-MAIN-2017-34": 0.0003661712526208471,
    "CC-MAIN-2022-05": 0.0014713272591459286,
    "CC-MAIN-2021-21": 0.0010075864686518187,
    "CC-MAIN-2015-27": 6.749577950361446e-05,
    "CC-MAIN-2018-09": 0.0007324705063752107,
    "CC-MAIN-2015-48": 0.0001409209924556444,
    "CC-MAIN-2017-26": 0.0002517458621851499,
    "CC-MAIN-2020-45": 0.0008571007664239723,
    "CC-MAIN-2015-40": 8.451903912450346e-05,
    "CC-MAIN-2021-17": 0.0011022659604424765,
    "CC-MAIN-2014-10": 0.00014505437153544007,
    "CC-MAIN-2016-50": 0.00017601320931947873,
    "CC-MAIN-2020-40": 0.0010476193587604904,
    "CC-MAIN-2014-42": 0.00012272811693510457,
    "CC-MAIN-2014-52": 0.0001044439337628064,
    "CC-MAIN-2021-43": 0.0016706853777881756,
    "CC-MAIN-2018-47": 0.0006955469011311632,
    "CC-MAIN-2022-49": 0.0034891303649764492,
    "CC-MAIN-2021-39": 0.001371902497490454,
    "CC-MAIN-2021-31": 0.0012360004163274776,
    "CC-MAIN-2021-10": 0.0009177920009331479,
    "CC-MAIN-2021-49": 0.0014378773192222753,
    "CC-MAIN-2017-39": 0.0004019900452490822,
    "CC-MAIN-2017-22": 0.00023460278003921442,
    "CC-MAIN-2018-26": 0.0010664552894626247,
    "CC-MAIN-2020-05": 0.0006789134335894143,
    "CC-MAIN-2018-34": 0.0004224480486215631,
    "CC-MAIN-2015-32": 8.456198429315407e-05,
    "CC-MAIN-2016-22": 8.377681345454265e-05,
    "CC-MAIN-2015-22": 0.00012341827800951762,
    "CC-MAIN-2019-47": 0.0006327125078500733,
    "CC-MAIN-2019-43": 0.0008237955043353062,
    "CC-MAIN-2023-14": 0.0076224310577767814,
    "CC-MAIN-2016-26": 5.3443204397139774e-05,
    "CC-MAIN-2020-50": 0.0008186145933330736,
    "CC-MAIN-2018-13": 0.0006112310480101991,
    "CC-MAIN-2017-17": 0.0002208700108487846,
    "CC-MAIN-2016-18": 6.90588421606766e-05,
    "CC-MAIN-2019-18": 0.0006511671892645944,
    "CC-MAIN-2022-40": 0.0023068768055020837,
    "CC-MAIN-2017-47": 0.0004365271020096023,
    "CC-MAIN-2016-30": 9.831245458727076e-05,
    "CC-MAIN-2023-06": 0.006828765930380142,
    "CC-MAIN-2014-49": 7.41010550133096e-05,
    "CC-MAIN-2016-44": 0.00025917308799269686,
    "CC-MAIN-2020-16": 0.0007372539698335357,
    "CC-MAIN-2017-09": 0.0001707217834902448,
    "CC-MAIN-2018-39": 0.0004803216247187733,
    "CC-MAIN-2014-35": 0.00011488611662858121,
    "CC-MAIN-2013-48": 0.00028317116364496404,
    "CC-MAIN-2022-33": 0.0022164660053330155,
    "zh-weixin": 0.023825920389347832,
    "P_cc_math_v1.3.0_240514_32k": 0.0033264144135579277,
    "c-sharp_32k": 0.00974119670741968,
    "java_dependency_32k": 0.0018331441130596529,
    "python_with_comments_by_deepseek_32k": 0.010096635243723135,
    "cn_32k": 0.02265257497051058,
    "en_32k": 0.035526377440375276,
    "P_mix_leader_info_20240527_shuffle_scale10_watermark": 0.003474988142607183,
    "duanju_shuffle": 0.00044940090797776597,
    "shigeyuan_shuffle": 4.288041812454169e-05,
    "wenyanwen_trains_shuffle": 0.00014595186927735532,
    "guwenshici_q_generate_shuffle": 0.0011889911294410737,
    "baidutiku0521_237w": 0.0013621665544292548,
    "replace_wizardcot": 0.004556451471998844,
    "pinshi_shuffle": 0.0008339338978357142,
    "cn_exam_simple_fix_equation_V3_merge": 0.007964079601104334,
    "symbolab_shuffle": 0.003178225513828586,
    "en_exam_simple_fix_equation_V3_merge": 0.0006776014204775114,
    "XES_V0524_Clean_fix_prompt": 0.004098665440665075,
    "zuowen0601_merge_shuffle": 4.146239983994529e-05,
    "python_with_comments_by_deepseek_v1.1.0_256k": 0.012499999999999999,
    "en_256k": 0.1307052704995229,
    "java_dependency_256k": 0.012499999999999999,
    "P_chain_of_recall_v1.0.0_20240608_zh_256k": 0.0248379425965787,
    "P_chain_of_recall_v1.0.0_20240608_en_256k": 0.025162057403421298,
    "python_with_comments_by_deepseek_256k": 0.012499999999999999,
    "cn_256k": 0.21923580161386558,
    "P_cc_math_v1.3.0_240514_256k": 5.8927886611503975e-05,
    "c-sharp_256k": 0.012499999999999999,
    "P_long_icl_v1.0.0_20240609_cn": 0.017237359172758107,
    "P_long_icl_v1.0.0_20240609_en": 0.032762640827241896,
    "passage_retrieval_en": 7.04703993737347e-05,
    "hotpotqa_e": 8.056946542448536e-05,
    "passage_count": 0.00011524187248489767,
    "2wikimqa_e": 0.00011834194207519674,
    "passage_retrieval_zh": 0.00011537632064168561
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

# reasoning
for key, value in {
    key: {
        "min_length": 0
    } for key in os.listdir(os.path.join(TRAIN_FOLDER, "reasoning"))
}.items():
    if key not in SUBSET_PARAMS:
        SUBSET_PARAMS[key] = value
    else:
        SUBSET_PARAMS[key] = {**SUBSET_PARAMS[key], **value}
        
# P_longbench_enhancement_1.0.0_20240614
for key, value in {
    key: {
        "tokenizer_wrapper": "base_format",
        "break_mode": "pad",
        "min_length": 0
    } for key in os.listdir(os.path.join(TRAIN_FOLDER, "P_longbench_enhancement_1.0.0_20240614"))
}.items():
    if key not in SUBSET_PARAMS:
        SUBSET_PARAMS[key] = value
    else:
        SUBSET_PARAMS[key] = {**SUBSET_PARAMS[key], **value}

for key, value in {
    # watermark
    "P_mix_leader_info_20240527_shuffle_scale10_watermark": {"tokenizer_wrapper": "sft", "break_mode": "pad", "min_length": 0},
    # the_famous
    # "leader_info_20240302": {"tokenizer_wrapper": "sft", "break_mode": "pad", "min_length": 0},
    "leader_info_20240527_shuffle": {"tokenizer_wrapper": "sft", "break_mode": "pad", "min_length": 0},
    # symbolab
    "P_symbolab_v1.0.0_20240518": {"tokenizer_wrapper": "sft", "break_mode": "pad", "min_length": 0},
    # math_construct
    "P_mixed_math_construct_v2.0.0_240326": {"tokenizer_wrapper": "sft_multi_round", "min_length": 0},
    # math_construct
    "P_mixed_math_construct_v2.0.0_240326": {"tokenizer_wrapper": "sft_multi_round", "min_length": 0},
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
    "P_buguake_v1.0.0_20240615": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad",
        "min_length": 0
    },
    "P_wizard_cot_en_v1.0.0_20240614": {
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
    # 256k
    "P_chain_of_recall_v1.0.0_20240608_en_256k": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad"
    },
    "P_chain_of_recall_v1.0.0_20240608_zh_256k": {
        "tokenizer_wrapper": "sft",
        "break_mode": "pad"
    }   
}.items():
    if key not in SUBSET_PARAMS:
        SUBSET_PARAMS[key] = value
    else:
        SUBSET_PARAMS[key] = {**SUBSET_PARAMS[key], **value}
        
for key, value in {
    # short texts
    "zh-baidu-zhidao": {"min_length": 0},
    "zh-baidu-baike": {"min_length": 0},
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
DYNAMIC_ATTRIBUTE_FUNC = "dynamic_attr_op_v4"

# if you want do online prompting on jsonl samples, you should do like we do in below:
# according to data filed "data_type" generating online prompt
# most of the time it is a must to use DYNAMIC_ATTRIBUTE_FUNC with it
# You should also set tokenizer_wrapper to `online_prompt`
# ONLINE_PROMPT = {
#     "porn":{"This is a porn sample:\n":0.3, "This is a good sample with porn information:\n":0.6},
#     "politic":{"This is a politic sample:\n":0.7},
# }

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
    empty_cache_and_diag_interval=25,
    diag_outlier_ratio=1.1,
    # only work for TOKENIZER_WRAPPER_TYPE = "pretrain"
    # if set to True, each splited sample will have bos
    always_bos=False,
    valid_pack_mode=VALID_PACK_DATASET_BREAK_MODE,
    valid_packed_length=VALID_PACKED_LENGTH,
    valid_drop_last=False,
    subset_params=SUBSET_PARAMS,
    probe_size=-1,
    tokenizer_chunk_num=512,
    inject_dyname_word_prompt=True,
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
parallel_check_freq=10000000000000000
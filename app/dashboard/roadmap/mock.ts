export const mockData = {
  rootId: 'TrainTask/a',
  nodes: [
    {
      id: 'TrainTask/a',
      key: 'a',
      revision: 'rev_a_1',
      type: 'task',
      isDeliveryBranch: true,
      taskName: 'official_InternLM2.5_20B_3.1.0_4kReRun',
      taskDesc: '4k交付任务'
    },
    {
      id: 'Checkpoint/a1',
      key: 'a1',
      revision: 'rev_a1_1',
      type: 'ckpt',
      isDeliveryBranch: true,
      configContent: `parallel = dict(
  zero1=dict(size=-1),
  tensor=dict(size=16, mode="fsp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True)
)
DATASET_WEIGHTS = {
  "github_go": 9.155192239672025e-05,
  "github_javascript": 0.0003424044244706788,
  "starcoder_cpp": 0.0003331215920434134,
  "starcoder_python": 0.00041252998315727664,
  "github_python": 0.00019326974814897545,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  valid_folder=VALID_FOLDER,
  num_worker=4,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=512,
)`,
      configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_3.1.0_4kReRun.py",
      isSnapshot: false,
      isDelivery: false,
      md5: "ab5f4684c7975df083b96af9ca798b7e10a9dc4eb0dd5e4069e6d9e34f249d48",
      ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/168000",
      saveTime: new Date("2024-07-01T13:01:24.907Z"),
      step: 168000
    },
    {
      id: 'Checkpoint/a2', key: 'a2', revision: 'rev_a2_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=-1),
  tensor=dict(size=16, mode="fsp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True)
)
DATASET_WEIGHTS = {
  "github_go": 9.155192239672025e-05,
  "github_javascript": 0.0003424044244706788,
  "starcoder_cpp": 0.0003331215920434134,
  "starcoder_python": 0.00041252998315727664,
  "github_python": 0.00019326974814897545,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=4,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=512,
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_3.1.0_4kReRun.py", isSnapshot: false, isDelivery: false, md5: "021e69090901f8548fd08856ff697221e9233e6cd83d6dfb7b62ea0e03075449", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/170000", saveTime: new Date("2024-07-09T09:15:03.928Z"), step: 170000
    },
    {
      id: 'Checkpoint/a3', key: 'a3', revision: 'rev_a3_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=-1),
  tensor=dict(size=16, mode="fsp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True)
)
DATASET_WEIGHTS = {
  "github_go": 9.155192239672025e-05,
  "github_javascript": 0.0003424044244706788,
  "starcoder_cpp": 0.0003331215920434134,
  "starcoder_python": 0.00041252998315727664,
  "github_python": 0.00019326974814897545,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  valid_folder=VALID_FOLDER,
  num_worker=4,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=512,
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_3.1.0_4kReRun.py", isSnapshot: false, isDelivery: true, md5: "625245930fa9f4f02d2ed4a328256d0c2ef436df9fe644aeb18e68d7070749c4", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/222000", saveTime: new Date("2024-07-12T02:07:56.772Z"), step: 222000
    },
    { id: 'TrainTask/b', key: 'b', revision: 'rev_b_1', type: 'task', isDeliveryBranch: true, taskName: "official_InternLM2.5_20B_3.1.0_4kReRun_32k", taskDesc: '32k交付任务' },
    {
      id: 'Checkpoint/b1', key: 'b1', revision: 'rev_b1_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=4),
  tensor=dict(size=16, mode="fsp"),
  # pipeline=dict(size=8, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "github_go": 0.0001810862680180234,
  "github_javascript": 0.0006772631066289402,
  "starcoder_cpp": 0.0006589020123243774,
  "starcoder_python": 0.000815968831017856,
  "github_python": 0.0003822803115091665,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=2,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=64
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_3.1.0_4kReRun_32k.py", isSnapshot: false, isDelivery: false, md5: "49ff987f054f456ef03446fb4658d2b1b549baad82c19cebb8b1e6e4fdf014e6", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun_32k/224000", saveTime: new Date("2024-07-12T14:02:08.852Z"), step: 224000
    },
    {
      id: 'Checkpoint/b2', key: 'b2', revision: 'rev_b2_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=4),
  tensor=dict(size=16, mode="fsp"),
  # pipeline=dict(size=8, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "github_go": 0.0001810862680180234,
  "github_javascript": 0.0006772631066289402,
  "starcoder_cpp": 0.0006589020123243774,
  "starcoder_python": 0.000815968831017856,
  "github_python": 0.0003822803115091665,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=2,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=64
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_3.1.0_4kReRun_32k.py", isSnapshot: false, isDelivery: true, md5: "7ecacb1a3eea10f91d70fcac05215c77a50de1c0d4bf0b88907a6fc216734058", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun_32k/226000", saveTime: new Date("2024-07-13T00:05:02.721Z"), step: 226000
    },
    { id: 'TrainTask/c', key: 'c', revision: 'rev_c_1', type: 'task', isDeliveryBranch: true, taskName: "official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k", taskDesc: '256k交付任务' },
    {
      id: 'Checkpoint/c1', key: 'c1', revision: 'rev_c1_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=-1),
  tensor=dict(size=16, mode="fsp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True)
)
DATASET_WEIGHTS = {
  "github_go": 9.155192239672025e-05,
  "github_javascript": 0.0003424044244706788,
  "starcoder_cpp": 0.0003331215920434134,
  "starcoder_python": 0.00041252998315727664,
  "github_python": 0.00019326974814897545,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=4,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=512,
)`, configPath: "/cpfs01/shared/alillm2/user/zhangshuo/codes/train/official_20240509_1M/configs/InternLM2.5/official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k.py", isSnapshot: false, isDelivery: false, md5: "f794d5a2becf4ba42ad8d7a0980957a8438f0d8aea914eb3d59405e36cf60bc9", ckptPath: "/cpfs02/puyu/shared/alillm2/alillm2/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k/226050", saveTime: new Date("2024-07-14T01:39:48.985Z"), step: 226050
    },
    {
      id: 'Checkpoint/c2', key: 'c2', revision: 'rev_c2_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=-1),
  tensor=dict(size=16, mode="fsp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True)
)
DATASET_WEIGHTS = {
  "github_go": 9.155192239672025e-05,
  "github_javascript": 0.0003424044244706788,
  "starcoder_cpp": 0.0003331215920434134,
  "starcoder_python": 0.00041252998315727664,
  "github_python": 0.00019326974814897545,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=4,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=512,
)`, configPath: "/cpfs01/shared/alillm2/user/zhangshuo/codes/train/official_20240509_1M/configs/InternLM2.5/official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k.py", isSnapshot: false, isDelivery: true, md5: "9f69a0677787ab96e4ae7953343981e72c23e34a2ac0e24fa63ecbd703c2c29b", ckptPath: "/cpfs02/puyu/shared/alillm2/alillm2/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k/226100", saveTime: new Date("2024-07-14T16:38:59.715Z"), step: 226100
    },
    { id: 'TrainTask/d', key: 'd', revision: 'rev_d_1', type: 'task', isDeliveryBranch: false, taskName: "official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak", taskDesc: 'Enhance 11.0.0' },
    {
      id: 'Checkpoint/d1', key: 'd1', revision: 'rev_d1_1', type: 'ckpt', isDeliveryBranch: false, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "aops_1210": 0.022459718510880914,
  "aops_1225": 8.383132835406179e-05,
  "evol_code_v4x_r2_0_merged_shuffled": 0.007907419788873282,
  "Magicoder-OSS-Instruct-75K": 0.005163041747564465,
  "Magicoder-Evol-Instruct-110K": 0.008203529272324218,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=4,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=8
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak.py", isSnapshot: false, isDelivery: false, md5: "fe53e19698aa0d2985cdc0cd05ce4e52e93e4bc100f9cd49525c65b92b8a50ff", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/2000", saveTime: new Date("2024-07-13T11:19:28.742Z"), step: 2000
    },
    {
      id: 'Checkpoint/d2', key: 'd2', revision: 'rev_d2_1', type: 'ckpt', isDeliveryBranch: false, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "aops_1210": 0.022459718510880914,
  "aops_1225": 8.383132835406179e-05,
  "evol_code_v4x_r2_0_merged_shuffled": 0.007907419788873282,
  "Magicoder-OSS-Instruct-75K": 0.005163041747564465,
  "Magicoder-Evol-Instruct-110K": 0.008203529272324218,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=4,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=8
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak.py", isSnapshot: false, isDelivery: false, md5: "dd8e63992c3c7dd121d9a9705ae0abe956c395ad230ab2f82ebf6b688d39b850", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/38000", saveTime: new Date("2024-07-14T12:34:53.081Z"), step: 38000
    },
    { id: 'TrainTask/e', key: 'e', revision: 'rev_e_1', type: 'task', isDeliveryBranch: true, taskName: "official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak", taskDesc: 'Enhance 18.0.0' },
    {
      id: 'Checkpoint/e1', key: 'e1', revision: 'rev_e1_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "aops_1210": 0.021836442570204704,
  "aops_1225": 8.150493900004112e-05,
  "evol_code_v4x_r2_0_merged_shuffled": 0.007687982287693381,
  "Magicoder-OSS-Instruct-75K": 0.005019763028358577,
  "Magicoder-Evol-Instruct-110K": 0.007975874485751731,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=4,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=8
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak.py", isSnapshot: false, isDelivery: false, md5: "dff5b8e91fc8b4a63fa1bd582b3376221095d3e2ffb006acb09f7d3ffc7553d7", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/2000", saveTime: new Date("2024-07-14T21:11:28.751Z"), step: 2000
    },
    {
      id: 'Checkpoint/e2', key: 'e2', revision: 'rev_e2_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "aops_1210": 0.021836442570204704,
  "aops_1225": 8.150493900004112e-05,
  "evol_code_v4x_r2_0_merged_shuffled": 0.007687982287693381,
  "Magicoder-OSS-Instruct-75K": 0.005019763028358577,
  "Magicoder-Evol-Instruct-110K": 0.007975874485751731,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=4,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=8
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak.py", isSnapshot: false, isDelivery: false, md5: "784b00272eab7ef08e9e51980bd97b163bed6e9284a31bc4d67d7705622cca3e", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/50000", saveTime: new Date("2024-07-16T13:58:35.982Z"), step: 50000
    },
    { id: 'TrainTask/f', key: 'f', revision: 'rev_f_1', type: 'task', isDeliveryBranch: true, taskName: "official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak_wsd_from_50000_to_52500_5.0.0", taskDesc: '交付256k刷分模型' },
    {
      id: 'Checkpoint/f1', key: 'f1', revision: 'rev_f1_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "Magicoder-OSS-Instruct-75K": 0.06846083460942362,
  "Magicoder-Evol-Instruct-110K": 0.1087770520141705,
  "P_math_fp_v1.0.0_20240522": 0.3862431305036553,
  "P_sc_math_cot_v1.0.0_20240522": 0.4177553777296132,
  "P_math_enhancement_v1.0.0_20240714": 0.0017133297724154033,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=4,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=8
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak_wsd_from_50000_to_52500_5.0.0.py", isSnapshot: false, isDelivery: false, md5: "50831061dcb01a01e4cc3f7d52e7528e56b4b40703b4bea1aca903f58d330ea9", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak_wsd_from_50000_to_52500_5.0.0/52000", saveTime: new Date("2024-07-16T15:52:41.144Z"), step: 52000
    },
    {
      id: 'Checkpoint/f2', key: 'f2', revision: 'rev_f2_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "Magicoder-OSS-Instruct-75K": 0.06846083460942362,
  "Magicoder-Evol-Instruct-110K": 0.1087770520141705,
  "P_math_fp_v1.0.0_20240522": 0.3862431305036553,
  "P_sc_math_cot_v1.0.0_20240522": 0.4177553777296132,
  "P_math_enhancement_v1.0.0_20240714": 0.0017133297724154033,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=4,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  drop_last=True,
  tokenizer_chunk_num=8
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak_wsd_from_50000_to_52500_5.0.0.py", isSnapshot: false, isDelivery: true, md5: "f0bafc261d23f7a0d35bf0e3594c8eaf8c5ffddb88255145332140d6454c5590", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak_wsd_from_50000_to_52500_5.0.0/52500", saveTime: new Date("2024-07-16T16:18:44.956Z"), step: 52500
    },
    { id: 'TrainTask/g', key: 'g', revision: 'rev_g_1', type: 'task', isDeliveryBranch: true, taskName: "official_InternLM2.5_20B_2.0.0", taskDesc: '预训练 2.0.0' },
    {
      id: 'Checkpoint/g1', key: 'g1', revision: 'rev_g1_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=2, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "github_go": 0.00019635531443333332,
  "github_javascript": 0.0007343693793666667,
  "starcoder_cpp": 0.0007144600925666667,
  "starcoder_python": 0.0008847706572999999,
  "github_python": 0.0004145138755666666,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=2,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  tokenizer_chunk_num=64
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_2.0.0.py", isSnapshot: false, isDelivery: false, md5: "796aebc9a04946ae5792e83bd06bf54d99eecf1560a9a583e8c7623a13ae5874", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.0.0/80000", saveTime: new Date("2024-06-04T17:21:02.906Z"), step: 80000
    },
    {
      id: 'Checkpoint/g2', key: 'g2', revision: 'rev_g2_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=2, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "github_go": 0.00019635531443333332,
  "github_javascript": 0.0007343693793666667,
  "starcoder_cpp": 0.0007144600925666667,
  "starcoder_python": 0.0008847706572999999,
  "github_python": 0.0004145138755666666,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=2,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  tokenizer_chunk_num=64
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_2.0.0.py", isSnapshot: false, isDelivery: false, md5: "faa8aa6f971b54666bfd1ee2c5a6f941c7888f51f859cc41f605fc113c661cd4", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.0.0/snapshot/1", saveTime: new Date("2024-06-05T04:10:46.290Z"), step: 83000
    },
    { id: 'TrainTask/h', key: 'h', revision: 'rev_h_1', type: 'task', isDeliveryBranch: true, taskName: "official_InternLM2.5_20B_2.1.0", taskDesc: '预训练 2.1.0' },
    {
      id: 'Checkpoint/h1', key: 'h1', revision: 'rev_h1_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=2, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "github_go": 0.00018064688927866667,
  "github_javascript": 0.0006756198290173333,
  "starcoder_cpp": 0.0006573032851613334,
  "starcoder_python": 0.0008139890047159999,
  "github_python": 0.0003813527655213333,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=2,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  tokenizer_chunk_num=64,
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_2.1.0.py", isSnapshot: false, isDelivery: false, md5: "ba1b5b22c23837304dc59ce9b9a38d2949dd83364ed4ec849edee8a69b7baafd", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.1.0/84000", saveTime: new Date("2024-06-05T10:02:08.308Z"), step: 84000
    },
    {
      id: 'Checkpoint/h2', key: 'h2', revision: 'rev_h2_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=2, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "github_go": 0.00018064688927866667,
  "github_javascript": 0.0006756198290173333,
  "starcoder_cpp": 0.0006573032851613334,
  "starcoder_python": 0.0008139890047159999,
  "github_python": 0.0003813527655213333,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=2,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  tokenizer_chunk_num=64,
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_2.1.0.py", isSnapshot: false, isDelivery: false, md5: "07d558df3e6d5affdb57f1dbc5dd8cd5a9b3eac54c3dff213e9eb96bfc23a0cb", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.1.0/snapshot/0'", saveTime: new Date("2024-06-05T13:37:48.525Z"), step: 85000
    },
    { id: 'TrainTask/i', key: 'i', revision: 'rev_i_1', type: 'task', isDeliveryBranch: true, taskName: "official_InternLM2.5_20B_2.2.0", taskDesc: '预训练 2.2.0' },
    {
      id: 'Checkpoint/i1', key: 'i1', revision: 'rev_i1_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
    zero1=dict(size=2),
    tensor=dict(size=8, mode="msp"),
    pipeline=dict(size=2, interleaved_overlap=True),
    weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
    "github_go": 0.00018064688927866667,
    "github_javascript": 0.0006756198290173333,
    "starcoder_cpp": 0.0006573032851613334,
    "starcoder_python": 0.0008139890047159999,
    "github_python": 0.0003813527655213333,
}
data = dict(
    type=DATASET_TYPE,
    tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
    train_folder=TRAIN_FOLDER,
    num_worker=2,
    gradient_accumulation=GRADIENT_ACCUMULATION,
    text_field="content",
    tokenizer_chunk_num=64,
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_2.2.0.py", isSnapshot: false, isDelivery: false, md5: "4a1598153ab49e33930bbf10af693535b52424422e2effadd722d2219008e70e", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.1.0/snapshot/0", saveTime: new Date("2024-06-05T18:27:36.365Z"), step: 86000
    },
    {
      id: 'Checkpoint/i2', key: 'i2', revision: 'rev_i2_1', type: 'ckpt', isDeliveryBranch: true, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=2, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "github_go": 0.00018064688927866667,
  "github_javascript": 0.0006756198290173333,
  "starcoder_cpp": 0.0006573032851613334,
  "starcoder_python": 0.0008139890047159999,
  "github_python": 0.0003813527655213333,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=2,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  tokenizer_chunk_num=64,
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_2.2.0.py", isSnapshot: false, isDelivery: false, md5: "695da02f030e37c215e76e6805b37325aaa8c20a367f192da3ff9190b5574062", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0/98000", saveTime: new Date("2024-06-07T13:28:46.512Z"), step: 98000
    },
    { id: 'TrainTask/j', key: 'j', revision: 'rev_j_1', type: 'task', isDeliveryBranch: false, taskName: "official_InternLM2.5_20B_2.2.0_with_layer_freeze", taskDesc: '预训练 2.2.0 layer freeze' },
    {
      id: 'Checkpoint/j1', key: 'j1', revision: 'rev_j1_1', type: 'ckpt', isDeliveryBranch: false, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "github_go": 0.00017884042038588,
  "github_javascript": 0.00066886363072716,
  "starcoder_cpp": 0.0006507302523097201,
  "starcoder_python": 0.0008058491146688399,
  "github_python": 0.00037753923786611995,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=2,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  tokenizer_chunk_num=64
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_2.2.0_with_layer_freeze.py", isSnapshot: false, isDelivery: false, md5: "71fd11e18b5f95c8b676e9047e5babc6a1a087d021413ee4cf13b1b6ba4639ba", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0_with_layer_freeze/86000", saveTime: new Date("2024-06-11T17:50:25.308Z"), step: 86000
    },
    {
      id: 'Checkpoint/j2', key: 'j2', revision: 'rev_j2_1', type: 'ckpt', isDeliveryBranch: false, configContent: `parallel = dict(
  zero1=dict(size=2),
  tensor=dict(size=8, mode="msp"),
  pipeline=dict(size=1, interleaved_overlap=True),
  weight=dict(size=1, overlap=True, memory_pool=True),
)
DATASET_WEIGHTS = {
  "github_go": 0.00017884042038588,
  "github_javascript": 0.00066886363072716,
  "starcoder_cpp": 0.0006507302523097201,
  "starcoder_python": 0.0008058491146688399,
  "github_python": 0.00037753923786611995,
}
data = dict(
  type=DATASET_TYPE,
  tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
  train_folder=TRAIN_FOLDER,
  num_worker=2,
  gradient_accumulation=GRADIENT_ACCUMULATION,
  text_field="content",
  tokenizer_chunk_num=64
)`, configPath: "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_2.2.0_with_layer_freeze.py", isSnapshot: false, isDelivery: false, md5: "a8d2cf4dc1b0fd5a3bded81a6d8e24e6253ba69c7e3f87c23cfdbe454a2f458f", ckptPath: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0_with_layer_freeze/104000", saveTime: new Date("2024-06-13T09:33:01.394Z"), step: 104000
    },
  ],
  lines: [
    { id: "CkptStep/k1", key: "k1", revision: "rev_k1_1", type: "step", from: "TrainTask/a", to: "Checkpoint/a2", step: 2000, tokens: "1B", duration: "2:26:41" },
    { id: "CkptStep/k2", key: "k2", revision: "rev_k2_1", type: "step", from: "Checkpoint/a2", to: "Checkpoint/a3", step: 52000, tokens: "26B", duration: "64:52:50" },
    { id: "ResumeCkpt/l1", key: "l1", revision: "rev_l1_1", type: "resume", from: "Checkpoint/a3", to: "TrainTask/b" },
    { id: "CkptStep/k3", key: "k3", revision: "rev_k3_1", type: "step", from: "TrainTask/b", to: "Checkpoint/b1", step: 2000, tokens: "1B", duration: "2:26:41" },
    { id: "CkptStep/k4", key: "k4", revision: "rev_k4_1", type: "step", from: "Checkpoint/b1", to: "Checkpoint/b2", step: 2000, tokens: "1B", duration: "2:26:41" },
    { id: "ResumeCkpt/l2", key: "l2", revision: "rev_l2_1", type: "resume", from: "Checkpoint/b2", to: "TrainTask/c" },
    { id: "CkptStep/k5", key: "k5", revision: "rev_k5_1", type: "step", from: "TrainTask/c", to: "Checkpoint/c1", step: 50, tokens: "400M", duration: "1:41:40" },
    { id: "CkptStep/k6", key: "k6", revision: "rev_k6_1", type: "step", from: "Checkpoint/c1", to: "Checkpoint/c2", step: 50, tokens: "400M", duration: "1:15:37" },
    { id: "ResumeCkpt/l3", key: "l3", revision: "rev_l3_1", type: "resume", from: "Checkpoint/b1", to: "TrainTask/d" },
    { id: "CkptStep/k7", key: "k7", revision: "rev_k7_1", type: "step", from: "TrainTask/d", to: "Checkpoint/d1", step: 2000, tokens: "1B", duration: "1:41:40" },
    { id: "CkptStep/k8", key: "k8", revision: "rev_k8_1", type: "step", from: "Checkpoint/d1", to: "Checkpoint/d2", step: 36000, tokens: "18B", duration: "64:52:50" },
    { id: "ResumeCkpt/l4", key: "l4", revision: "rev_l4_1", type: "resume", from: "Checkpoint/c2", to: "TrainTask/e" },
    { id: "CkptStep/k9", key: "k9", revision: "rev_k9_1", type: "step", from: "TrainTask/e", to: "Checkpoint/e1", step: 2000, tokens: "1B", duration: "1:41:40" },
    { id: "CkptStep/k10", key: "k10", revision: "rev_k10_1", type: "step", from: "Checkpoint/e1", to: "Checkpoint/e2", step: 48000, tokens: "24B", duration: "64:52:50" },
    { id: "ResumeCkpt/l5", key: "l5", revision: "rev_l5_1", type: "resume", from: "Checkpoint/e2", to: "TrainTask/f" },
    { id: "CkptStep/k11", key: "k11", revision: "rev_k11_1", type: "step", from: "TrainTask/f", to: "Checkpoint/f1", step: 2000, tokens: "1B", duration: "1:41:40" },
    { id: "CkptStep/k12", key: "k12", revision: "rev_k12_1", type: "step", from: "Checkpoint/f1", to: "Checkpoint/f2", step: 500, tokens: "250M", duration: "64:52:50" },
    { id: "CkptStep/k13", key: "k13", revision: "rev_k13_1", type: "step", from: "TrainTask/g", to: "Checkpoint/g1", step: 1000, tokens: "500M", duration: "1:41:40" },
    { id: "CkptStep/k14", key: "k14", revision: "rev_k14_1", type: "step", from: "Checkpoint/g1", to: "Checkpoint/g2", step: 3000, tokens: "1.5B", duration: "4:10:40" },
    { id: "ResumeCkpt/l6", key: "l6", revision: "rev_l6_1", type: "resume", from: "Checkpoint/g2", to: "TrainTask/h" },
    { id: "CkptStep/k15", key: "k15", revision: "rev_k15_1", type: "step", from: "TrainTask/h", to: "Checkpoint/h1", step: 1000, tokens: "500M", duration: "1:41:40" },
    { id: "CkptStep/k16", key: "k16", revision: "rev_k16_1", type: "step", from: "Checkpoint/h1", to: "Checkpoint/h2", step: 1000, tokens: "500M", duration: "1:50:40" },
    { id: "ResumeCkpt/l7", key: "l7", revision: "rev_l7_1", type: "resume", from: "Checkpoint/h2", to: "TrainTask/i" },
    { id: "CkptStep/k17", key: "k17", revision: "rev_k17_1", type: "step", from: "TrainTask/i", to: "Checkpoint/i1", step: 1000, tokens: "500M", duration: "1:41:40" },
    { id: "CkptStep/k18", key: "k18", revision: "rev_k18_1", type: "step", from: "Checkpoint/i1", to: "Checkpoint/i2", step: 12000, tokens: "6B", duration: "20:05:40" },
    { id: "ResumeCkpt/l8", key: "l8", revision: "rev_l8_1", type: "resume", from: "Checkpoint/h2", to: "TrainTask/j" },
    { id: "CkptStep/k19", key: "k19", revision: "rev_k19_1", type: "step", from: "TrainTask/j", to: "Checkpoint/j1", step: 1000, tokens: "500M", duration: "1:41:40" },
    { id: "CkptStep/k20", key: "k20", revision: "rev_k20_1", type: "step", from: "Checkpoint/j1", to: "Checkpoint/j2", step: 18000, tokens: "9B", duration: "30:05:40" },
  ],
  warnings: [
    {
      id: "Checkpoint/a3",
      message: "mock警告信息1mock警告信息1mock警告信息1mock警告信息1mock警告信息1mock警告信息1",
    },
    {
      id: "Checkpoint/d2",
      message: "mock警告信息2",
    },
  ]
}



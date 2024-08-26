import moment from "moment";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";
import { Database } from "arangojs";
import * as model from "@/models";

const graph = [
  {
    name: "official_InternLM2.5_20B_3.1.0_4kReRun",
    type: "pretrain",
    desc: "4k ReRun",
    configs: [
      {
        configContent: "config/official_InternLM2.5_20B_3.1.0_4kReRun.py",
        configPath:
          "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_3.1.0_4kReRun.py",
        startStep: 168000,
        ckpts: [
          {
            md5: "021e69090901f8548fd08856ff697221e9233e6cd83d6dfb7b62ea0e03075449",
            step: 170000,
            tokens: 5e6,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-09T09:15:03.928Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/170000",
          },
          {
            md5: "2c8e3d3288a2c9b1197c68042520e97a35a0624c257c84b5c75e3ded2d18e484",
            step: 172000,
            tokens: 1e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-09T11:44:01.108Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/172000",
          },
          {
            md5: "dca588a5df4c56d9813bea0065875ebfca37493e6c5a0e4f2d1234767d417fef",
            step: 174000,
            tokens: 1.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-09T14:12:37.962Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/174000",
          },
          {
            md5: "1f387fce391493a23a5dd947c26920e37289950d5b1ed2b938a96aadb3770b96",
            step: 176000,
            tokens: 2e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-09T16:40:18.815Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/176000",
          },
          {
            md5: "88fe2b0b5bf65c78befff75e029d0532366627706ddbea02f15701fdd3e93108",
            step: 178000,
            tokens: 2.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-09T19:06:10.095Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/178000",
          },
          {
            md5: "03e72f38ff80d1249e6370d67e8d5454955574055e25577f7bc9ce75575b3425",
            step: 180000,
            tokens: 3e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-09T21:32:21.434Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/180000",
          },
          {
            md5: "6f6f9951844268bde4510ca940a470669a83baecf6bba1c8078b13e95553fc01",
            step: 182000,
            tokens: 3.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-10T00:00:17.754Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/182000",
          },
          {
            md5: "c299bbd50759741e4fa9cde4448013cda98fd0ea7a73536bfd3c9526fe0c9b52",
            step: 184000,
            tokens: 4e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-10T02:29:43.685Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/184000",
          },
          {
            md5: "24d9733e7f1cf0e61de3cf5ed623c5c98569ecdbd8b9d7d574bed69306782ab1",
            step: 186000,
            tokens: 4.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-10T04:56:54.306Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/186000",
          },
          {
            md5: "3c2c0ec6fbf536cfb541c0f0e4d4303f3655476295ff7b5c24a0ef9222a491d6",
            step: 188000,
            tokens: 5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-10T07:23:44.122Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/188000",
          },
          {
            md5: "e95dc44938e55a158d33c49eab25b33d348c2ec679a85f25e83bec1308e43768",
            step: 190000,
            tokens: 5.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-10T09:53:24.201Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/190000",
          },
          {
            md5: "7229f62b315e7b3b2e605a7db1d1989c61a88a2762d5583414be4277823185df",
            step: 192000,
            tokens: 6e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-10T12:22:02.480Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/192000",
          },
          {
            md5: "60d4722cc1e79549189389676571768d83680529dfb663ffb99c8e8a8cabb1f9",
            step: 194000,
            tokens: 6.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-10T14:51:24.510Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/194000",
          },
          {
            md5: "4c30ff80c913cb20156b82b41190a6789de8276065cc16f20935306866a82bb5",
            step: 196000,
            tokens: 7e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-10T17:19:27.061Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/196000",
          },
          {
            md5: "f713095ae9d585f914bf0ac0d36df87850fead8f780d016da6ed2688f4430a93",
            step: 198000,
            tokens: 7.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-10T19:51:21.406Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/198000",
          },
          {
            md5: "2666bb8b67185ab34fb1d8cb63bebd0be54fb9e48feff32f62de039155192d5c",
            step: 200000,
            tokens: 8e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-10T22:22:17.792Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/200000",
          },
          {
            md5: "f0bd0a2c1c6964258f80841e3e34be76447ec06a4d288c5be7864d13190168f0",
            step: 202000,
            tokens: 8.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-11T00:55:59.104Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/202000",
          },
        ],
      },
      {
        configContent: "config/official_InternLM2.5_20B_3.1.0_4kReRun.py",
        configPath:
          "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_3.1.0_4kReRun.py",
        loadCkpt:
          "f0bd0a2c1c6964258f80841e3e34be76447ec06a4d288c5be7864d13190168f0",
        startStep: 202000,
        ckpts: [
          {
            md5: "d5c1eddb6395839081ea6c54ad132492e4454baf75eacc7fb509f440d7c08254",
            step: 204000,
            tokens: 5e6,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-11T03:27:54.349Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/204000",
          },
          {
            md5: "8a55c532f82140f12acbb376a369b73137d1ccf480cce7612d9afa4fe6af1363",
            step: 206000,
            tokens: 1e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-11T06:00:10.194Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/206000",
          },
          {
            md5: "f64bb1f39012914bbb04b139fdcee987d37812709fce83f2487ae8881f785f3d",
            step: 208000,
            tokens: 1.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-11T08:32:41.932Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/208000",
          },
          {
            md5: "4cdc1196cc6a0f2b5897c4df515c7cf4404caf2115c813fd13ada524fdadbce3",
            step: 210000,
            tokens: 2e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-11T11:02:43.274Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/210000",
          },
          {
            md5: "58d545d1cc9526f0197d9747091a89e30eeb3b2323f9f66543feeca3303701ca",
            step: 212000,
            tokens: 2.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-11T13:34:44.368Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/212000",
          },
          {
            md5: "ac044d78f8cc0aefe9e528e54fc8a21d477b831b253ea1b65756f4a027297860",
            step: 214000,
            tokens: 3e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-11T16:05:53.130Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/214000",
          },
          {
            md5: "a01b999167c3bc2372d6188c302d2c134ee9ec727bee968501f4edaa00386dd2",
            step: 216000,
            tokens: 3.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-11T18:35:15.400Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/216000",
          },
          {
            md5: "c0baffd25c1bca9d5d446ed8ce57d5b33de128b2e6f1332c75e45cbcb0f072eb",
            step: 218000,
            tokens: 4e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-11T21:07:28.580Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/218000",
          },
          {
            md5: "3e9dc8611fb1cedd2ac3504749fd086d02f5f3039579622ce15ea92803aa091a",
            step: 220000,
            tokens: 4.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-11T23:37:54.089Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/220000",
          },
          {
            md5: "625245930fa9f4f02d2ed4a328256d0c2ef436df9fe644aeb18e68d7070749c4",
            step: 222000,
            tokens: 5e7,
            isSnapshot: false,
            isDelivery: true,
            isRewardModel: false,
            saveTime: new Date("2024-07-12T02:07:56.772Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun/222000",
          },
        ],
      },
    ],
  },
  {
    name: "official_InternLM2.5_20B_3.1.0_4kReRun_32k",
    type: "pretrain",
    desc: "32k pretrain",
    loadCkpt:
      "625245930fa9f4f02d2ed4a328256d0c2ef436df9fe644aeb18e68d7070749c4",
    configs: [
      {
        configContent: "config/official_InternLM2.5_20B_3.1.0_4kReRun_32k.py",
        configPath:
          "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_3.1.0_4kReRun_32k.py",
        startStep: 222000,
        ckpts: [
          {
            md5: "49ff987f054f456ef03446fb4658d2b1b549baad82c19cebb8b1e6e4fdf014e6",
            step: 224000,
            tokens: 5e6,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-12T14:02:08.852Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun_32k/224000",
          },
          {
            md5: "7ecacb1a3eea10f91d70fcac05215c77a50de1c0d4bf0b88907a6fc216734058",
            step: 226000,
            tokens: 1e7,
            isSnapshot: false,
            isDelivery: true,
            isRewardModel: false,
            saveTime: new Date("2024-07-13T00:05:02.721Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4kReRun_32k/226000",
          },
        ],
      },
    ],
  },
  {
    name: "official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k",
    type: "pretrain",
    desc: "256k pretrain",
    loadCkpt:
      "7ecacb1a3eea10f91d70fcac05215c77a50de1c0d4bf0b88907a6fc216734058",
    configs: [
      {
        configContent:
          "config/official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k.py",
        configPath:
          "/cpfs01/shared/alillm2/user/zhangshuo/codes/train/official_20240509_1M/configs/InternLM2.5/official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k.py",
        startStep: 226000,
        ckpts: [
          {
            md5: "f794d5a2becf4ba42ad8d7a0980957a8438f0d8aea914eb3d59405e36cf60bc9",
            step: 226050,
            tokens: 5e6,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T01:39:48.985Z"),
            path: "/cpfs02/puyu/shared/alillm2/alillm2/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k/226050",
          },
          {
            md5: "56490a3ac1f20a8a9b2dcc6862501f8eb64ea327fa40fb2b1cb780e809cc3d90",
            step: 226075,
            tokens: 1e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T16:01:56.041Z"),
            path: "/cpfs02/puyu/shared/alillm2/alillm2/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k/226075",
          },
          {
            md5: "9f69a0677787ab96e4ae7953343981e72c23e34a2ac0e24fa63ecbd703c2c29b",
            step: 226100,
            tokens: 1.5e7,
            isSnapshot: false,
            isDelivery: true,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T16:38:59.715Z"),
            path: "/cpfs02/puyu/shared/alillm2/alillm2/zhangshuo/ckpts/official_InternLM2.5_20B_3.1.0_4k_ReRun_32k_256k/226100",
          },
        ],
      },
    ],
  },
  {
    name: "official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak",
    type: "pretrain",
    desc: "FixBBHLeak 11.0.0",
    loadCkpt:
      "625245930fa9f4f02d2ed4a328256d0c2ef436df9fe644aeb18e68d7070749c4",
    configs: [
      {
        configContent:
          "config/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak.py",
        configPath:
          "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak.py",
        startStep: 0,
        ckpts: [
          {
            md5: "fe53e19698aa0d2985cdc0cd05ce4e52e93e4bc100f9cd49525c65b92b8a50ff",
            step: 2000,
            tokens: 5e6,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-13T11:19:28.742Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/2000",
          },
          {
            md5: "135b74dd94c997850b0f6c58d561f69caee93800fde77d540545ccbb8eeff1e8",
            step: 4000,
            tokens: 1e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-13T12:42:16.643Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/4000",
          },
          {
            md5: "951bb3c82de7a8da71a7c7df02cca7b0bc89ed9656ab50ad7ee1d0a61d0fc0bc",
            step: 6000,
            tokens: 1.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-13T14:07:18.213Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/6000",
          },
          {
            md5: "8c518405c834828d52a80201bb98259f37d2473563b42ab6f9dff9a6e03b5ad9",
            step: 8000,
            tokens: 2e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-13T15:30:30.557Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/8000",
          },
          {
            md5: "72ade9aee6eedbf2768f8b3456657104e043a6a9c9341472a322df786b9e8b67",
            step: 10000,
            tokens: 2.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-13T16:54:57.321Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/10000",
          },
          {
            md5: "62debdf5630dba195ec473973d95da0d2ea0b71ee1159e6924e2a56447ed94b8",
            step: 12000,
            tokens: 3e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-13T18:19:39.631Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/12000",
          },
          {
            md5: "aebb9f06b9864d4b11912451140d2d098de8a66f61222dfcb478df2c76cd192a",
            step: 14000,
            tokens: 3.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-13T19:44:14.930Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/14000",
          },
          {
            md5: "63c2677c593c5aeb8e44aa2a79c67ca158a904645ba0af5c629296ca3c08ca2d",
            step: 16000,
            tokens: 4e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-13T21:09:03.671Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/16000",
          },
          {
            md5: "e50cae612ac1a8c96809f3675f3278edccfd3d1d69aa3005e3c7a6b0cec9aee1",
            step: 18000,
            tokens: 4.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-13T22:33:25.867Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/18000",
          },
          {
            md5: "24d2df298dbe0fb758e711a3c2c33776b6e4e41bcc64f0aa4c06efb00c44770d",
            step: 20000,
            tokens: 5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-13T23:57:20.174Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/20000",
          },
          {
            md5: "d827d648783aceac3228a1cd3a17d023b5d3aff4c13bdd8ba013a35e0d5b1680",
            step: 22000,
            tokens: 5.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T01:24:52.072Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/22000",
          },
          {
            md5: "dda22f16a8491105e6d1ba0bacd904676986fcaaf898a6880bc95956a2e0d7e4",
            step: 24000,
            tokens: 6e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T02:49:55.588Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/24000",
          },
          {
            md5: "a8e1fd80a9fe874a21927ef8c3bf9af3866e554d78de2a07409dda8d295e93fb",
            step: 26000,
            tokens: 6.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T04:12:49.121Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/26000",
          },
          {
            md5: "93d8535ce8f23d959d1cf9d02c0ba8c70da998517c2eaa6a77cc0f1fe4ebcd3c",
            step: 28000,
            tokens: 7e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T05:37:55.987Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/28000",
          },
          {
            md5: "05ed2c622333913e62559258a6c75e357a5c824445f88a7a0c3b87030928b716",
            step: 30000,
            tokens: 7.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T07:00:34.020Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/30000",
          },
          {
            md5: "5b9bcedfc4a4547d5ad210ef87e6ff6930ab9bbff069d0f5b70d08c9957ec968",
            step: 32000,
            tokens: 8e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T08:25:23.825Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/32000",
          },
          {
            md5: "80a34a66035ee4f58ce3cfc02c7ce470799a3dbfb830e5dd66f7fbf43d9a418d",
            step: 34000,
            tokens: 8.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T09:48:35.107Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/34000",
          },
          {
            md5: "4ac42798a519ac55fd82808ba9864f6bdb797b36405e317dd26515995e4200ba",
            step: 36000,
            tokens: 9e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T11:11:44.738Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/36000",
          },
          {
            md5: "dd8e63992c3c7dd121d9a9705ae0abe956c395ad230ab2f82ebf6b688d39b850",
            step: 38000,
            tokens: 9.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T12:34:53.081Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_11.0.0_32k_FixBBHLeak/38000",
          },
        ],
      },
    ],
  },
  {
    name: "official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak",
    type: "pretrain",
    desc: "FixBBHLeak 18.0.0",
    loadCkpt:
      "9f69a0677787ab96e4ae7953343981e72c23e34a2ac0e24fa63ecbd703c2c29b",
    configs: [
      {
        configContent:
          "config/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak.py",
        configPath:
          "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak.py",
        startStep: 0,
        ckpts: [
          {
            md5: "dff5b8e91fc8b4a63fa1bd582b3376221095d3e2ffb006acb09f7d3ffc7553d7",
            step: 2000,
            tokens: 5e6,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T21:11:28.751Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/2000",
          },
          {
            md5: "1e065a81339ee840a085f198760f96a5238ccc46f8f9815a2d5e8323e9ef7d98",
            step: 4000,
            tokens: 1e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-14T22:41:15.984Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/4000",
          },
          {
            md5: "b7d6a8ec2073c9ccae6514bf7eb4def49f6d7cedee3cb72fc5f5f1846db0c594",
            step: 6000,
            tokens: 1.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T00:10:25.013Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/6000",
          },
          {
            md5: "a973df7ee60e3691b26c3ebe7f5dc0ab9d4d286cb12f083426b93cc439f29752",
            step: 8000,
            tokens: 2e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T01:41:32.403Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/8000",
          },
          {
            md5: "15f81006777fbd752648e1f76b4162631772c19941edcaa944f93631c223d18f",
            step: 10000,
            tokens: 2.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T03:09:40.363Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/10000",
          },
          {
            md5: "21920d17b7422c5d1a71a5741a8b38cdae03560d7f38f8b162b7e2d9401b5e30",
            step: 12000,
            tokens: 3e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T04:38:27.903Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/12000",
          },
          {
            md5: "983c771f63a13d2a0e8799d57da07fbb8e8df35d77f7df1dd0274a9f20af3159",
            step: 14000,
            tokens: 3.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T06:06:25.868Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/14000",
          },
          {
            md5: "76488f331384b3efb18d44754e6fb6c4d89e027df07c9ce4c852d2ca78fddced",
            step: 16000,
            tokens: 4e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T07:34:15.783Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/16000",
          },
          {
            md5: "af3717cbd41a51397dbaa7d503400c3dffa4ab8a283c9a1915361cc9f45cd5bd",
            step: 18000,
            tokens: 4.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T09:01:37.454Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/18000",
          },
          {
            md5: "99bb4e2aab48808100fbad2bfbb1fc0d5d01f58e5cb12e30644c5d8185389ffc",
            step: 20000,
            tokens: 5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T10:28:51.422Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/20000",
          },
          {
            md5: "1c4c11a75ec8a66fa0a85f4a6121cb824b56fd62d0a92a65714e9b92ea51d793",
            step: 22000,
            tokens: 5.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T13:10:17.333Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/22000",
          },
          {
            md5: "eda3614e0ed078c29b326d1e96a7cd5268172065ef19efe780ee140832e09a32",
            step: 24000,
            tokens: 6e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T14:50:00.052Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/24000",
          },
          {
            md5: "f581cad4af3a93af036d02a46d9258c06c1ad94ff8a92bacf61f7fc094088203",
            step: 26000,
            tokens: 6.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T16:35:27.633Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/26000",
          },
          {
            md5: "7f59ee7ec6efa3981b8bd67cd78a766fdf53008c8bd9c75ae4b59f8a7a87010c",
            step: 28000,
            tokens: 7e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T18:18:59.277Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/28000",
          },
          {
            md5: "72a1609e9501d638d837b3b397046bf9a44655bab336ea01773f03824d59f508",
            step: 30000,
            tokens: 7.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T19:59:13.621Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/30000",
          },
          {
            md5: "92108313e128793b943f679295ccd58e720dd8c9cd46a381edfd4414d98c338f",
            step: 32000,
            tokens: 8e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T21:40:51.410Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/32000",
          },
          {
            md5: "5d5b22f5abc345b378c627d9f2c561a959cabbc4fbc0bd237c57a26269af5e4f",
            step: 34000,
            tokens: 8.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-15T23:31:06.488Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/34000",
          },
          {
            md5: "224e498a342ff87a5fd13742b5a8f90b0e7087cf97dceb4718a4f24e19545d99",
            step: 36000,
            tokens: 9e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-16T01:21:36.037Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/36000",
          },
          {
            md5: "e53f6bed694952292a6bd57debd1b313f258c16ab583aab3e18b373814b0246a",
            step: 38000,
            tokens: 9.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-16T03:12:06.132Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/38000",
          },
          {
            md5: "71581b3ebd19a035b0165c06461aff8f57eed6c3dbba64574b9798e81e97043e",
            step: 40000,
            tokens: 1e8,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-16T04:59:48.142Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/40000",
          },
          {
            md5: "7abd66c57df19b68b2fcd72fe868552a89fd13f11f8e9b5e6384b6a229ac9519",
            step: 42000,
            tokens: 1.05e8,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-16T06:45:54.038Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/42000",
          },
          {
            md5: "5ff63301f3d4dc43fb7a5481ea1aac0168d9dcd6a6d336cf0433ceeeaadd8d9e",
            step: 44000,
            tokens: 1.1e8,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-16T08:29:48.107Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/44000",
          },
          {
            md5: "49b322c7adc323cacfc408450f6a38c5201f86dce79eeaa57a4ae66ceac56121",
            step: 46000,
            tokens: 1.15e8,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-16T10:18:26.066Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/46000",
          },
          {
            md5: "11fd9663a4071ff495ef91112fe46f49dfba881c206d91b70619f887eb75ba6e",
            step: 48000,
            tokens: 1.2e8,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-16T12:06:50.418Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/48000",
          },
          {
            md5: "784b00272eab7ef08e9e51980bd97b163bed6e9284a31bc4d67d7705622cca3e",
            step: 50000,
            tokens: 1.25e8,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-16T13:58:35.982Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak/50000",
          },
        ],
      },
    ],
  },
  {
    name: "official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak_wsd_from_50000_to_52500_5.0.0",
    type: "pretrain",
    desc: "18.0.0 wsd",
    loadCkpt:
      "784b00272eab7ef08e9e51980bd97b163bed6e9284a31bc4d67d7705622cca3e",
    configs: [
      {
        configContent:
          "config/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak_wsd_from_50000_to_52500_5.0.0.py",
        configPath:
          "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak_wsd_from_50000_to_52500_5.0.0.py",
        startStep: 50000,
        ckpts: [
          {
            md5: "50831061dcb01a01e4cc3f7d52e7528e56b4b40703b4bea1aca903f58d330ea9",
            step: 52000,
            tokens: 5e6,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-07-16T15:52:41.144Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak_wsd_from_50000_to_52500_5.0.0/52000",
          },
          {
            md5: "f0bafc261d23f7a0d35bf0e3594c8eaf8c5ffddb88255145332140d6454c5590",
            step: 52500,
            tokens: 1e7,
            isSnapshot: false,
            isDelivery: true,
            isRewardModel: false,
            saveTime: new Date("2024-07-16T16:18:44.956Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_Enhance_18.0.0_256k_FixBBHLeak_wsd_from_50000_to_52500_5.0.0/52500",
          },
        ],
      },
    ],
  },
  {
    name: "official_InternLM2.5_20B_2.0.0",
    type: "pretrain",
    desc: "pretrain 2.0.0",
    configs: [
      {
        configContent: "config/official_InternLM2.5_20B_2.0.0.py",
        configPath:
          "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_2.0.0.py",
        startStep: 79000,
        ckpts: [
          {
            md5: "796aebc9a04946ae5792e83bd06bf54d99eecf1560a9a583e8c7623a13ae5874",
            step: 80000,
            tokens: 5e6,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-04T17:21:02.906Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.0.0/80000",
          },
          {
            md5: "bcb24d0d9fa9011f4b716dfc02d0850528d71e0649143bffba201778d41f2426",
            step: 81000,
            tokens: 1e7,
            isSnapshot: true,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-04T20:57:49.251Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.0.0/snapshot/0",
          },
          {
            md5: "e6b2ea51d85f454d8cf6589127404dd74e3a4bb25fc560413f1c89f841489ccb",
            step: 82000,
            tokens: 1.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-05T00:32:56.361Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.0.0/82000",
          },
          {
            md5: "faa8aa6f971b54666bfd1ee2c5a6f941c7888f51f859cc41f605fc113c661cd4",
            step: 83000,
            tokens: 2e7,
            isSnapshot: true,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-05T04:10:46.290Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.0.0/snapshot/1",
          },
        ],
      },
    ],
  },
  {
    name: "official_InternLM2.5_20B_2.1.0",
    type: "pretrain",
    desc: "pretrain 2.1.0",
    loadCkpt:
      "faa8aa6f971b54666bfd1ee2c5a6f941c7888f51f859cc41f605fc113c661cd4",
    configs: [
      {
        configContent: "config/official_InternLM2.5_20B_2.1.0.py",
        configPath:
          "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_2.1.0.py",
        startStep: 83000,
        ckpts: [
          {
            md5: "ba1b5b22c23837304dc59ce9b9a38d2949dd83364ed4ec849edee8a69b7baafd",
            step: 84000,
            tokens: 5e6,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-05T10:02:08.308Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.1.0/84000",
          },
          {
            md5: "07d558df3e6d5affdb57f1dbc5dd8cd5a9b3eac54c3dff213e9eb96bfc23a0cb",
            step: 85000,
            tokens: 1e7,
            isSnapshot: true,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-05T13:37:48.525Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.1.0/snapshot/0",
          },
        ],
      },
    ],
  },
  {
    name: "official_InternLM2.5_20B_2.2.0",
    type: "pretrain",
    desc: "pretrain 2.2.0",
    loadCkpt:
      "07d558df3e6d5affdb57f1dbc5dd8cd5a9b3eac54c3dff213e9eb96bfc23a0cb",
    configs: [
      {
        configContent: "config/official_InternLM2.5_20B_2.2.0.py",
        configPath:
          "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_2.2.0.py",
        startStep: 85000,
        ckpts: [
          {
            md5: "4a1598153ab49e33930bbf10af693535b52424422e2effadd722d2219008e70e",
            step: 86000,
            tokens: 5e6,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-05T18:27:36.365Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0/86000",
          },
          {
            md5: "9420694382f62bc1072c347588ba9bce2af0948958ad9cceefdf3b48462cfb1d",
            step: 88000,
            tokens: 1e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-06T01:38:40.555Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0/88000",
          },
          {
            md5: "2fb7e6373edfb5362d58a2ad39f53a08f14617fe828ab34be803b10e73136d44",
            step: 90000,
            tokens: 1.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-06T08:48:40.688Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0/90000",
          },
          {
            md5: "cc2f9c67d82879ace334cc7efeb10f00dd31bdc1e4ca35b3d58b0d57c9dbbbf3",
            step: 92000,
            tokens: 2e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-06T15:58:39.019Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0/92000",
          },
          {
            md5: "5d8a5ead0b06ddf48725dd3e8e95977a64bb3d0654d803f305944009787355a0",
            step: 94000,
            tokens: 2.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-06T23:07:53.282Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0/94000",
          },
          {
            md5: "4915bd29fc59a91e0b2e6b62ef93cdc097d1edee0b43aa77bf27b2a32021d21f",
            step: 96000,
            tokens: 3e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-07T06:18:01.330Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0/96000",
          },
          {
            md5: "695da02f030e37c215e76e6805b37325aaa8c20a367f192da3ff9190b5574062",
            step: 98000,
            tokens: 3.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-07T13:28:46.512Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0/98000",
          },
        ],
      },
    ],
  },
  {
    name: "official_InternLM2.5_20B_2.2.0_with_layer_freeze",
    type: "pretrain",
    desc: "pretrain 2.2.0 layer freeze",
    loadCkpt:
      "07d558df3e6d5affdb57f1dbc5dd8cd5a9b3eac54c3dff213e9eb96bfc23a0cb",
    configs: [
      {
        configContent:
          "config/official_InternLM2.5_20B_2.2.0_with_layer_freeze.py",
        configPath:
          "/ailab_internlm_data/share_data/zhangshuo/codes/train/official_20240513/configs/InternLM2.5/official_InternLM2.5_20B_2.2.0_with_layer_freeze.py",
        startStep: 85000,
        ckpts: [
          {
            md5: "71fd11e18b5f95c8b676e9047e5babc6a1a087d021413ee4cf13b1b6ba4639ba",
            step: 86000,
            tokens: 5e6,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-11T17:50:25.308Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0_with_layer_freeze/86000",
          },
          {
            md5: "59aeee70f7768b905a6dc4219102ed2bf947374ac0214c3ad7670dae308a2795",
            step: 88000,
            tokens: 1e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-11T22:14:32.014Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0_with_layer_freeze/88000",
          },
          {
            md5: "774fe76d29fa91a3d4e1ac3c8185d461d7f9622f2279127102e1ed76608a8184",
            step: 90000,
            tokens: 1.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-12T02:39:25.511Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0_with_layer_freeze/90000",
          },
          {
            md5: "56d73cf1c017bbfe5b3fa8ad0f8478a4c2c217a358faf5bcd7adaa5e20c7ffd1",
            step: 92000,
            tokens: 2e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-12T07:04:00.633Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0_with_layer_freeze/92000",
          },
          {
            md5: "87ddfa4361bc124a3dec49e1c03e01401dcdc5c3c0f3ef986c679d4fadf1801a",
            step: 94000,
            tokens: 2.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-12T11:28:10.649Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0_with_layer_freeze/94000",
          },
          {
            md5: "e1a95b3fc55da35efa56e341a2fcb240d6eed18a8c32ef35f9ebbac63c1b4eb5",
            step: 96000,
            tokens: 3e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-12T15:51:58.571Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0_with_layer_freeze/96000",
          },
          {
            md5: "15adc071712b4d11390fd9a720de1bd02daa728913369a0f8aa7b902f505430a",
            step: 98000,
            tokens: 3.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-12T20:15:49.356Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0_with_layer_freeze/98000",
          },
          {
            md5: "e003fc26078261c0f02a09d347baed95f61868b807c5778d3d0ade088374ee6f",
            step: 100000,
            tokens: 4e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-13T00:41:41.237Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0_with_layer_freeze/100000",
          },
          {
            md5: "90a609f91f37740350a7e7f6c470b46795b20bc81a79b09331894e2eaa8dcb52",
            step: 102000,
            tokens: 4.5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-13T05:07:19.130Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0_with_layer_freeze/102000",
          },
          {
            md5: "a8d2cf4dc1b0fd5a3bded81a6d8e24e6253ba69c7e3f87c23cfdbe454a2f458f",
            step: 104000,
            tokens: 5e7,
            isSnapshot: false,
            isDelivery: false,
            isRewardModel: false,
            saveTime: new Date("2024-06-13T09:33:01.394Z"),
            path: "/ailab_internlm_data/share_data/zhangshuo/ckpts/official_InternLM2.5_20B_2.2.0_with_layer_freeze/104000",
          },
        ],
      },
    ],
  },
];

async function readContentAsync(relativePath: string): Promise<string> {
  try {
    const absolutePath = join(
      fileURLToPath(dirname(import.meta.url)),
      relativePath,
    );
    const data = await readFile(absolutePath, "utf8");
    return data;
  } catch (error) {
    console.error("读取文件出错:", error);
    throw error;
  }
}

export async function seed(db: Database) {
  const taskCollection = db.collection("TrainTask");
  const configCollection = db.collection("TrainConfig");
  const ckptCollection = db.collection("Checkpoint");
  const stepCollection = db.collection("CkptStep");
  const resumeCollection = db.collection("ResumeCkpt");

  const trx = await db.beginTransaction([
    taskCollection,
    configCollection,
    ckptCollection,
    stepCollection,
    resumeCollection,
  ]);

  const resumeMap = new Map<string, string[]>();
  let allCkptMap = new Map<string, string>();
  let lastCkpt = {
    _id: "",
    step: 0,
    tokens: 0,
    saveTime: new Date(),
  };
  for (const { loadCkpt, configs, ...task } of graph) {
    const savingTask = new model.TrainTask(
      "_key",
      "_id",
      "_rev",
      task.name,
      task.type as "pretrain" | "sft" | "rlhf_rm" | "rlhf_ppo",
      task.desc,
    );
    const savedTask = <model.TrainTask>(
      await trx.step(() =>
        taskCollection.save(savingTask.saveDocument, { returnNew: true }),
      )
    );
    const configMap = new Map<string, string[]>();
    const ckptMap = new Map<string, string>();
    if (loadCkpt) {
      if (allCkptMap.has(loadCkpt)) {
        trx.step(() =>
          resumeCollection.save({
            _from: allCkptMap.get(loadCkpt)!,
            _to: savedTask._id,
          }),
        );
      } else if (resumeMap.has(loadCkpt)) {
        const resumeTask = resumeMap.get(loadCkpt)!;
        resumeTask.push(savedTask._id);
        resumeMap.set(loadCkpt, resumeTask);
      } else {
        resumeMap.set(loadCkpt, [savedTask._id]);
      }
    }
    for (const { ckpts, ...config } of configs) {
      const configContent = await readContentAsync(config.configContent);
      let savedConfig = new model.TrainConfig(
        "_key",
        "_id",
        "_rev",
        savedTask._id,
        configContent,
        config.startStep,
      );
      if ("loadCkpt" in config) {
        const configLoadCkpt = config.loadCkpt;
        savedConfig = <model.TrainConfig>await trx.step(() =>
          configCollection.save(savedConfig.saveDocument, {
            returnNew: true,
          }),
        );
        if (configLoadCkpt) {
          if (allCkptMap.has(configLoadCkpt)) {
            throw new Error(
              `${config.configPath} should not be resumed from checkpoint ${configLoadCkpt}, but a checkpoint under task ${savedTask.name}.`,
            );
          } else if (ckptMap.has(configLoadCkpt)) {
            trx.step(() =>
              resumeCollection.save({
                _from: ckptMap.get(configLoadCkpt)!,
                _to: savedConfig._id,
              }),
            );
          } else if (configMap.has(configLoadCkpt)) {
            const resumeConfig = configMap.get(configLoadCkpt)!;
            resumeConfig.push(savedConfig._id);
            configMap.set(configLoadCkpt, resumeConfig);
          } else {
            configMap.set(configLoadCkpt, [savedConfig._id]);
          }
        }
      } else {
        savedConfig = <model.TrainConfig>await trx.step(() =>
          configCollection.save(savedConfig.saveDocument, {
            returnNew: true,
          }),
        );
        trx.step(() =>
          resumeCollection.save({
            _from: savedTask._id,
            _to: savedConfig._id,
          }),
        );
      }

      lastCkpt = {
        _id: savedConfig._id,
        step: savedConfig.startStep || 0,
        tokens: 0,
        saveTime: new Date(), // startTime from TrainProc
      };

      ckpts.sort((a, b) => a.step - b.step);
      for (const { tokens, ...ckpt } of ckpts) {
        const savingCkpt = new model.Checkpoint(
          "_key",
          "_id",
          "_rev",
          ckpt.md5,
          savedConfig._id,
          ckpt.step,
          ckpt.path,
          "saveTime" in ckpt ? ckpt.saveTime : new Date(),
          "isSnapshot" in ckpt ? ckpt.isSnapshot : false,
          "isDelivery" in ckpt ? ckpt.isDelivery : false,
          "isRewardModel" in ckpt ? ckpt.isRewardModel : false,
        );
        const savedCkpt = <model.Checkpoint>(
          await trx.step(() =>
            ckptCollection.save(savingCkpt.saveDocument, { returnNew: true }),
          )
        );
        trx.step(() =>
          stepCollection.save({
            _from: lastCkpt._id,
            _to: savedCkpt._id,
            steps: ckpt.step - lastCkpt.step,
            tokens: tokens - lastCkpt.tokens,
            duration: moment.duration(
              moment(savingCkpt.saveTime).diff(moment(lastCkpt.saveTime)),
            ),
          }),
        );
        ckptMap.set(ckpt.md5, savedCkpt._id);
        if (resumeMap.has(ckpt.md5)) {
          for (const taskId in resumeMap.get(ckpt.md5)) {
            trx.step(() =>
              resumeCollection.save({
                _from: savedCkpt._id,
                _to: taskId,
              }),
            );
          }
        }
        if (configMap.has(ckpt.md5)) {
          for (const configId in configMap.get(ckpt.md5)) {
            trx.step(() =>
              resumeCollection.save({
                _from: savedCkpt._id,
                _to: configId,
              }),
            );
          }
        }
        lastCkpt = {
          _id: savedCkpt._id,
          step: savingCkpt.step,
          tokens: tokens,
          saveTime: savingCkpt.saveTime,
        };
      }
    }
    allCkptMap = new Map<string, string>([...allCkptMap, ...ckptMap]);
  }
  await trx.commit();
}

# 来源池与证据索引

全部链接于 2026-10-22 通过网页检索并打开或读取返回正文。文章中的引用编号与下列一致。优先选官方文档、原始仓库和论文。

| 编号 | 原始来源 | 用途 |
|---|---|---|
| 1 | https://huggingface.co/docs/lerobot/il_robots | 真机示教、训练、部署，≥50 条入门建议 |
| 2 | https://huggingface.co/docs/lerobot/main/cheat-sheet | 相机查找、标定、遥操作与记录命令 |
| 3 | https://huggingface.co/docs/lerobot/cameras | 相机标识变化、帧读取与新鲜度 |
| 4 | https://huggingface.co/docs/lerobot/main/action_representations | 关节/末端、绝对/相对/逐步增量动作 |
| 5 | https://huggingface.co/docs/lerobot/main/api/datasets | 数据格式、fps、元数据与容差 |
| 6 | https://huggingface.co/docs/lerobot/v0.6.0/en/smolvla | VLA 输入、微调示例与 50 条起步建议 |
| 7 | https://huggingface.co/docs/lerobot/main/inference | 真机 rollout、DAgger、RTC、节拍报告 |
| 8 | https://huggingface.co/docs/lerobot/main/remote_inference | 机器人端和 GPU 端分离、异步推理 |
| 9 | https://huggingface.co/docs/lerobot/main/rtc | 动作块连续执行与延迟约束 |
| 10 | https://github.com/Physical-Intelligence/openpi/blob/main/examples/aloha_real/README.md | π0/π0.5 ALOHA 真机示例、任务初态限制 |
| 11 | https://github.com/Physical-Intelligence/openpi/blob/main/docs/norm_stats.md | 状态/动作归一化与统计选择 |
| 12 | https://github.com/Physical-Intelligence/openpi/blob/main/examples/aloha_real/env.py | 真机 observation 预处理和 action 发送实例 |
| 13 | https://github.com/openvla/openvla/blob/main/vla-scripts/deploy.py | 推理服务及 unnorm_key |
| 14 | https://github.com/openvla/openvla/blob/main/experiments/robot/bridge/run_bridgev2_eval.py | Bridge 真机评测循环 |
| 15 | https://isaac-sim.github.io/IsaacLab/main/source/policy_deployment/index.html | Isaac Lab 仿真到真机目录 |
| 16 | https://isaac-sim.github.io/IsaacLab/main/source/policy_deployment/02_gear_assembly/gear_assembly_policy.html | UR10e 齿轮装配 sim2real 实例 |
| 17 | https://isaac-sim.github.io/IsaacLab/main/source/concepts/actuators.html | 执行器时延、增益、饱和模型 |
| 18 | https://isaac-sim.github.io/IsaacLab/develop/source/how-to/transfer_policies_between_physx_and_newton.html | 合理随机化范围和跨引擎验证 |
| 19 | https://frankaemika.github.io/docs/overview.html | 高层策略与 1kHz 控制器分层 |
| 20 | https://frankaemika.github.io/docs/libfranka.html | 速率限制、碰撞信号与安全局限 |
| 21 | https://moveit.picknik.ai/main/doc/examples/realtime_servo/realtime_servo_tutorial.html | 碰撞、奇异位形、关节限位 |
| 22 | https://docs.universal-robots.com/tutorials/controlling-robot-externally/stop-recovery.html | 保护停机与急停区分 |
| 23 | https://docs.opencv.org/3.4.11/d9/d0c/group__calib3d.html | 手眼标定接口与方向 |
| 24 | https://github.com/ros2/ros2_documentation/blob/rolling/source/ROS-Framework/interfaces/About-Tf2/About-Tf2.rst | 坐标变换树 |
| 25 | https://github.com/realsenseai/librealsense/blob/master/examples/multicam/readme.md?plain=1 | 多相机序列号绑定 |
| 26 | https://github.com/droid-dataset/droid | 多站点真实采集平台搭建 |
| 27 | https://arxiv.org/abs/2403.12945 | DROID 真机数据规模与变化性 |
| 28 | https://arxiv.org/abs/2303.04137 | Diffusion Policy 的滚动时域执行 |
| 29 | https://github.com/tonyzhaozh/act/blob/main/imitate_episodes.py | ACT 真机动作块与时间聚合实现 |
| 30 | https://huggingface.co/docs/lerobot/main/en/bring_your_own_policies | 真实成功率及复现报告要求 |

来源覆盖：系统硬件与安全（19–25）、数据与模型（1–14, 26–29）、sim2real（15–18）、评估与复现（7, 14, 30）。

## 真机修订新增主证据（2026-10-22）

| 31–32 | https://docs.nvidia.com/learning/physical-ai/sim-to-real-so-101/latest/index.html ; https://github.com/isaac-sim/Sim-to-Real-SO-101-Workshop | 官方端到端 VLA 仿真→真机课程与代码 |
| 33 | https://docs.nvidia.com/learning/physical-ai/sim-to-real-so-101/latest/datasets-and-models.html | 75 条仿真数据及官方 checkpoint；混合数据数目描述不一致需核对 |
| 34–35 | https://docs.nvidia.com/learning/physical-ai/sim-to-real-so-101/latest/05-building-workspace.html ; https://docs.nvidia.com/learning/physical-ai/sim-to-real-so-101/latest/07-calibrating-so101.html | 台面、相机、5V/12V 电源、标定与端口 |
| 36 | https://github.com/NVIDIA/Isaac-GR00T/blob/main/examples/SO100/README.md | 独立的 N1.7 SO101 微调/运行配方 |
| 37–38 | https://docs.nvidia.com/learning/physical-ai/sim-to-real-so-101/latest/09-strategy1-dr-teleop.html ; https://docs.nvidia.com/learning/physical-ai/sim-to-real-so-101/latest/10-groot.html | 仿真示教、数据转换、N1.6 训练 |
| 39 | https://github.com/nairb36/so101-sim2real/blob/main/experiments/baseline.md | 20 sim + 20 real 独立真机记录与相机修复 |
| 40–41 | https://docs.nvidia.com/learning/physical-ai/sim-to-real-so-101/latest/troubleshooting.html ; https://github.com/huggingface/lerobot/blob/main/docs/source/so101.mdx | 电机、相机、校准具体故障及配置 |
| 42–43 | https://github.com/isaac-sim/IsaacLabTutorial/blob/main/docs/SIM2REAL.md ; https://github.com/NVIDIA/Isaac-GR00T/blob/main/getting_started/data_config.md | 非 VLA 控制迁移实操案例及 GR00T modality 契约 |
| 44–47 | https://github.com/huggingface/lerobot/blob/main/docs/source/il_robots.mdx ; https://github.com/isaac-sim/Sim-to-Real-SO-101-Workshop/blob/main/docker/real/scripts/so101_eval.py ; https://github.com/isaac-sim/Sim-to-Real-SO-101-Workshop/blob/main/docker/real/scripts/so101_control.py ; https://github.com/NVIDIA/Isaac-GR00T/blob/main/getting_started/real_world_deployment.md | 真实录制节拍、真机客户端源码审计、闭环工程指南 |
| 48–50 | https://docs.nvidia.com/learning/physical-ai/sim-to-real-so-101/latest/11-sim-evaluation.html ; https://docs.nvidia.com/learning/physical-ai/sim-to-real-so-101/latest/12-real-evaluation.html ; https://huggingface.co/datasets/sreetz-nv/so101_teleop_vials_rack_left/resolve/main/meta/info.json | 仿真/真机命令与原始相机键核对 |

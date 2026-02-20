export const SIMVLA = {
  title: "SimVLA: A Simple VLA Baseline for Robotic Manipulation",
  authors: "Yuankai Luo, Woping Chen, Tong Liang, Baiqiao Wang, Zhenguo Li*",
  tagline:
    "A streamlined Vision-Language-Action (VLA) baseline for robotic manipulation, designed for transparency and reproducibility.",
  abstract:
    "Vision-Language-Action (VLA) models have emerged as a promising paradigm for general-purpose robotic manipulation, leveraging large-scale pre-training to achieve strong performance. The field has rapidly evolved with additional spatial priors and diverse architectural innovations. However, these advancements are often accompanied by varying training recipes and implementation details, which can make it challenging to disentangle the precise source of empirical gains.\n\nIn this work, we introduce SimVLA, a streamlined baseline designed to establish a transparent reference point for VLA research. By strictly decoupling perception from control—using a standard vision-language backbone and a lightweight action head—and standardizing critical training dynamics, we demonstrate that a minimal design can achieve state-of-the-art performance. Despite having only 0.5B parameters, SimVLA outperforms multi-billion-parameter models on standard simulation benchmarks without robot pretraining. SimVLA also reaches on-par real-robot performance compared to π0.5. Our results establish SimVLA as a robust, reproducible baseline that enables clear attribution of empirical gains to future architectural innovations.",
  contributions: [
    {
      title: "Modular Design",
      content:
        "We propose SimVLA, a modular VLA baseline that decouples perception from control, enabling a flexible and future-proof design that can easily adapt to new vision-language backbones.",
      icon: "cube",
      color: "indigo",
    },
    {
      title: "Standardized Recipe",
      content:
        "We identify and standardize the “silent” drivers of VLA performance—specifically data shuffling, normalization, and optimization dynamics—providing a rigorous training recipe that enables fair cross-model comparisons.",
      icon: "document-text",
      color: "emerald",
    },
    {
      title: "SOTA Performance",
      content:
        "We show that this minimal design achieves state-of-the-art performance, surpassing larger and more complex models on simulation benchmarks while enabling efficient real-robot transfer with zero-shot scene generalization.",
      icon: "chart-bar",
      color: "amber",
    },
  ],
  figures: {
    architecture: {
      src: "/paper/fig1.png",
      width: 690,
      height: 368,
      alt: "SimVLA architecture overview diagram.",
      caption:
        "SimVLA overview. SimVLA is a minimal baseline: a VLM encoder produces fused vision-language tokens once per control step, and a lightweight action transformer performs flow-matching denoising to generate a continuous action chunk.",
    },
    realRobotExamples: {
      src: "/paper/real1.jpg",
      width: 5476,
      height: 4164,
      alt: "Out-of-box real-robot task examples of SimVLA.",
      caption:
        "Out-of-box real-robot task examples. We deploy SimVLA without any additional fine-tuning on held-out scenes and evaluate it on multi-stage tasks that require both dexterous manipulation and semantic understanding.",
    },
    realRobotResults: {
      src: "/paper/galaxea_zero_shot.png",
      width: 1343,
      height: 543,
      alt: "Zero-shot real-robot results plot on Galaxea R1 Lite.",
      caption: "Real-robot zero-shot results on Galaxea R1 Lite.",
    },
    realRobotExtra: {
      src: "/paper/real.jpg",
      width: 5476,
      height: 4164,
      alt: "Additional real-robot deployment snapshots.",
      caption: "Additional real-robot deployment snapshots (from the paper assets).",
    },
    successReason: {
      src: "/paper/success-reason.jpg",
      width: 1600,
      height: 900,
      alt: "Training and inference recipe success factors.",
      caption: "Key success factors for VLA training: standardization of action representation, data handling, optimization dynamics, and architecture configuration.",
    },
  },
  trainingRecipe: {
    title: "Training and Inference Recipe",
    intro:
      "A central takeaway of this work is that strong VLA performance can often be achieved through careful standardization of training and inference details, even with minimal architectural design. In practice, we find that several seemingly minor choices can dominate performance differences if left under-specified. Accordingly, we explicitly control and report the following factors across all experiments.",
    points: [
      {
        title: "Action Representation and Normalization",
        icon: "chart-bar",
        color: "blue",
        content:
          "We train the flow model in a normalized continuous action space, using per-dimension statistics computed from the training set. Proprioceptive states are normalized when applicable to improve optimizer conditioning. We predict action chunks of horizon H and execute them in a receding-horizon manner; we emphasize that the choice of H is a major performance knob and must be tuned per benchmark.",
      },
      {
        title: "Data Handling",
        icon: "database",
        color: "emerald",
        content:
          "Beyond action chunking, we carefully control data shuffling during training. Since demonstration trajectories exhibit strong temporal correlations, improper shuffling can lead to brittle optimization and poor long-horizon generalization. We find that consistent shuffling is critical for stable training and fair benchmarking.",
      },
      {
        title: "Optimization Dynamics",
        icon: "lightning-bolt",
        color: "amber",
        content:
          "We systematically sweep learning rates, warm-up schedules, and learning rate schedulers while keeping batch size and total training steps fixed across comparisons. Notably, we observe that learning rate selection alone can overshadow architectural differences if not properly tuned, underscoring the importance of reporting optimization details for reproducibility.",
      },
      {
        title: "Architecture Configuration",
        icon: "cube",
        color: "fuchsia",
        content:
          "While SimVLA employs a minimal action head by default, we ablate action transformer scale, VLM backbone choice, and information injection mechanisms (token concatenation, cross-attention, and conditional normalization). We view these variations as implementation choices rather than architectural novelties, and we report them to contextualize performance differences.",
      },
    ],
  },
  ablationStudies: {
    title: "Key Findings",
    intro:
      "Table 6 highlights a few dominant knobs that largely determine performance.",
    points: [
      {
        title: "Data shuffling and normalization are critical.",
        icon: "database",
        color: "emerald",
        content:
          "Disabling either shuffling or action normalization causes a near-collapse in performance, suggesting that stable optimization and consistent action scaling are prerequisites for a strong baseline.",
      },
      {
        title: "Optimization dynamics dominate.",
        icon: "lightning-bolt",
        color: "amber",
        content:
          "The learning rate must be tuned: too large (5×10⁻⁴) degrades sharply, while too small (5×10⁻⁵) also underperforms. Likewise, removing the small VLM learning-rate multiplier hurts substantially, indicating that preserving the pretrained backbone is important.",
      },
      {
        title: "Some architecture choices matter, but are secondary.",
        icon: "cube",
        color: "indigo",
        content:
          "Scaling down the action head (large→small) only slightly reduces performance, whereas alternative conditioning mechanisms (AdaLN / cross-attention) are noticeably worse than simple token concatenation under our setup.",
      },
    ],
  },
  tables: [
    {
      id: "table1",
      title: "Performance and efficiency summary",
      description:
        "Representative example comparing LIBERO average success and peak training VRAM under a matched setup.",
      src: "/paper/Table1.png",
      width: 717,
      height: 234,
      alt: "Performance and efficiency summary.",
      caption:
        "Performance and efficiency summary. We report LIBERO success (%) and peak training VRAM at Batch=8 (GB) under a matched evaluation setup.",
    },
    {
      id: "table2",
      title: "Comparison on the LIBERO benchmark",
      description:
        "Success rate (%) on the official test episodes for each suite (Spatial/Object/Goal/Long) and the overall average.",
      src: "/paper/Table2.png",
      width: 714,
      height: 842,
      alt: "Comparison on the LIBERO benchmark.",
      caption:
        "Comparison on the LIBERO benchmark. We report the success rate (%) on the official test episodes for each suite (Spatial/Object/Goal/Long), and the overall average across the four suites.",
    },
    {
      id: "table3",
      title: "Robustness on the LIBERO-PRO benchmark",
      description:
        "Robustness under perturbations across five dimensions: Ori / Obj / Pos / Sem / Task.",
      src: "/paper/Table3.png",
      width: 698,
      height: 437,
      alt: "Robustness evaluation on the LIBERO-PRO benchmark.",
      caption:
        "Robustness evaluation on the LIBERO-PRO benchmark. We report success rate (%) across five perturbation dimensions: Original (Ori), Object (Obj), Position (Pos), Semantic (Sem), and Task (Task).",
    },
    {
      id: "table4",
      title: "Comparison on WidowX robot tasks",
      description: "Success rates (%) across representative WidowX tasks.",
      src: "/paper/Table4.png",
      width: 701,
      height: 662,
      alt: "Comparison on WidowX robot tasks.",
      caption: "Comparison on WidowX robot tasks; success rates (%).",
    },
    {
      id: "table5",
      title: "Comparison on Google Robot tasks",
      description:
        "Success rates (%) on three tasks and the overall average.",
      src: "/paper/Table5.png",
      width: 660,
      height: 627,
      alt: "Comparison on Google Robot tasks.",
      caption: "Comparison on Google Robot tasks; success rates (%).",
    },
    {
      id: "table6",
      title: "Ablations on LIBERO",
      description:
        "Each row corresponds to one ablation setting with the remaining knobs fixed to the default configuration.",
      src: "/paper/Table6.png",
      width: 1400,
      height: 600,
      alt: "Table 6. Ablations on LIBERO.",
      caption:
        "Table 6. Ablations on LIBERO. Each row corresponds to one ablation setting with the remaining knobs fixed to the default configuration.",
    },
  ],
  highlights: [
    {
      title: "Strict perception–control decoupling",
      description:
        "A standard vision-language backbone + a lightweight action head, with training dynamics kept explicit and comparable.",
    },
    {
      title: "Strong results with a minimal design",
      description:
        "Despite being small (0.5B params), SimVLA is competitive in simulation and reaches on-par real-robot performance.",
    },
    {
      title: "A reproducible baseline for the community",
      description:
        "A transparent reference point that makes it easier to attribute gains to future architectural innovations.",
    },
  ],
  bibtex: `@article{simvla2026,
  title   = {SimVLA: A Simple VLA Baseline for Robotic Manipulation},
  author  = {Yuankai Luo and Woping Chen and Tong Liang and Baiqiao Wang and Zhenguo Li},
  year    = {2026},
  url     = {https://frontierrobo.github.io/SimVLA},
}`,
} as const;


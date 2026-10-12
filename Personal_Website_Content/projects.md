# Projects
<section class="project-hero">

## Autoregressive and Masked Audio Language Modeling

<p class="project-hero-note">Token-based audio generation, built on the same paradigm as LLMs.</p>

<div class="project-map">

<div class="flow-diagram">
<div class="flow-stage flow-stage--sft">
<div class="flow-stage-title">Autoregressive</div>
<div class="flow-row flow-row--h">
<a class="flow-node" href="https://arxiv.org/abs/2411.01135" target="_blank" rel="noopener"><span class="flow-node-tag">Hierarchical AR Music Generative Backbone</span>SoniDo<br>TMLR'25</a>
<div class="flow-arrow flow-arrow--h"><span>Symbolic</span></div>
<a class="flow-node" href="#"><span class="flow-node-tag">Unified Transcription and Rendering AR Model</span>PianoPoet<br>Tech Report '26</a>
</div>
</div>
<div class="flow-stage flow-stage--pre">
<div class="flow-stage-title">Masked</div>
<div class="flow-row flow-row--1">
<a class="flow-node" href="https://arxiv.org/abs/2305.06701" target="_blank" rel="noopener"><span class="flow-node-tag">BERT-style Masked Audio Modeling</span>Extended Audio MAE<br>WASPAA'23</a>
</div>
<div class="flow-arrow"><span>Generative</span></div>
<div class="flow-row flow-row--1">
<a class="flow-node flow-node--core" href="https://arxiv.org/abs/2406.17672" target="_blank" rel="noopener"><span class="flow-node-tag">Text-to-audio</span>SpecMaskGIT<br>ISMIR'24</a>
</div>
<div class="flow-arrow"></div>
<div class="flow-row flow-row--3">
<a class="flow-node" href="https://arxiv.org/abs/2405.14598" target="_blank" rel="noopener"><span class="flow-node-tag">Unified Audio-Visual Mutual Generation and Editing</span>Visual Echoes<br>Tech Report '24</a>
<a class="flow-node" href="https://arxiv.org/abs/2510.25228" target="_blank" rel="noopener"><span class="flow-node-tag">Human-AI</span>Studies for<br>NeurIPS'25</a>
<div class="flow-col">
<a class="flow-node" href="https://arxiv.org/abs/2505.16195" target="_blank" rel="noopener"><span class="flow-node-tag">Video Control</span>SpecMaskFoley<br>WASPAA'25</a>
<div class="flow-arrow"></div>
<a class="flow-node" href="https://arxiv.org/abs/2609.27489" target="_blank" rel="noopener"><span class="flow-node-tag">Human-AI</span>Passing<br>NeurIPS'26 Creative AI</a>
</div>
</div>
</div>
</div>

</div>

<div class="project-paper-grid">

<div class="project-paper-card project-thread-card--wide">

### [PianoPoet](publications.html#pianopoet)

<p class="project-paper-meta">Tech Report 2026</p>

Unifies piano transcription and rendering, two distinct and challenging tasks, via autoregressive modeling without compromising performance on either task. A transcribe-then-render strategy also enables zero-shot historical music restoration, suggesting that new capabilities can emerge from interactions among existing functions.

</div>

<div class="project-paper-card project-thread-card--wide">

### [SpecMaskGIT](publications.html#specmaskgit)

<p class="project-paper-meta">ISMIR 2024</p>

The core masked generative backbone in this thread, built for real-time audio synthesis.

</div>

<div class="project-paper-card">

### [Studies for: A Human-AI Co-Creative Sound Artwork](publications.html#studies-for)

<p class="project-paper-meta">NeurIPS 2025</p>

An artistic and research outcome based on SpecMaskGIT. Across 3 months, the installation kept generating audio in real-time following the artist's instruction.

<ul class="award-highlights">
<li><strong>Winner:</strong> <a href="https://aica-awards.com/2025/">AI Creative Future Awards 2025</a></li>
<li><strong>Nominator:</strong> Ars Electronica's <a href="https://archive.aec.at/startsprize/">STARTS award archive</a></li>
</ul>

</div>

<div class="project-paper-card">

### [Passing: An Endless Journey through Reconstructed Spacetime with AI-Generated Sound](publications.html#passing)

<p class="project-paper-meta">NeurIPS 2026 Creative AI Track</p>

An interactive audiovisual installation where SpecMaskFoley acts as a real-time sound generator for an endless, viewer-responsive video journey.

</div>

<div class="project-paper-card">

### [Visual Echoes](publications.html#visual-echoes)

<p class="project-paper-meta">Tech Report 2024</p>

Unified audio-visual generative modeling via MaskGIT, enabling zero-shot in- and out-painting for audio-to-image and image-to-audio generation.

</div>

<div class="project-paper-card">

### [SpecMaskFoley](publications.html#specmaskfoley)

<p class="project-paper-meta">WASPAA 2025</p>

Adding a ControlNet branch to pretrained SpecMaskGIT, tuned with 1 GPU, achieving temporally aligned video-to-audio generation at real-time.

</div>

</div>

</section>

<section class="project-hero">

## Representation Learning and Multi-modal LLM

<p class="project-hero-note">Semantic encoders as the universal frontend, lightweight DNN or LLM as the backend.</p>

<div class="project-map">

<div class="flow-diagram">
<div class="flow-stage flow-stage--pre">
<div class="flow-stage-title">Semantic Encoder</div>
<div class="flow-row flow-row--2">
<a class="flow-node" href="https://arxiv.org/abs/2411.01135" target="_blank" rel="noopener">SoniDo (AR)<br>TMLR'25</a>
<a class="flow-node" href="https://arxiv.org/abs/2305.06701" target="_blank" rel="noopener">Extended Audio MAE (Mask)<br>WASPAA'23</a>
</div>
</div>
<div class="flow-arrow"><span>Downstream</span></div>
<div class="flow-row flow-row--5">
<a class="flow-node" href="https://arxiv.org/abs/2512.17209" target="_blank" rel="noopener"><span class="flow-node-tag">Music Structure Analysis</span>MSA-Bench<br>ICASSP'26</a>
<a class="flow-node" href="https://arxiv.org/abs/2410.15573" target="_blank" rel="noopener"><span class="flow-node-tag">LLM Music Caption</span>OpenMU<br>Tech Report '24</a>
<a class="flow-node" href="https://arxiv.org/abs/2310.13267" target="_blank" rel="noopener"><span class="flow-node-tag">Audio-text Retrieval</span>CyCLAPs<br>ACL'24</a>
<a class="flow-node" href="https://arxiv.org/abs/2302.08136" target="_blank" rel="noopener"><span class="flow-node-tag">Hierarchical Classification</span>ResAtt<br>ICASSP'23</a>
<a class="flow-node" href="#"><span class="flow-node-tag">AR Music Transcription</span>PianoPoet<br>Tech Report '26</a>
</div>
</div>

</div>

### Semantic Audio Encoders

<div class="project-paper-grid">

<div class="project-paper-card">

### [SoniDo](publications.html#sonido)

<p class="project-paper-meta">TMLR 2025</p>

A large-scale autoregressive music foundation model that showed generative audio language models can also provide strong semantic features for music understanding.

</div>

<div class="project-paper-card">

### [Extended Audio MAE](publications.html#extended-audio-mae)

<p class="project-paper-meta">WASPAA 2023</p>

An efficient audio semantic encoder based on masked language modeling, later shown to transfer effectively to audio restoration tasks.

</div>

</div>

### Downstream Tasks

<div class="project-paper-grid">

<div class="project-paper-card">

### [OpenMU](publications.html#openmu)

<p class="project-paper-meta">Tech Report 2024</p>

LLaMA 3 listens to music through Audio MAE, forming an early prefix-AR-style music LLM with tool-using capabilities. SOTA-at-the-time for the Multi-choice Music (MuChoMusic) benchmark.

</div>

<div class="project-paper-card">

### [CyCLAPs](publications.html#cyclap)

<p class="project-paper-meta">ACL 2024</p>

Enhancing the text and audio/image latent space alignment with sentence embeddings for cross-modal retrieval.

</div>

<div class="project-paper-card">

### [MSA-Bench](publications.html#msa-bench)

<p class="project-paper-meta">ICASSP 2026</p>

Benchmarks foundational audio semantic encoders for music-structure analysis.

</div>

<div class="project-paper-card">

### [ResAtt](publications.html#resatt)

<p class="project-paper-meta">ICASSP 2023</p>

Appending a hierarchical backend to pretrained audio encoders for hierarchical classification.

</div>

</div>

</section>

<section class="project-hero">

## Diffusion-based Audio Generation

<p class="project-hero-note">Pretrained diffusion backbones adapted to new conditions through finetuning.</p>

<div class="project-map">

<div class="flow-diagram">
<div class="flow-stage flow-stage--pre">
<div class="flow-stage-title">Diffusion/Flow-matching Pretraining</div>
<div class="flow-row flow-row--5">
<a class="flow-node" href="https://arxiv.org/abs/2405.18503" target="_blank" rel="noopener"><span class="flow-node-tag">Fast text-to-sound</span>SoundCTM<br>ICLR'25</a>
<a class="flow-node" href="https://arxiv.org/abs/2510.02110" target="_blank" rel="noopener"><span class="flow-node-tag">Continuous AR model for streaming video-to-audio</span>SoundReactor<br>Tech Report '25</a>
<a class="flow-node" href="https://arxiv.org/abs/2602.20981" target="_blank" rel="noopener"><span class="flow-node-tag">Length generalization for video-to-audio</span>Echoes over Time<br>CVPR'26</a>
<a class="flow-node" href="#"><span class="flow-node-tag">VAE-free Flow-matching for music separation</span>FLOMSS<br>Tech Report '26</a>
<a class="flow-node" href="https://openreview.net/pdf?id=6Tyo0yCCez" target="_blank" rel="noopener"><span class="flow-node-tag">Test-time duration extension for text-to-audio</span>FLEXOUNDIT<br>Tech Report '24</a>
</div>
</div>
<div class="flow-arrow"><span>Supervised Finetuning</span></div>
<div class="flow-stage flow-stage--sft">
<div class="flow-stage-title">Diffusion Supervised Finetuning</div>
<div class="flow-row flow-row--2">
<a class="flow-node" href="https://arxiv.org/abs/2605.14555" target="_blank" rel="noopener"><span class="flow-node-tag">MIDI-to-Drum Synthesis</span>Break-the-Beat<br>ICASSP'26</a>
<a class="flow-node" href="https://anonaudiogen.github.io/web/" target="_blank" rel="noopener"><span class="flow-node-tag">Sketch-to-Audio Generation</span>FlashFoley<br>ICASSP'26</a>
</div>
</div>
</div>

</div>

### Diffusion Pretraining

<div class="project-paper-grid project-paper-grid--trio">

<div class="project-paper-card">

### [SoundReactor](publications.html#soundreactor)

<p class="project-paper-meta">Tech Report 2025</p>

Streaming video-to-audio generation with continuous audio language modeling, aimed at online generation rather than one-shot offline synthesis.

</div>

<div class="project-paper-card">

### [FLOMSS](publications.html#flomss)

<p class="project-paper-meta">Tech Report 2026</p>

VAE-free flow matching for music separation. Comprehensive studies reveal which properties improve and which do not during iterative refinement in the sampling procedure.

</div>

<div class="project-paper-card">

### [FLEXOUNDIT](publications.html#flexoundit)

<p class="project-paper-meta">Tech Report 2024</p>

Text-to-sound pretraining with v-prediction loss and RoPE. Trained on clips shorter than 10 seconds, it maintains sound quality when generating audio up to 30 seconds.

</div>

</div>

### Diffusion Supervised Finetuning

<div class="project-paper-grid">

<div class="project-paper-card">

### [Break-the-Beat](publications.html#break-the-beat)

<p class="project-paper-meta">ICASSP 2026</p>

Adds MIDI conditioning to pretrained diffusion backbones for controllable drum-audio generation.

</div>

<div class="project-paper-card">

### [FlashFoley](publications.html#flashfoley)

<p class="project-paper-meta">ICASSP 2026</p>

Adds sound-sketch conditioning to pretrained flow-matching backbones for fast interactive audio generation.

</div>

</div>

</section>

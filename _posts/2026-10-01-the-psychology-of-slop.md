---
id: ''
title: The Psychology of Slop
image: /assets/images/posts/psychology-of-slop-title.jpg
image_alt: "A robot drawn in the pose of Leonardo da Vinci's Vitruvian Man, with four arms, on aged parchment"
tags:
- engineering
- ai

---

Somewhere in the last two years, "AI slop" went from the isolated ravings of a mad man (or woman), to the mainstream indifference of your Gen Alpha kids if you have them. “What the AI?” and “Holy AI bruh”. People are developing a sense for the uncanny valley of AI slop.[^iain]

Ira Hyman, a cognition researcher writing for Psychology Today, frames the underlying problem as a crisis of reliable knowledge.[^hyman] AI-generated summaries of scientific literature contain errors, and AI systems have been shown to fabricate citations outright when asked to find supporting research.[^hyman-evidence]

In the software industry we see AI slop show up in our code reviews, requirements documents, bugs, support tickets and finally in our software. The increase in regressions in production, the decrease in quality of the software is so prevalent that it is a household topic of conversation. Is Roblox down for the kids? Are your banking apps glitching in a weird way? And poor Github is suffering trying to scale the madness of vibecoded AI slop projects at an unprecedented rate.

## Why brains flag AI content

But before we talk about the code, why and how do our brains flag AI slop? Not just in our TikTok videos but in our written word and slide decks. My first reaction to a new document or deck is to first gut check, am I looking at AI slop? Chances are that we are all looking at something prepared with some help from AI, but has the author or presenter verified the data and claims of their message?  Or did they write a prompt and copy/paste the Claude answer to me?

Part of the answer is that our brains are quickly adapting to the statistical smoothing that the LLMs are so good at. Language models predict the most probable next token, and then the next one, probable is not the same as distinctive, unique or human. A human writer makes a hundred small, slightly improbable choices per page; a model trained to minimize surprise makes very few.

And then layered on top of this is the effort heuristic, people price output partly by the effort they imagine went into it, and the moment "AI-written" becomes the assumption, imagined effort goes out the window.[^ohio]

## The same pattern in code

Engineering teams are running into a version of the same problem. The symptoms are structurally the same as AI slop prose. Pull requests are the new battle ground, testing the limits of the old adage, “Code wins arguments”. Now, code is cheap, ideas are cheaper and major regressions are held at bay by the few and tired, mythical engineers that have the judgement and fortitude to demand quality in their codebase. This reviewer-fatigue problem is the direct engineering analogue of cognitive offloading. Just as people stop double-checking a fact because "the AI probably got it right," reviewers wave through AI-authored diffs because the code reads as competent and speed is the easiest metric to gamify.

A 2025 study on measuring AI slop in text breaks the problem into Information Utility (density, relevance), Information Quality (factuality, bias), and Style Quality (repetition, templatedness, coherence, fluency, verbosity, tone).[^measuring] The same categories translate directly to code review: density maps to unnecessary abstraction or bloat, factuality maps to a hallucinated API or a subtly wrong assumption, coherence maps to whether a change actually fits the surrounding architecture. The study's most important finding, though, is about who gets to apply that framework. When the same models were asked to judge slop, their verdicts barely agreed with human raters.[^measuring] The judgment can't be delegated back to the thing that produced the content.

Hyman, in his Psychology Today article, also notes that reliable information is increasingly paywalled while unreliable content is free and abundant.[^hyman] The software parallel: well-tested, well-reviewed code requires paid senior engineering time, while slop is nearly free to generate at volume. That asymmetry is going to keep pressuring codebases the same way it's pressuring the information ecosystem, unless teams build in deliberate friction.[^lemons]

## How do we work with AI but prevent the slop?

None of this is an argument against using AI. It's an argument for being explicit about the division of labor:[^ohio-hitl]

* **Research and evidence:** AI-assisted, always verified. If a citation, a stat, or an API call came from a model, check it against a primary source before it ships, every time.
* **Opinions and judgment:** human-owned, full stop. A model can lay out options; it can't decide which tradeoff matters for your argument or your architecture.
* **Prose and code:** human-written, or AI-drafted and then substantially rewritten — not lightly edited. The test is whether a careful reader can find a sentence, or a function, that reflects a statistically “smoothed over” decision instead of the intent of the author.
* **Apply a taxonomy:** use the density/factuality/coherence framework as a literal checklist, for writing and for code, rather than trusting a gut sense of "this feels off."[^measuring]
* **Final pass:** human for now. In the future maybe adversarial agents will get substantially better at this, but there is always a judgement and direction that feels uniquely human.

Slop, in the end, isn't really a quality problem. It's a signal-detection problem.[^acm] Readers and code reviewers aren't grading output against some abstract bar; they're checking for a specific, accountable person who made choices and can be asked to defend them. AI can help gather the evidence. It can't stand in for the person who's supposed to be standing behind the work.

## Epilogue

90% of this blog post was written by me, a human. The evidence gathered was assisted by an agent, does this pass the slop test? Can you find the small bits of sentence structure that I copied in from an agent? Do the points still resonate, knowing this?

## References

[^hyman]: Ira Hyman, Ph.D., ["AI Slop and the End of Knowledge,"](https://www.psychologytoday.com/us/blog/mental-mishaps/202606/ai-slop-and-the-end-of-knowledge) *Psychology Today*, updated June 30, 2026.

[^hyman-evidence]: Hyman, ["AI Slop and the End of Knowledge."](https://www.psychologytoday.com/us/blog/mental-mishaps/202606/ai-slop-and-the-end-of-knowledge) Hyman cites reporting in *Science* (Eisenstadt, 2025) that ChatGPT made errors summarizing research and often missed papers' most important points even with precise instructions, and notes that over half of the papers an AI system described in a classroom demonstration did not exist. Multiple published academic papers have been retracted over nonexistent, AI-fabricated references.

[^iain]: Iain, ["AI Slop: Psychology, History, and the Problem of the Ersatz."](https://iain.so/ai-slop-psychology-history-and-the-problem-of-the-ersatz) Extends the uncanny valley beyond faces and voices to writing and ideas: content that passes a casual glance but fails closer inspection.

[^ohio]: Ohio University, ["What is AI slop? Ohio AI faculty experts explain,"](https://www.ohio.edu/news/2026/05/what-ai-slop-ohio-ai-faculty-experts-explain) May 2026. Faculty across disciplines converge on low effort, not AI authorship per se, as the defining trait of slop, and connect it to pre-AI "no low-effort posts" community norms.

[^ohio-hitl]: Ohio University, ["What is AI slop?"](https://www.ohio.edu/news/2026/05/what-ai-slop-ohio-ai-faculty-experts-explain) The faculty argue that responsible use requires human-in-the-loop critical evaluation and broader AI literacy, not avoidance of the tools.

[^measuring]: ["Measuring AI Slop in Text,"](https://arxiv.org/pdf/2509.19163) arXiv:2509.19163, 2025. Proposes a taxonomy across Information Utility (density, relevance), Information Quality (factuality, bias), and Style Quality (repetition, templatedness, coherence, fluency, verbosity, word complexity, tone), and finds that LLM judges show close to no agreement with human raters when asked to identify slop.

[^lemons]: Iain, ["AI Slop: Psychology, History, and the Problem of the Ersatz,"](https://iain.so/ai-slop-psychology-history-and-the-problem-of-the-ersatz) applies Akerlof's "market for lemons" to this dynamic: a flood of low-quality content degrades trust in all content, genuine included, because quality becomes harder to verify cheaply.

[^acm]: Kommers, Duede, Gordon, Holtzman, McNulty, Stewart, Thomas, So & Long, ["Why Slop Matters,"](https://dl.acm.org/doi/full/10.1145/3786777) *ACM AI Letters* 1(1), 2026. Offers a counterpoint worth reading: it defines slop by structural features (superficial competence, asymmetric effort, and mass producibility) rather than by "badness," and argues it exists because demand for content outstrips the human supply of it.

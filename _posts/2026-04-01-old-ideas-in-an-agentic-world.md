---
id: ''
title: Old Ideas in an Agentic World
header:
  overlay_image: /assets/images/posts/old-ideas-in-an-agentic-world.jpg
  teaser: /assets/images/posts/old-ideas-in-an-agentic-world.jpg
tags:
- engineering
- ai

---
Old ideas are new again in an Agentic software development world.

There are 3 big problem areas for us to collectively solve as we develop best practices for building software with AI.


## 1. Supply sufficient context

In modern software development we have moved to faster and smaller iterations, less waterfall and more agile development. Which is great for a ton of reasons but a side effect of these improvements is that we have also moved away from clearly articulating the requirements and business objectives of each discrete, functional piece of code. It is quicker for humans to verbally sync and align on these things and then codify them through the process of writing the code. Humans, over time, carry more and more tribal and organizational knowledge and we can apply this context automatically. Which means we only need to clarify how new functionality fits into the broader context.

However an agent does not naturally hold onto this information. We define a new piece of functionality and without additional context the agent may develop a piece of software that is functionally fine or even great, but off-center from the alignment the humans in the room will automatically have. 

This applies to code review as well. A great code review agent can absolutely detect bugs, inconsistencies in logic, and test issues, but it will not be able to have the appropriate judgement for if this architecture maps to the broader architecture or even the directional future architecture the team is moving towards.

So how do we fix it? Well we have to give the agent the context. There are a bunch of different strategies to help set this context. We can add AGENT.md files, more context in README.md, and we have the prompt itself. We also can iterate on a plan.md file with the agent, so that we can start with a relatively high-level prompt and iterate until the plan for implementation accurately reflects the constraints and business goals of the work.

This plan.md file, is starting to look a lot like a traditional spec file. The higher the detail in the plan, the more likely the agent can implement the code correctly. With the help of the agent, even a semi-technical Product Manager can develop a plan that will at least give the software engineer a great starting point for execution and reduce the number of iteration loops that we have learned to love in our hyper-agile world.


## 2. Training junior engineers

This is a tough problem in the age of agentic coding. Our Senior+ engineers have all succeeded in the industry without the help of AI. But to those new to the profession it has never been easier and harder to succeed. For someone growing in the discipline of software engineer it’s not enough to produce executable code at a high velocity. You also need to thoroughly understand the code that you are producing and signing your name.

As managers, we could possibly go a long while thinking our junior engineers are progressing just fine. After all, they are producing code at a fine rate, they are responding to feedback in code review, and they are getting things shipped. At some point though, the complexity of work could outpace their own understanding until they find themselves drowning in code they don’t understand and using AI more and more as a crutch for knowledge and experience. Suddenly, we have a performance issue that seemed to appear out of nowhere.

So how do we ensure that our junior engineers are developing and understanding the code that they write?

I propose another return to form with synchronous code reviews. The problem with pushing all communication through github is that it is still to easy to hide behind AI-powered explanations for how and why your code works the way that it does. With some form of synchronous code review, dissertation-style, a junior engineer will have to learn how to explain and defend their code and respond to critical feedback. Really this is something that perhaps all engineers should do on occasion. A good engineering manager will be able to help moderate the conversation and pick up on specific cues that may help with coaching the engineer in the future.


## 3. Validating that it’s working

This is perhaps the most controversial but with more and more of the software development lifecycle becoming automated, how do we know that something is working?

Maybe more prevalent for front-end development but if we have agents writing the specs and the code, reviewing the code, and testing the code. When do the humans make sure that software meant for human consumption is usable by, you know, actual humans?

The answer here is probably many things. You can argue that this is even more reason to “test in prod” and increase our production observability. We launch code into production  so fast that we essentially let our users test the code and we rely on extremely fast fixes for regressions. This can work, but I think we are already seeing the early signs of regression fatigue from users. Just watch how the Claude team is constantly, quickly fixing issues. There is still an invisible quality bar that paying users have, and once you cross it, wait for the lagging churn indicators a year or two from now.

Another old-school practice could help us alleviate the problem. Yes, that’s right, maybe its time to bring back manual Quality Assurance testers. First of all, remember your expensive Product Managers and Engineers are now writing down better plans and specs than we ever have before. How easy would it be for an agent to go ahead and notate a testing checklist and maybe even a risk assessment score? Then its a simple math equation, how many regressions can a small, human QA team catch that all the agents and automation will miss? And how many regressions before your churn starts to be affected?

AI is revolutionizing and disrupting everything that we know. Things are changing so quickly that maybe, if we can stop and take a breath, we will realize that they haven’t changed at all.

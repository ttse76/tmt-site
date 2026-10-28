+++
title = 'About This Site'
eyebrow = 'Behind the build'
description = 'How I built this site with Claude, and what I think about developing with AI.'
# Replace each {{< todo >}} note with your own writing. Todo notes only show
# while running `hugo server`, so any you leave behind won't be published.
# Headings (##) are yours to rename, reorder, or add to.
+++

***NOTE: The statements below were not written with AI, nor was AI used at any point for proofreading or writing.***

This site was built with Claude code using Hugo. It is hosted on GitHub pages configured with an auto build and deployment workflow as well as a custom domain setup. You can view the repository [here](https://github.com/ttse76/tmt-site). The majority of the site came to be based on my initial prompt below:

{{< prompt title="Initial prompt" >}}
Build a site with Hugo that will serve as my online resume. I want it to have a title page with my name, an intro that I will write, and some basic info:

- Location: Northern New Jersey
- Education

The next section will be experience. Include the info from the resume I attached. For now, only include the company, year, and title, but leave a space to add a summary. Use front matter for this so it is easy to add new experience in the future.

Make the theme professional but colorful, with green as the main accent color. Include a light and dark mode, and add a transition screen when navigating to other pages.
{{< /prompt >}}

## My take on developing with AI

While this is a simple site compared to what I usually work on, this site represents my views on how modern developers should use AI in their workflows: AI assisting in building out human designed systems.

As a developer, I appreciate how AI tools have helped me in my work and personal projects, while understanding the need to know how to build systems with the goal of long term maintenance. That is why my approach to this site was to build it in a format where adding additional information to my work experience for example is something I can now do *without* prompting Claude. Not only does this make updating the page faster, but it prevents wasting unnecessary tokens on trivial changes.

### ***I believe it is important to not just know how to use AI, but when.***

Not every project or feature requires AI to build out, and while models are becoming more and more sophisticated, the resources needed to run them are growing exponentially along with them. As devs like myself continue to navigate this new world of software development, it is becoming increasingly clear what the exact benefits, and more importantly limitations, that these AI tools have, especaially when working in highly complex systems.

My mission and process as a developer has not changed. I still want to write code and build software that is efficient, secure, and maintainable. To me, AI is another tool to help me achieve these goals, and while Claude may be writing the actual code, the developer should be heavily guiding it along the way, whether it is through highly detailed prompts, or building out initial infrastructure yourself before letting AI tools takeover.

The developer is still responsible for their system, whether they wrote it or Claude did, and a developer who can provide context to AI tools instead of having the AI guess can save valuable time and tokens that don't need to be wasted. This is ultimately how us devs and AI tools can coexist and build great things.
# MRM Preset

My personal mrm preset. Installing globally. Exposes `mrm` cli.

## Ideal World

> Describing conception

This is one the best template scaffolding solution, I've seen so far. I tried yeoman (which is ~~modern~~ super legacy) and its alternative with some short name. Though mrm is not ideal, so there is `bin.js`, which is patched entrypoint of it to workaround slowdown bug (and enable cli auto-update!).

It is meant to be used in *existing folder*, this way you can use each task either it in *just created folder* or in some old repo!

Also, it can be weird, but everything is synchronous here.

### Task Conception

Each task can be used via **API** or cli like `mrm ts`

Each task should have these exports/options:

- wether task is applicable in cwd (mostly by detecting some files)
I have here ensureTask function for some tasks for easy of creating complex tasks
- task parameters (choices)
- main function with params as input (maybe even more params for api)

Other key features:

- [x] easy full files copy (with folders structure)
- [x] writing to output with green / yellow changed files!
- [ ] using existing package manager and pnpm by default

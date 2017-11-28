# Nubot

[hubot]: http://hubot.github.com
[hubot-docs]: https://hubot.github.com/docs/scripting
[hubot-async]: https://github.com/timkinnane/hubot-async
[hubot-pretend]: https://propertyux.github.io/hubot-pretend
[hubot-playbook]: https://timkinnane.github.io/hubot-playbook
[generator-hubot]: https://github.com/github/generator-hubot
[mockery]: https://www.npmjs.com/package/mockery
[yargs]: http://yargs.js.org/docs
[dotenv]: https://www.npmjs.com/package/dotenv
[heroku]: http://www.heroku.com
[standard]: https://standardjs.com/

*Nubot* is an evolution of [Hubot][hubot] by GitHub, pre-loaded with the
[Playbook][hubot-playbook] framework for conversation branching and context and
[Pretend][hubot-pretend] for unit testing.

## Setup

- `yarn install nubot`

- See the [Hubot docs][hubot-docs] for general how-to guides and adapter
info.

- See the [Playbook docs][hubot-playbook] for using the extended features for
conversations.

- See the [Pretend docs][hubot-pretend] for guides to unit testing your
conversations.

## Configure

- Nubot uses [Yargs][yargs] to accept command line arguments. Use `--help` for
a guide to cli configs.

- The same command line options can be given as a config file, a package.json
key or as environment variables, with the prefix HUBOT_.

## Compatibility

*Nubot* is functionally identical to *Hubot* (v3) except for a few minor
enhancements and bug-fixes:

- *Nubot* uses [Mockery][mockery] to substitue `require('hubot')`, so legacy
scripts and adapters _should_* work without modification.

- Its middleware returns a promise instead of `undefined`, so callbacks can
wait for asynchronous operations.

- It can be executed directly as a node script, so it's easier to debug.

- It comes pre-loaded with [Playbook][hubot-playbook], available to all loaded
scripts as `robot.playbook`

- Uses `dotenv` when `NODE_ENV` is `development`, for easily setting configs from local _.env_ file

- Some functionality that was deprecated in Hubot has been removed entirely.

\* Some adapters are not up to date with the conversion of Hubot v3 into es6.

## Rationale

The Hubot project is amazing, but it has a large variety of usage and approaches
being considered for its evolution. We needed it to work seamlessly with
Playbook extensions and some other features that are still being considered for
Hubot's future, but we needed them today. This project may evolve into something
new or possibly return something to Hubot core. It will take more of a 'move
fast and break things' approach, but contributions and discussion are very
welcome.

## Roadmap

- Make `generator-nubot`.
- Update references to Hubot with Nubot.
- Update E2E test and environment loaders with new scripts.
- Update Express version.
- Unify docs for Nubot, Playbook, Pretend, Conditioner.

## Fixes

- Add dotenv for test environment vars including `NODE_ENV`
- Run local mongodb dev dependency for tests
- Re-instate `check` as yargs command to dry-run config
- Add timeout for adapter connection and log error

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

# DAVI Monorepo

## Prerequisites

1. `pnpm` v7.18.2(`npm` and `yarn` are **not supported**.)
https://pnpm.io/installation

## How to setup

1. Create a fork of this repo.
2. Clone your fork installing submodules `git clone --recurse-submodules [your-github-fork-url.git]`
3. Install dependencies `pnpm i`
4. Make an `.env` file (see `.env.example`) and write a seed phrase and deploy salt for hardhat

### If you're on Linux:

First, do the steps above.

1. Run a hardhat instance

```
cd apps/dev-scripts

pnpm dev
```

2. In another terminal, run the Linux subgraph setup

```
cd apps/dxdao-subgraph

sudo ./setup-linux.sh
```

3. When it finishes, terminate the hardhat instance

## Common Issues and Solutions

1. `pnpm i` fails with `node-gyp` errors

You might not have the relavant build tools for node-gyp to run. Check this if you're on [Mac OS](https://github.com/nodejs/node-gyp/blob/HEAD/macOS_Catalina.md#The-acid-test).

2. `listen tcp4 0.0.0.0:5432: bind: address already in use`

There's a process already running on port 5432 (usually postgres).

Run

```
sudo lsof -i :5432
```

to get the PID of the process, and

```
sudo kill -9 [PID]
```

to terminate it.

3. If you're on Linux and get this error

```
dxdao-subgraph:dev: ✖ Failed to deploy to Graph node http://127.0.0.1:8020/: subgraph validation error: [the specified block must exist on the Ethereum network]
dxdao-subgraph:dev: error Command failed with exit code 1.
dxdao-subgraph:dev: info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
dxdao-subgraph:dev:  ELIFECYCLE  Command failed with exit code 1.
dxdao-subgraph:dev:  ELIFECYCLE  Command failed with exit code 1.
```

Then there was a problem during the Linux setup. Common sources of this are

1. The subgraph was already running during the setup: make sure there are no instances of the subraph running. Run `docker compose down`
2. The hardhat instance wasn't running while doing the setup: make sure the hardhat instance is running, and only then run the linux setup.

## Develop

To run project locally you need to compile contracts, run hardhat node from dev-scripts, run subgraph docker, create/deploy local subgraph and run davi-frontend. To do this you can do it in separate terminals or run `pnpm dev` from root project. See `turbo.json` for turbo config

### Issues:

- Both davi-frontend and subgraph are using bytecodes generated by dxdao-contracts when `compile` comand is executed. We need a way to share these bytecodes to use them from different apps. Creating a /package for this might be a good solution
- Same thing as bytecodes, we are copy-pasting abis generated by dxdao-contracts into davi and subgraph apps. We need to automate this.
- Considering that any changes to the contracts will generate new addresses, once that runs, we need to get the addresses of the contracts deployed on the local network and update the davi (beforeBuild script) and subgraph (netwoks.json) configurations that uses those addresses.

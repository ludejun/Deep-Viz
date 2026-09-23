# Contributing · 贡献指南

English | [中文](#中文)

Thanks for taking the time to contribute. Issues and pull requests are both welcome.

## "I don't have permission to push"

You don't need it, and you shouldn't ask for it. **Nobody outside the project can push a branch to
this repository** — that is how GitHub works for every public repo, not a restriction set up here.
The way to contribute a change is to push to _your own_ fork and open a pull request from it:

```bash
# 1. Fork the repo on GitHub (the "Fork" button, top right)

# 2. Clone YOUR fork, not this one
git clone https://github.com/<your-username>/Deep-Viz.git
cd Deep-Viz

# 3. Point "upstream" at this repo so you can stay in sync
git remote add upstream https://github.com/ludejun/Deep-Viz.git

# 4. Branch, commit, push to your fork
git checkout -b fix/some-bug
git commit -am "fix: describe what changed"
git push origin fix/some-bug

# 5. Open the pull request from your fork's branch against ludejun/master
```

Or do the whole thing with the [GitHub CLI](https://cli.github.com/):

```bash
gh repo fork ludejun/Deep-Viz --clone
cd Deep-Viz
git checkout -b fix/some-bug
# ...edit, commit...
gh pr create --repo ludejun/Deep-Viz
```

Two things that can look like a permission problem but aren't:

- **The checks on your PR sit there greyed out.** For a first-time contributor, GitHub Actions waits
  for a maintainer to click "Approve and run". Nothing is wrong; it just needs a maintainer to look.
- **`git push` to `ludejun/…` returns 403.** Expected — see above. Push to your fork's remote.

Note that `master` is a protected branch requiring one approving review, so even maintainers go
through a pull request.

## Development setup

This project uses [pnpm](https://pnpm.io/) and needs Node >= 22 (jsdom 30, which the tests run on,
dropped Node 20). The published package itself supports Node >= 18.

```bash
pnpm install
pnpm build
```

## Before you open the pull request

Please make sure all four pass — CI runs exactly these:

```bash
pnpm lint        # eslint, must report 0 errors
pnpm typecheck   # tsc --noEmit over the declarations
pnpm test        # vitest
pnpm build       # compiles src/ to lib/
```

## Adding a component

A new component needs four things, and the test suite checks three of them:

1. The component itself under `src/<Backend>/`, with `propTypes` declared.
2. An `export { default as X } from './<Backend>/X';` line in `src/index.js`.
3. A matching `export const X: ComponentType<XProps>;` in `types/index.d.ts`.
4. An entry in the `EXPECTED` list in `tests/exports.test.js`.

## A few conventions

- **Commit messages** follow [Conventional Commits](https://www.conventionalcommits.org/):
  `fix:`, `feat:`, `docs:`, `chore:`, `refactor:`, `test:`.
- **Both READMEs.** If a change affects the documented API, update `README.md` _and_ `README_CN.md`.
- **No lifecycles React removed.** `componentWillMount`, `componentWillReceiveProps` and
  `componentWillUpdate` are gone in React 19; a test fails if one reappears. Use
  `componentDidUpdate`.
- **Don't log from components.** Surface progress and failures through props, the way `ThreeModel`
  does with `onProgress` and `onError`.
- **The map components** read the Baidu / AMap SDK off `window`; they must degrade rather than throw
  when it is absent.

## Reporting a bug

Open an [issue](https://github.com/ludejun/Deep-Viz/issues) with:

- the package version, React version and browser,
- the component and the `config` you passed it,
- what you expected and what happened instead,
- ideally a minimal reproduction.

---

<a id="中文"></a>

# 中文

感谢你愿意花时间参与。Issue 和 Pull Request 都非常欢迎。

## “我没有权限提交代码”

你不需要这个权限，也不用来要。**项目之外的任何人都无法直接往本仓库推送分支** —— 这是 GitHub 对所有公开仓库的默认行为，不是本项目做了什么限制。正确的做法是推到**你自己的 fork**，再从 fork 发起 Pull Request：

```bash
# 1. 在 GitHub 页面右上角点 "Fork"

# 2. clone 你自己的 fork，不是这个仓库
git clone https://github.com/<你的用户名>/Deep-Viz.git
cd Deep-Viz

# 3. 把 upstream 指向本仓库，方便后续同步
git remote add upstream https://github.com/ludejun/Deep-Viz.git

# 4. 建分支、提交、推到你自己的 fork
git checkout -b fix/some-bug
git commit -am "fix: 描述你改了什么"
git push origin fix/some-bug

# 5. 从你 fork 的这个分支，向 ludejun/master 发起 Pull Request
```

也可以用 [GitHub CLI](https://cli.github.com/) 一条龙：

```bash
gh repo fork ludejun/Deep-Viz --clone
cd Deep-Viz
git checkout -b fix/some-bug
# ...改代码、提交...
gh pr create --repo ludejun/Deep-Viz
```

有两种情况看着像“没权限”，其实不是：

- **PR 上的 CI 检查一直灰着不跑。** 首次贡献者的 workflow 需要维护者点一下 “Approve and run”，这是 GitHub 的默认策略，等一下即可。
- **`git push` 到 `ludejun/…` 返回 403。** 这是预期行为，推到你自己 fork 的 remote 就好。

另外 `master` 开了分支保护，需要 1 个 approving review，所以维护者自己也走 PR。

## 本地开发

本项目使用 [pnpm](https://pnpm.io/)，需要 Node >= 22（测试依赖的 jsdom 30 已不支持 Node 20）。发布出去的包本身支持 Node >= 18。

```bash
pnpm install
pnpm build
```

## 提 PR 之前

请确认这四条全部通过 —— CI 跑的就是这四条：

```bash
pnpm lint        # eslint，必须 0 error
pnpm typecheck   # 对类型声明跑 tsc --noEmit
pnpm test        # 运行 vitest
pnpm build       # 把 src/ 编译到 lib/
```

## 新增一个组件

新组件需要四样东西，其中三样有测试在守着：

1. 组件本身放在 `src/<渲染方式>/` 下，并声明 `propTypes`。
2. 在 `src/index.js` 里加一行 `export { default as X } from './<渲染方式>/X';`。
3. 在 `types/index.d.ts` 里加上对应的 `export const X: ComponentType<XProps>;`。
4. 在 `tests/exports.test.js` 的 `EXPECTED` 列表里加上名字。

## 一些约定

- **提交信息**遵循 [Conventional Commits](https://www.conventionalcommits.org/)：`fix:`、`feat:`、`docs:`、`chore:`、`refactor:`、`test:`。
- **两份 README。** 如果改动影响了对外 API，请同时更新 `README.md` 和 `README_CN.md`。
- **不要用 React 已移除的生命周期。** `componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate` 在 React 19 已被删除，一旦重新出现测试会失败。请用 `componentDidUpdate`。
- **组件内不要打日志。** 进度和错误通过 props 暴露出去，参考 `ThreeModel` 的 `onProgress` 和 `onError`。
- **地图组件**从 `window` 上读百度/高德 SDK，SDK 不存在时应当优雅降级而不是抛错。

## 反馈 Bug

到 [Issues](https://github.com/ludejun/Deep-Viz/issues) 提一条，请带上：

- 包版本、React 版本和浏览器，
- 用的哪个组件、传进去的 `config`，
- 你期望的行为，以及实际发生了什么，
- 最好有一个最小复现。

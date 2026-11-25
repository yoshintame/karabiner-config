# AGENTS.md

Karabiner-Elements config authored in TypeScript via [karabiner.ts](https://github.com/evan-liu/karabiner.ts). Rules live in `src/` and compile to a single profile in `build/karabiner.json`.

## How a change reaches Karabiner

`build/karabiner.json` is the live config. The dotfiles module `modules/home/karabiner/default.nix` links `~/.config/karabiner/karabiner.json` to it (through the nix store; `readlink -f` resolves to this file). Karabiner-Elements watches the file and reloads.

| Command                      | Effect                                                          |
| ---------------------------- | --------------------------------------------------------------- |
| `bun run build`              | Writes `build/karabiner.json` — **applies the config live**     |
| `bun run dev`                | Same in watch mode: every save under `src/` is applied live     |
| `bun src/index.ts --dry-run` | Prints the generated profile to stdout without writing anything |

Only the main clone (`~/Development/yoshintame/karabiner-config`) is live. In a worktree, `bun run build` writes only that worktree's `build/karabiner.json`. To try a worktree live, run `dot dev kar <branch|path>`: it rebuilds the worktree and points `~/.config/karabiner/karabiner.json` at its build. When done, `dot dev kar off` restores the home-manager link; `dot dev kar` shows which build is live. `dot link` and `dot rebuild` also reset it. Never copy a worktree build over the clone's `build/karabiner.json`.

Write the live file only with a working state. For intermediate refactoring steps compare `--dry-run` output with the committed `build/karabiner.json` instead. If a change does not apply, kickstart the console user server: `launchctl kickstart -k gui/$(id -u)/org.pqrs.service.agent.karabiner_console_user_server`.

## Layout of `src/`

Dependencies point down only: `keymap` → `actions` → `engine`; `config` is read by all of them.

- `config.ts` — user settings: profile name, timings, app bundle ids, binary paths, deeplinks. No such literal belongs anywhere else.
- `keymap/` — declarations only, one file per layer: which key does what. No `toVar`, conditions, shell commands or other mechanics.
  - `layers.ts` — the layer registry and triggers (Caps Lock → hyper with s/d sublayers, Tab, right ⌘); exports `hyper(...sublayers)`, `tab()`, `rcmd()`, used as `hyper('s', 'd')({ i: … })` or `hyper()(withModifier('⌘')({ … }))`.
  - `base.ts` — rebinds of the base layer: Colemak grids and Fn+Space, number-row symbol band, modifier taps, Enter leader, disables, guest mode, ⌘⇧⎋ reset.
  - `hyper.ts`, `tab.ts`, `rcmd.ts`, `slash.ts` — binds of the Caps Lock, Tab, right ⌘ and `/` layers. Layers are named after their trigger key, not after what they hold.
- `actions.ts` — named output events: text editing, apps and windows (including shell commands), input sources and keySwitcher, mouse, terminal, proxy chords. Unused entries are kept on purpose as a library.
- `engine/` — Karabiner mechanics, no concrete keys or settings: `defineLayers` (layer variables, every-layer conditions, hold triggers, reset), `grid` (QWERTY-positional tables, `___` = untouched key), `characters` (type a character in either input source, via ABC when RussianWin lacks it), `defineLayouts`, `defineGuestMode` (toggle and guard), `keys` (disable, tap-alone), `notify`, `profile` (build / `--dry-run`).
- `index.ts` — rule order only. Karabiner fires the first matching manipulator across all rules, so the order matters.
- `generated/proxy-bindings.ts` — codegen from `~/.dotfiles/modules/shared/proxy-bindings.yaml` (`mise run dot:proxy-bindings`); do not edit.

`src/keymap/` is excluded from oxfmt and hand-aligned: bind rows are column-aligned with movement keys in `i j k l` order, positional grids are QMK-style (one quoted cell per key, a comment row of QWERTY or digit labels above). oxlint still checks it. User-facing text (notifications) is in English.

## After editing `src/**`

1. `bun run build` — regenerate (and apply, in the main clone; in a worktree use `dot dev kar <branch>`).
2. `bun test` — checks that `build/karabiner.json` matches the sources and that every rule but `Guest Mode` is guarded.
3. `bun run typecheck`, `bunx oxlint`, `bunx oxfmt --check` (or `hk check --all --slow` for everything CI runs).
4. Commit `src/**` together with the regenerated `build/karabiner.json`.

## Gotchas

- **Flake input.** `~/.dotfiles` reads this repo as the flake input `karabiner-config`. On the Mac `~/.config/karabiner/karabiner.json` links this clone's `build/karabiner.json`, so `bun run build` applies at once; without the clone it links the locked revision in `/nix/store`. The parent needs no manual bump: Renovate moves the input rev, `flake.lock` and the submodule pointer `modules/home/karabiner/config` (`update = none`) in one PR once a commit is pushed.
- **Hooks.** hk runs oxfmt, oxlint and `bun test` on pre-commit (so a commit with a stale `build/karabiner.json` is rejected; the hook only checks, it never rebuilds) and Conventional Commits on commit-msg; install once per clone with `hk install --mise`.
- **Unset variables equal 0.** `variable_if x false` never matches an unset variable; layer "off" checks use `variable_unless x true`.

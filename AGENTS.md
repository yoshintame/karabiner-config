# AGENTS.md

Karabiner-Elements config authored in TypeScript via [karabiner.ts](https://github.com/evan-liu/karabiner.ts). Rules live in `src/` and compile to a single `karabiner.json`.

## dev vs build — how a change is applied

`src/index.ts` picks the write target from `MODE`:

```ts
writeToProfile(isDevelopment ? 'yoshintame' : buildProfile, [...])
```

| Command | `MODE` | Writes to | Effect |
|---|---|---|---|
| `bun run dev` | `development` | live `~/.config/karabiner/karabiner.json` (the `yoshintame` profile, in place) | **Applies the config live.** Karabiner-Elements watches this file and reloads. |
| `bun run build` | `build` | repo artifact `build/karabiner.json` | **Only regenerates the tracked artifact.** Does NOT touch the live config. |

**These are two separate destinations — running `build` alone does not change what Karabiner is running.** The live file `~/.config/karabiner/karabiner.json` is a real file that Karabiner-Elements owns and rewrites (it is not a live symlink to `build/karabiner.json`, even though the dotfiles nix-link declares one — Karabiner replaces it with a plain file at runtime). So a `build`-only write lands on `build/karabiner.json`, which Karabiner is not watching, and nothing reloads.

## After editing any `src/**.ts`

Run **both**, in this order:

1. `bun run build` — regenerate `build/karabiner.json` (the committed artifact; the dotfiles flake reads it through the submodule gitlink).
2. `bun run dev` — write the live profile so the change actually takes effect now.

Then verify and commit:

- `bun run typecheck` — `tsc --noEmit`.
- Confirm the change reached the live file, e.g. `grep -c '<marker>' ~/.config/karabiner/karabiner.json`.
- Commit `src/**` **and** the regenerated `build/karabiner.json` together. The live `~/.config/karabiner/karabiner.json` is not tracked here — don't try to commit it.

If a live change doesn't apply immediately, toggle the profile back and forth in Karabiner-Elements, or kickstart the console_user_server (`launchctl kickstart -k gui/$(id -u)/org.pqrs.service.agent.karabiner_console_user_server`).

## Gotchas

- **`bun run check` (`biome check --write`) reformats every file it matches, not just the ones you edited.** After running it, stage only the files you actually changed — revert biome's incidental reformatting of unrelated files (`git checkout -- <file>`) so it doesn't leak into your commit.
- **Submodule.** This repo is a git submodule of `~/.dotfiles`. After committing here, bump the gitlink in the parent (`git -C ~/.dotfiles add modules/home/karabiner/config` + commit), or the flake keeps pinning the old submodule commit.
- **Commit hooks.** husky runs `commitlint` (Conventional Commits required) and lint-staged (`tsc --noEmit` + `biome check --write`) on staged files only.

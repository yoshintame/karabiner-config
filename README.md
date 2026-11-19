# karabiner-config

Karabiner-Elements config in TypeScript via [karabiner.ts](https://karabiner.ts.evanliu.dev/): Hyper layers on Caps Lock, a numpad layer on Tab, a right ⌘ layer, a symbol band on the number row, Colemak toggle and a guest mode on Fn hold.

## Usage

```sh
mise install
bun install
hk install --mise
bun run build
```

`bun run build` writes `build/karabiner.json`. In dotfiles `~/.config/karabiner/karabiner.json` is a symlink to it, so the build applies the config right away; `bun run dev` does the same on every save. `bun src/index.ts --dry-run` prints the profile without writing.

## Scripts

| Script              | What                                                   |
| ------------------- | ------------------------------------------------------ |
| `bun run build`     | Generate and write `build/karabiner.json`              |
| `bun run dev`       | `build` in watch mode                                  |
| `bun run test`      | Committed build is up to date; guest mode guards rules |
| `bun run typecheck` | `tsc --noEmit`                                         |
| `bun run depscheck` | knip                                                   |

## Development

```bash
bun run dev
```

It will write config directly to karabiner profile at `~/.config/karabiner/karabiner.json` rewriting existing config. If changes doesn't applyed imidietly, you can try to switch profile back and forth in karabiner elements.

## Build

```bash
bun run build
```

It will write config to `build/karabiner.json` file. Than you can make a symlink from `build/karabiner.json` to `~/.config/karabiner/karabiner.json`

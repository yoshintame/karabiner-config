---
name: sync-keymap-docs
description: Sync keymap-drawer YAML and docs with the actual TypeScript karabiner config source code
disable-model-invocation: true
user-invocable: true
---

# Sync Keymap Documentation

Synchronize `keymap-drawer/` artifacts with the actual state of the TypeScript source in `src/`.

## Step 1: Read the source of truth

Read these files to understand current bindings:

- `src/actions.ts` — all action definitions (text editing, apps and windows, input sources, mouse, terminal, proxy chords)
- `src/generated/proxy-bindings.ts` — proxy chord ids; what each chord triggers (Raycast, CleanShot, Hammerspoon) is commented in `~/.dotfiles/modules/shared/proxy-bindings.yaml`
- `src/keymap/layers.ts` — layer registry and triggers: CapsLock → hyper (press/release chords) with `s`/`d` sublayers (tap actions), Tab (`suspendedBy`), right ⌘ (tap action)
- `src/keymap/hyper.ts` — binds of the Hyper layer and its sublayers, with and without `withModifier('⌘')`
- `src/keymap/tab.ts` — Tab layer: digit grid on the right hand and app switching
- `src/keymap/rcmd.ts` — right ⌘ layer binds
- `src/keymap/slash.ts` — `/`-held key-glyph layer (tap action, pasted glyphs)
- `src/keymap/base.ts` — base layer: Colemak layouts and Fn+Space, number-row symbol band, left ⌥/⇧ taps, Enter→ABC+in-app leader, disabled shortcuts, guest mode, ⌘⇧⎋ reset
- `src/engine/layers.ts` — how layer conditions combine (a bind fires only while every other layer is off)

Grids in `src/keymap/` are QWERTY-positional; the drawings are positional too, so map grid cells to physical keys, not to Colemak letters.

## Step 2: Update keymap-drawer YAML

Update `keymap-drawer/keymap.yaml` to match the source. Preserve the existing structure:

**Layers** (10 total, one per layer variable and modifier combination that has binds):

1. `Hyper` — CapsLock held. Keys under `hyper()` in `keymap/hyper.ts`, plus the CapsLock and S/D trigger behaviour from `keymap/layers.ts`
2. `Hyper + ⌘` — CapsLock+Cmd. Keys under `hyper()(withModifier('⌘')(…))`
3. `Hyper + D` — CapsLock+D. Keys under `hyper('d')` (word-level nav/delete)
4. `Hyper + S` — CapsLock+S. Keys under `hyper('s')` (character selection)
5. `Hyper + S + ⌘` — CapsLock+S+Cmd. Keys under `hyper('s')(withModifier('⌘')(…))` (line/document selection)
6. `Hyper + S + D` — CapsLock+S+D. Keys under `hyper('s', 'd')` (word selection)
7. `Tab` — Tab held. Keys under `tab()` in `keymap/tab.ts`
8. `Right ⌘` — right Cmd held. Keys under `rcmd()` in `keymap/rcmd.ts`
9. `Slash` — `/` held. Keys of `slashLayer.rule(…)` in `keymap/slash.ts`
10. `Base` — Non-layer remaps from `keymap/base.ts`, plus layer trigger keys and their tap actions

If a new layer or a new modifier combination with binds appears, add a layer for it, an SVG command in Step 3 and a section in Step 4.

**YAML format**: Each row is a single inline list `[...]` so the file visually resembles a keyboard.
Plain keys as strings (unshifted QWERTY legends: `` ` ``, `1`, …), modified keys as `{t: Action, h: KeyLetter, type: category}`.
Use `s:` (top legend) for a secondary behaviour such as a tap action of a hold key or the shifted symbol of the number row.
Avoid spaces in short legends (`▶Sel`, `▶TAB`): keymap-drawer breaks a legend at spaces.
Example:

```yaml
- [
    'Tab',
    { t: Cut, h: Q, type: clip },
    { t: Copy, h: W, type: clip },
    'R',
    'T',
    ...,
  ]
- [
    { t: '⇪ HYPER', s: 'arm/commit', type: layer },
    { t: All, h: A, type: sys },
    { t: '▶Sel', s: 'tap App◀', h: S, type: layer },
    'G',
    ...,
  ]
```

**CSS types** for coloring:

- `nav` (#42a5f5) — navigation keys
- `del` (#ef5350) — deletion keys
- `clip` (#66bb6a) — clipboard keys (cut/copy/paste, clipboard manager and history)
- `sys` (#ab47bc) — system keys (escape, enter, tab, undo, redo, click, tmux prefix, etc.)
- `layer` (#ff9800) — layer activators (CapsLock, S, D, Tab, right ⌘, `/`, held ⌘)
- `disabled` (#455a64) — disabled keys
- `sel` (#7c4dff) — selection keys (layers S, S + ⌘)
- `wordsel` (#e040fb) — word selection keys (layer SD)
- `remap` (#00bcd4) — base remaps (Enter→Leader, layout toggle, modifier taps, guest mode)
- `app` (#26a69a) — apps and windows (Raycast, app switchers, window pickers, screenshots, force quit)
- `num` (#fdd835) — digits (Tab layer)
- `sym` (#8d6e63) — typed symbols and glyphs (number-row band, Slash layer)

Each layer must have exactly **60 keys** (ANSI 60% layout):

- Row 0: 14 keys (backtick + 12×1u + backspace)
- Row 1: 14 keys (tab + 13×1u)
- Row 2: 13 keys (caps + 11×1u + return)
- Row 3: 12 keys (lshift + 10×1u + rshift)
- Row 4: 7 keys (fn + ctrl + opt + lcmd + space + rcmd + ropt)

Keys outside this layout (Esc, arrows, Forward Delete) cannot be drawn: list their binds in the doc tables only.

## Step 3: Regenerate SVGs

Run these commands (keymap-drawer must be installed via `uv tool install keymap-drawer`; the CLI is `keymap`):

```bash
cd keymap-drawer
keymap draw keymap.yaml -s "Hyper" -o docs/images/layer-hyper.svg
keymap draw keymap.yaml -s "Hyper + ⌘" -o docs/images/layer-hyper-cmd.svg
keymap draw keymap.yaml -s "Hyper + D" -o docs/images/layer-hyper-d.svg
keymap draw keymap.yaml -s "Hyper + S" -o docs/images/layer-hyper-s.svg
keymap draw keymap.yaml -s "Hyper + S + ⌘" -o docs/images/layer-hyper-s-cmd.svg
keymap draw keymap.yaml -s "Hyper + S + D" -o docs/images/layer-hyper-sd.svg
keymap draw keymap.yaml -s "Tab" -o docs/images/layer-tab.svg
keymap draw keymap.yaml -s "Right ⌘" -o docs/images/layer-rcmd.svg
keymap draw keymap.yaml -s "Slash" -o docs/images/layer-slash.svg
keymap draw keymap.yaml -s "Base" -o docs/images/layer-base.svg
keymap draw keymap.yaml -o keymap.svg
```

If any command fails with key count mismatch, fix `keymap.yaml` and retry.

## Step 4: Update documentation

Update `keymap-drawer/docs/karabiner-keymap.md`:

- Update binding tables to match actual source
- Keep the existing document structure (color legend, layer sections with SVG images, additional features)
- Each layer section has: description, `![Layer](images/layer-*.svg)`, and a table of bindings
- Verify "Disabled Standard Shortcuts", "Number Row Symbols", "Colemak Layout", "Guest Mode" and "Reset" sections are current

## Step 5: Verify

Confirm all SVGs were generated without errors and docs are consistent with source. Render an SVG to PNG (for example `resvg -w 1100 docs/images/layer-base.svg "$TMPDIR/layer-base.png"`) to check that legends are not truncated.

Do not run `bun run build` for this task: it rewrites `build/karabiner.json`, the live config.

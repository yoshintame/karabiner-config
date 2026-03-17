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

- `src/actions.ts` — all action definitions (navigation, deletion, clipboard, selection, system)
- `src/hyper-layer-binds.ts` — which keys trigger which actions per layer
- `src/hyper-layers.ts` — layer activation logic (Hyper, S, D, SD)
- `src/index.ts` — top-level rules and other binds (Enter→ABC+Leader, ⌘R→Leader)
- `src/disables.ts` — disabled standard shortcuts
- `src/utils.ts` — symbol mode and utility rules
- `src/keyboard-layouts.ts` — Colemak layout toggle
- `src/toggle-layers.ts` — layer toggle logic (Fn+Space)

## Step 2: Update keymap-drawer YAML

Update `keymap-drawer/keymap.yaml` to match the source. Preserve the existing structure:

**Layers** (6 total):
1. `Hyper` — CapsLock held. Keys from `layerHyper()` in hyper-layer-binds.ts
2. `Hyper + ⌘` — CapsLock+Cmd. Keys with `'⌘'` modifier in `layerHyper()`
3. `Hyper + D` — CapsLock+D. Keys from `layerD()` (word-level nav/delete)
4. `Hyper + S` — CapsLock+S. Keys from `layerS()` (character selection)
5. `Hyper + S + D` — CapsLock+S+D. Keys from `layerSD()` (word selection)
6. `Base` — Non-hyper remaps from `index.ts`, `disables.ts`, `utils.ts`

**YAML format**: Each row is a single inline list `[...]` so the file visually resembles a keyboard.
Plain keys as strings, modified keys as `{t: Action, h: KeyLetter, type: category}`.
Example:
```yaml
- ["Tab",  {t: Cut, h: Q, type: clip},  {t: Copy, h: W, type: clip},  "R",  "T",  ...]
- ["⇪ HYPER",  {t: All, h: A, type: sys},  {t: "▶Sel", h: S, type: layer},  "G",  ...]
```

**CSS types** for coloring:
- `nav` (#42a5f5) — navigation keys
- `del` (#ef5350) — deletion keys
- `clip` (#66bb6a) — clipboard keys
- `sys` (#ab47bc) — system keys (escape, enter, undo, redo, find, click, etc.)
- `layer` (#ff9800) — layer activators (S, D, CapsLock)
- `disabled` (#455a64) — disabled keys
- `sel` (#7c4dff) — selection keys (layer S)
- `wordsel` (#e040fb) — word selection keys (layer SD)
- `remap` (#00bcd4) — base remaps (Enter→Leader, layout toggle)

Each layer must have exactly **60 keys** (ANSI 60% layout):
- Row 0: 14 keys (13×1u + backspace)
- Row 1: 14 keys (tab + 13×1u)
- Row 2: 13 keys (caps + 11×1u + return)
- Row 3: 12 keys (lshift + 10×1u + rshift)
- Row 4: 7 keys (fn + ctrl + opt + lcmd + space + rcmd + ropt)

## Step 3: Regenerate SVGs

Run these commands (keymap-drawer must be installed via `uv tool install keymap-drawer`):

```bash
cd keymap-drawer
keymap draw keymap.yaml -s "Hyper" -o docs/images/layer-hyper.svg
keymap draw keymap.yaml -s "Hyper + ⌘" -o docs/images/layer-hyper-cmd.svg
keymap draw keymap.yaml -s "Hyper + D" -o docs/images/layer-hyper-d.svg
keymap draw keymap.yaml -s "Hyper + S" -o docs/images/layer-hyper-s.svg
keymap draw keymap.yaml -s "Hyper + S + D" -o docs/images/layer-hyper-sd.svg
keymap draw keymap.yaml -s "Base" -o docs/images/layer-base.svg
keymap draw keymap.yaml -o keymap.svg
```

If any command fails with key count mismatch, fix `keymap.yaml` and retry.

## Step 4: Update documentation

Update `keymap-drawer/docs/karabiner-keymap.md`:
- Update binding tables to match actual source
- Keep the existing document structure (color legend, layer sections with SVG images, additional features)
- Each layer section has: description, `![Layer](images/layer-*.svg)`, and a table of bindings
- Verify "Disabled Standard Shortcuts", "Colemak Layout", and "Symbol Mode" sections are current

## Step 5: Verify

Confirm all SVGs were generated without errors and docs are consistent with source.

import { rule, withModifier } from 'karabiner.ts'

import { apps, clipboard, deletion, edit, mouse, navigation, proxy, selection, terminal, text, windows } from '#src/actions'
import { none } from '#src/engine/keys'
import { hyper } from '#src/keymap/layers'

export const navigationRule = rule('Navigation').manipulators([
  hyper()(                  { i: navigation.up,        j: navigation.backward,     k: navigation.down,      l: navigation.forward }),
  hyper()(withModifier('⌘')({ i: navigation.pageStart, j: navigation.lineBackward, k: navigation.pageEnd,   l: navigation.lineForward })),
  hyper('d')(               { i: navigation.optedUp,   j: navigation.wordBackward, k: navigation.optedDown, l: navigation.wordForward }),
])

export const selectionRule = rule('Selection').manipulators([
  hyper()(                     { a: selection.selectAll }),
  hyper('s')(                  { i: selection.up,           j: selection.backward,     k: selection.down,         l: selection.forward }),
  hyper('s')(withModifier('⌘')({ i: selection.pageStart,    j: selection.lineBackward, k: selection.pageEnd,      l: selection.lineForward })),
  hyper('s', 'd')(             { i: selection.expandVscode, j: selection.wordBackward, k: selection.shrinkVscode, l: selection.wordForward }),
])

export const deletionRule = rule('Deletion').manipulators([
  hyper()(                  { u: deletion.backward,     o: deletion.forward }),
  hyper()(withModifier('⌘')({ u: deletion.lineBackward, o: deletion.lineForward })),
  hyper('d')(               { u: deletion.wordBackward, o: deletion.wordForward }),
])

export const clipboardRule = rule('Clipboard').manipulators([
  hyper()(                  { q: clipboard.cut,     w: clipboard.copy, e: clipboard.paste, r: clipboard.quick, '`': clipboard.pasteCodeBlock }),
  hyper()(withModifier('⌘')({ e: clipboard.manager })),
])

export const pasteHistoryRule = rule('Paste History').manipulators([
  hyper()(withModifier('⌘')({ 1: proxy.pasteHistory1, 2: proxy.pasteHistory2, 3: proxy.pasteHistory3, 4: proxy.pasteHistory4, 5: proxy.pasteHistory5 })),
])

export const screenshotRule = rule('Screenshot').manipulators([
  hyper()({ 1: proxy.screenshotFull, 2: proxy.screenshotArea, 3: proxy.screenshotVideo, 4: proxy.screenshotOcr, 5: proxy.screenshotWindow }),
])

export const systemRule = rule('System').manipulators([
  hyper()(                  { ';': edit.return,        ',': edit.tab,      h: edit.escape,     m: edit.undo, '.': edit.redo }),
  hyper()(withModifier('⌘')({ ';': edit.returnCmd })),
  hyper()(                  { b: terminal.tmuxPrefix,  x: mouse.leftClick, f: proxy.spotlight, '␣': none }),
  hyper('s')(               { ';': edit.returnShifted, ',': edit.shiftTab }),
])

export const textActionsRule = rule('Text Actions').manipulators([
  hyper()(   { c: text.fix, t: text.translate, g: text.search }),
  hyper('s')({ c: text.polish, r: none }),
])

export const switchingRule = rule('Switching').manipulators([
  hyper()({ n: windows.vscode, p: windows.currentApp }),
])

export const quitAppRule = rule('Quit App').manipulators([
  hyper()(withModifier('⌘')({ q: apps.forceQuit,         r: apps.relaunch })),
  hyper()(                  { '⎋': apps.forceQuitDialog }),
])

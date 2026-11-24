import { to$, toKey, toPointingButton } from 'karabiner.ts'

import { config } from '#src/config'
import { toAbc, toRussian } from '#src/engine/input-sources'
import { proxy } from '#src/generated/proxy-bindings'

export { proxy }

export const clipboard = {
  copy: toKey('c', '⌘'),
  paste: toKey('v', '⌘'),
  cut: toKey('x', '⌘'),
  manager: toKey('v', '⌘⇧'),
  pasteCodeBlock: proxy.pasteCodeBlock,
} as const

export const navigation = {
  backward: toKey('←'),
  forward: toKey('→'),
  up: toKey('↑'),
  down: toKey('↓'),

  optedUp: toKey('↑', '⌥'),
  optedDown: toKey('↓', '⌥'),
  wordBackward: toKey('←', '⌥'),
  wordForward: toKey('→', '⌥'),

  lineBackward: toKey('←', '⌘'),
  lineForward: toKey('→', '⌘'),
  pageStart: toKey('↑', '⌘'),
  pageEnd: toKey('↓', '⌘'),

  fiveLineBackward: '↑↑↑↑↑',
  fiveLineForward: '↓↓↓↓↓',
  pageUp: toKey('⇞'),
  pageDown: toKey('⇟'),
} as const

export const deletion = {
  backward: toKey('⌫'),
  forward: toKey('⌦'),

  wordBackward: toKey('⌫', '⌥'),
  wordForward: toKey('⌦', '⌥'),

  lineBackward: toKey('⌫', '⌘'),
  lineForward: toKey('⌦', '⌘'),

  file: toKey('⌫', '⌘'),
} as const

export const selection = {
  backward: toKey('←', '⇧'),
  forward: toKey('→', '⇧'),
  up: toKey('↑', '⇧'),
  down: toKey('↓', '⇧'),
  wordBackward: toKey('←', '⌥⇧'),
  wordForward: toKey('→', '⌥⇧'),
  lineBackward: toKey('←', '⌘⇧'),
  lineForward: toKey('→', '⌘⇧'),
  pageStart: toKey('↑', '⌘⇧'),
  pageEnd: toKey('↓', '⌘⇧'),
  expandVscode: toKey('→', '⌘⌃⇧'),
  shrinkVscode: toKey('←', '⌘⌃⇧'),
  selectAll: toKey('a', '⌘'),
} as const

export const edit = {
  undo: toKey('z', '⌘'),
  redo: toKey('z', '⌘⇧'),
  return: toKey('⏎'),
  returnCmd: toKey('⏎', '⌘'),
  returnShifted: toKey('⏎', '⇧'),
  escape: toKey('⎋'),
  tab: toKey('⇥'),
  shiftTab: toKey('⇥', '⇧'),
  space: toKey('␣'),
} as const

const frontPid =
  'osascript -e \'tell application "System Events" to unix id of first process whose frontmost is true\''
const frontBundle =
  'osascript -e \'tell application "System Events" to bundle identifier of first process whose frontmost is true\''

export const apps = {
  next: toKey('⇥', '⌘'),
  prev: toKey('⇥', '⌘⇧'),
  switcherApp: proxy.appSwitcherApp,
  switcherWindow: proxy.appSwitcherWindow,
  switcherCommit: proxy.appSwitcherCommit,
  switcherArm: proxy.appSwitcherArm,

  // Tap left option emits Hyper+\ (Cmd+Ctrl+Alt+Shift+backslash). Bind this chord
  // in Raycast Settings to the "All Apps (Except Pinned)" command — Raycast
  // natively toggles its hotkey (open if closed, close if open). No state sync needed.
  switcher: toKey('\\', '⌘⌥⌃⇧'),

  forceQuit: to$(`P=$(${frontPid}); [ -n "$P" ] && kill -9 "$P"`),
  relaunch: to$(
    `B=$(${frontBundle}); P=$(${frontPid}); [ -n "$P" ] && kill -9 "$P"; [ -n "$B" ] && { sleep 0.7; open -b "$B"; }`,
  ),
  forceQuitDialog: toKey('⎋', '⌘⌥'),
} as const

export const windows = {
  next: toKey('`', '⌘'),
  prev: toKey('`', '⌘⇧'),
  fullscreen: toKey('f', '⌘⌃'),
  currentApp: proxy.currentAppWindows,
  vscode: to$(`open '${config.deeplinks.vscodeWindows}'`),
} as const

export const text = {
  fix: proxy.textFix,
  polish: proxy.textPolish,
  translate: proxy.textTranslate,
  search: proxy.textSearch,
} as const

export const tabs = {
  next: toKey('⇥', '⌃'),
  prev: toKey('⇥', '⌃⇧'),
} as const

export const inputSources = {
  abc: toAbc,
  russian: toRussian,
} as const

export const keySwitcher = {
  convert: toKey('left_control'),
  quit: to$(`pkill -x ${config.apps.keySwitcher.process}`),
  launch: to$(`open -g -b ${config.apps.keySwitcher.bundleId}`),
} as const

export const leaders = {
  inApp: proxy.leaderInApp,
  global: toKey('f18'),
} as const

export const mouse = {
  leftClick: toPointingButton('button1'),
  rightClick: toPointingButton('button2'),
} as const

export const terminal = {
  tmuxPrefix: toKey('b', '⌃'),
} as const

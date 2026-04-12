import { toInputSource, toKey, toPointingButton } from 'karabiner.ts'

import { proxy } from './generated/proxy-bindings'

export const clipboard = {
  copy: toKey('c', '⌘'),
  paste: toKey('v', '⌘'),
  cut: toKey('x', '⌘'),
  manager: toKey('v', '⌘⇧'),
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

export const deletetion = {
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
  expandVscode: toKey('←', '⌘⌃⇧'),
  shrinkVscode: toKey('→', '⌘⌃⇧'),
  selectAll: toKey('a', '⌘'),
} as const

export const system = {
  undo: toKey('z', '⌘'),
  redo: toKey('z', '⌘⇧'),
  return: toKey('⏎'),
  returnCmd: toKey('⏎', '⌘'),
  returnShifted: toKey('⏎', '⇧'),
  escape: toKey('⎋'),
  prefix: toKey('b', '⌃'),
  space: toKey('␣'),

  ABCLayout: toInputSource({ input_source_id: 'com.apple.keylayout.ABC' }),
  languageSwitch: toKey('␣', '⌘'),

  leaderInApp: proxy.leaderInApp,
  leaderGlobal: toKey('f18'),
} as const

export const tabs = {
  next: toKey('⇥', '⌃'),
  prev: toKey('⇥', '⌃⇧'),
} as const

export const apps = {
  next: toKey('⇥', '⌘⇧'),
  prev: toKey('⇥', '⌘'),
} as const

export const windowsApps = {
  next: toKey('`', '⌘'),
  prev: toKey('`', '⌘⇧'),

  fullscreen: toKey('f', '⌘⌃'),
} as const

export const mouse = {
  leftClick: toPointingButton('button1'),
  rightClick: toPointingButton('button2'),
}

export { proxy }

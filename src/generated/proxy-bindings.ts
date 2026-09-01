// GENERATED FILE — do not edit. Source: ../../../shared/proxy-bindings.yaml
import type { ModifierParam, ToKeyParam } from 'karabiner.ts'
import { toKey } from 'karabiner.ts'

export const proxy = {
  fix: toKey('r' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  passwords: toKey('p' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  colorPicker: toKey('c' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  roulette: toKey('x' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  rouletteClear: toKey('z' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  spotlight: toKey('f' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  claudeSpotlight: toKey('s' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  iceMenuItemPicker: toKey('m' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  leaderInApp: toKey('l' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  screenshotArea: toKey('1' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  screenshotFull: toKey('2' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  screenshotWindow: toKey('3' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  screenshotOcr: toKey('4' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  screenshotVideo: toKey('5' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  screenshotScroll: toKey('6' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  screenshotHistory: toKey('7' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  altTabApps: toKey('a' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  altTabWindows: toKey('w' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  voiceInkToggle: toKey('v' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  pasteHistory1: toKey('f13' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  pasteHistory2: toKey('f14' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  pasteHistory3: toKey('f15' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  pasteHistory4: toKey('f16' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
  pasteHistory5: toKey('f17' as ToKeyParam, '⌘⌥⌃⇧' as ModifierParam),
} as const

export type ProxyBindingId = keyof typeof proxy

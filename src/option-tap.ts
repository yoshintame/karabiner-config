import { map, rule, toKey } from 'karabiner.ts'

// Tap left option emits Hyper+\ (Cmd+Ctrl+Alt+Shift+backslash). Bind this chord
// in Raycast Settings to the "All Apps (Except Pinned)" command — Raycast
// natively toggles its hotkey (open if closed, close if open). No state sync needed.
export const SWITCHER_HOTKEY_KEY = '\\'
export const SWITCHER_HOTKEY_MODS = '⌘⌥⌃⇧'

const TIMEOUT = { 'basic.to_if_alone_timeout_milliseconds': 300 } as const

export const optionTapRule = rule('Option Tap → Raycast Switcher').manipulators(
  [
    // Tap left option → fire Hyper+\ chord (Raycast handles toggle natively).
    map('left_option', 'optionalAny')
      .to(toKey('left_option'))
      .toIfAlone(toKey(SWITCHER_HOTKEY_KEY, SWITCHER_HOTKEY_MODS))
      .parameters(TIMEOUT),
  ],
)

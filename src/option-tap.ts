import { map, rule, to$, toKey } from 'karabiner.ts'

// Tap left option emits Hyper+\ (Cmd+Ctrl+Alt+Shift+backslash). Bind this chord
// in Raycast Settings to the "All Apps (Except Pinned)" command — Raycast
// natively toggles its hotkey (open if closed, close if open). No state sync needed.
const SWITCHER_HOTKEY_KEY = '\\'
const SWITCHER_HOTKEY_MODS = '⌘⌥⌃⇧'

const LAST_APP_DEEPLINK =
  'raycast://extensions/yoshintame/raycast-app-switcher/switch-to-last'

const TIMEOUT = { 'basic.to_if_alone_timeout_milliseconds': 300 } as const

export const optionTapRule = rule('Option Tap → Raycast Switcher').manipulators(
  [
    // Tap left option → fire Hyper+\ chord (Raycast handles toggle natively).
    map('left_option', 'optionalAny')
      .to(toKey('left_option'))
      .toIfAlone(toKey(SWITCHER_HOTKEY_KEY, SWITCHER_HOTKEY_MODS))
      .parameters(TIMEOUT),

    // Right option: switch-to-last (no toggle, always trigger via deeplink).
    map('right_option', 'optionalAny')
      .to(toKey('right_option'))
      .toIfAlone(to$(`open ${LAST_APP_DEEPLINK}`))
      .parameters(TIMEOUT),
  ],
)

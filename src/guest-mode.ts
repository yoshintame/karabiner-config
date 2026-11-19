import {
  type BuildContext,
  ifVar,
  map,
  type Rule,
  type RuleBuilder,
  rule,
  to$,
  toSetVar,
} from 'karabiner.ts'

const GUEST_MODE = 'guest-mode'
const KEY_SWITCHER_BUNDLE = 'com.granin.keyswitcher'
const KEY_SWITCHER_PROCESS = 'keySwitcher'

const HOLD = { 'basic.to_if_held_down_threshold_milliseconds': 1000 } as const

const LAYER_VARIABLES = [
  'hyper',
  's-layer',
  'd-layer',
  'cmd-layer',
  'numpad',
  'rcmd-layer',
  'switcher-active',
] as const

const guestModeOff = ifVar(GUEST_MODE, 1).unless()

const notify = (message: string) =>
  `osascript -e 'display notification "${message}" with title "Karabiner"'`

export const guestModeRule = rule('Guest Mode').manipulators([
  map('fn')
    .to('fn')
    .toIfHeldDown([
      toSetVar(GUEST_MODE, 1),
      ...LAYER_VARIABLES.map((name) => toSetVar(name, false)),
      to$(
        `pkill -x ${KEY_SWITCHER_PROCESS}; ${notify('Гостевой режим: обычная клавиатура')}`,
      ),
    ])
    .parameters(HOLD)
    .condition(guestModeOff),
  map('fn')
    .to('fn')
    .toIfHeldDown([
      toSetVar(GUEST_MODE, 0),
      to$(
        `open -g -b ${KEY_SWITCHER_BUNDLE}; ${notify('Гостевой режим выключен')}`,
      ),
    ])
    .parameters(HOLD)
    .condition(ifVar(GUEST_MODE, 1)),
])

export const guardGuestMode = (
  rules: Array<Rule | RuleBuilder>,
): RuleBuilder[] =>
  rules.map((source) => ({
    build: (context?: BuildContext) => {
      const built = 'build' in source ? source.build(context) : source
      const condition = guestModeOff.build()
      return {
        ...built,
        manipulators: built.manipulators.map((manipulator) => ({
          ...manipulator,
          conditions: [...(manipulator.conditions ?? []), condition],
        })),
      }
    },
  }))

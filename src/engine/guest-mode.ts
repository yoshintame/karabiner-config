import {
  type BuildContext,
  type FromKeyParam,
  ifVar,
  map,
  type Rule,
  rule,
  type RuleBuilder,
  type ToEvent,
  type ToKeyParam,
  toSetVar,
} from 'karabiner.ts'

type GuestModeSpec = {
  variable: string
  trigger: { key: FromKeyParam & ToKeyParam; holdMilliseconds: number }
  onEnter: ToEvent[]
  onExit: ToEvent[]
}

export const defineGuestMode = ({
  variable,
  trigger: { key, holdMilliseconds },
  onEnter,
  onExit,
}: GuestModeSpec) => {
  const hold = {
    'basic.to_if_held_down_threshold_milliseconds': holdMilliseconds,
  } as const
  const off = ifVar(variable, 1).unless()

  return {
    rule: rule('Guest Mode').manipulators([
      map(key)
        .to(key)
        .toIfHeldDown([toSetVar(variable, 1), ...onEnter])
        .parameters(hold)
        .condition(off),
      map(key)
        .to(key)
        .toIfHeldDown([toSetVar(variable, 0), ...onExit])
        .parameters(hold)
        .condition(ifVar(variable, 1)),
    ]),
    guard: (rules: Array<Rule | RuleBuilder>): RuleBuilder[] =>
      rules.map((source) => ({
        build: (context?: BuildContext) => {
          const built = 'build' in source ? source.build(context) : source
          const condition = off.build()
          return {
            ...built,
            manipulators: built.manipulators.map((manipulator) => ({
              ...manipulator,
              conditions: [...(manipulator.conditions ?? []), condition],
            })),
          }
        },
      })),
  }
}

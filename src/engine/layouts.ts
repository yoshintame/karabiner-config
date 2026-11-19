import {
  type FromKeyParam,
  ifVar,
  map,
  type ModifierParam,
  rule,
  toSetVar,
} from 'karabiner.ts'

import { type Cell, positions, type QwertyKey } from '#src/engine/grid'
import { ifEnglish } from '#src/engine/input-sources'
import { notify } from '#src/engine/notify'

const BASE_LAYOUT = 'qwerty'

export const defineLayouts = <
  const Spec extends Record<string, Cell<QwertyKey>[][]>,
>(
  variable: string,
  spec: Spec,
) => {
  type Name = Extract<keyof Spec, string>
  const select = (name: string) => [
    toSetVar(variable, name),
    notify(`Layout: ${name}`),
  ]

  return {
    rule: (description: string) =>
      rule(description).manipulators(
        Object.entries(spec).flatMap(([name, rows]) =>
          positions(rows).map(([from, to]) =>
            map(from, '?⇧')
              .to(to)
              .condition(ifVar(variable, name), ifEnglish()),
          ),
        ),
      ),
    toggle: (key: FromKeyParam, modifiers: ModifierParam, name: Name) => {
      const toggle = (from: string | number, to: string) =>
        map(key, modifiers).condition(ifVar(variable, from)).to(select(to))
      return [
        toggle(0, BASE_LAYOUT),
        toggle(name, BASE_LAYOUT),
        toggle(BASE_LAYOUT, name),
      ]
    },
    toReset: [toSetVar(variable, 0)],
  }
}

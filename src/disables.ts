import { map, rule } from 'karabiner.ts'

export const disablesRule = rule('Disables').manipulators([
  map('↑').toNone(),
  map('↓').toNone(),
  map('←').toNone(),
  map('→').toNone(),
  map('⌫').toNone(),
  map('⏎').toNone(),
  map('a', '⌘').toNone(),
  map('c', '⌘').toNone(),
  map('v', '⌘').toNone(),
  map('x', '⌘').toNone(),
  map('z', '⌘').toNone(),
])

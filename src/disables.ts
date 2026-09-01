import { ifInputSource, map, rule } from 'karabiner.ts'

const en = () => ifInputSource({ language: 'en' })

export const disablesRule = rule('Disables').manipulators([
  map('↑').toNone(),
  map('↓').toNone(),
  map('←').toNone(),
  map('→').toNone(),
  map('⌫').toNone(),
  map('a', '⌘').toNone(),
  map('c', '⌘').toNone(),
  map('v', '⌘').toNone(),
  map('x', '⌘').toNone(),
  map('z', '⌘').toNone(),

  map('`', '⌘').toNone(),
  map('`', '⌘⇧').toNone(),

  map(';').toNone().condition(en()),
  map(';', '⇧').toNone().condition(en()),
  map("'").toNone().condition(en()),
  map("'", '⇧').toNone().condition(en()),
  map(',').toNone().condition(en()),
  map(',', '⇧').toNone().condition(en()),
  map('.').toNone().condition(en()),
  map('.', '⇧').toNone().condition(en()),
  map('/').toNone(),
  map('/', '⇧').toNone(),
])

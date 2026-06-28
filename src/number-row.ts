import { ifInputSource, map, rule, toKey } from 'karabiner.ts'

import { system } from '@/actions'

const en = () => ifInputSource({ language: 'en' })
const notEn = () => ifInputSource({ language: 'en' }).unless()

export const numberRowRule = rule('Number Row Symbols').manipulators([
  map(1).to(toKey(1, '⇧')),
  map(2).to(toKey(2, '⇧')).condition(en()),
  map(2)
    .to(system.ABCLayout)
    .toAfterKeyUp([toKey(2, '⇧'), system.russianLayout])
    .condition(notEn()),
  map(3).to(toKey('.')).condition(en()),
  map(3).to(toKey('/')).condition(notEn()),
  map(4).to(toKey(',')).condition(en()),
  map(4).to(toKey('/', '⇧')).condition(notEn()),
  map(5).to(toKey(';', '⇧')).condition(en()),
  map(5).to(toKey(6, '⇧')).condition(notEn()),
  map(6).to(toKey("'", '⇧')).condition(en()),
  map(6).to(toKey(2, '⇧')).condition(notEn()),
  map(7).to(toKey('/', '⇧')).condition(en()),
  map(7).to(toKey(7, '⇧')).condition(notEn()),
  map(8).to(toKey('/')).condition(en()),
  map(8).to(toKey('\\', '⇧')).condition(notEn()),
  map(9).to(toKey(9, '⇧')),
  map(0).to(toKey(0, '⇧')),

  map(3, '⇧').to(toKey('.', '⇧')).condition(en()),
  map(3, '⇧')
    .to(system.ABCLayout)
    .to(toKey('.', '⇧'))
    .to(system.russianLayout)
    .condition(notEn()),
  map(4, '⇧').to(toKey(',', '⇧')).condition(en()),
  map(4, '⇧')
    .to(system.ABCLayout)
    .to(toKey(',', '⇧'))
    .to(system.russianLayout)
    .condition(notEn()),
  map(5, '⇧').to(toKey(';')).condition(en()),
  map(5, '⇧').to(toKey(4, '⇧')).condition(notEn()),
  map(6, '⇧').to(toKey("'")).condition(en()),
  map(6, '⇧')
    .to(system.ABCLayout)
    .to(toKey("'"))
    .to(system.russianLayout)
    .condition(notEn()),

  map(1, '⇧').to(toKey(3, '⇧')).condition(en()),
  map(1, '⇧')
    .to(system.ABCLayout)
    .toAfterKeyUp([toKey(3, '⇧'), system.russianLayout])
    .condition(notEn()),
  map(2, '⇧').to(toKey(4, '⇧')).condition(en()),
  map(2, '⇧')
    .to(system.ABCLayout)
    .toAfterKeyUp([toKey(4, '⇧'), system.russianLayout])
    .condition(notEn()),
  map(9, '⇧').to(toKey(5, '⇧')),
  map(0, '⇧').to(toKey(6, '⇧')).condition(en()),
  map(0, '⇧')
    .to(system.ABCLayout)
    .toAfterKeyUp([toKey(6, '⇧'), system.russianLayout])
    .condition(notEn()),
])

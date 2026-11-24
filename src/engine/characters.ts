import {
  type BasicManipulatorBuilder,
  map,
  type ModifierParam,
  type NumberKeyValue,
  toKey,
  type ToKeyParam,
} from 'karabiner.ts'

import { ___, type Cell, positions } from '#src/engine/grid'
import {
  ifEnglish,
  ifNotEnglish,
  toAbc,
  toRussian,
} from '#src/engine/input-sources'

type Stroke = readonly [key: ToKeyParam, modifiers?: ModifierParam]

// oxfmt-ignore
const abc = {
  '!': [1, '⇧'],   '@': [2, '⇧'],   '#': [3, '⇧'],   '$': [4, '⇧'],   '%': [5, '⇧'],
  '^': [6, '⇧'],   '&': [7, '⇧'],   '*': [8, '⇧'],   '(': [9, '⇧'],   ')': [0, '⇧'],
  '-': ['-'],      '_': ['-', '⇧'], '=': ['='],      '+': ['=', '⇧'],
  '[': ['['],      '{': ['[', '⇧'], ']': [']'],      '}': [']', '⇧'],
  '\\': ['\\'],    '|': ['\\', '⇧'],
  ';': [';'],      ':': [';', '⇧'], "'": ["'"],      '"': ["'", '⇧'],
  ',': [','],      '<': [',', '⇧'], '.': ['.'],      '>': ['.', '⇧'],
  '/': ['/'],      '?': ['/', '⇧'], '`': ['`'],      '~': ['`', '⇧'],
} as const satisfies Record<string, Stroke>

// oxfmt-ignore
const russian: Partial<Record<Character, Stroke>> = {
  '!': [1, '⇧'],   '"': [2, '⇧'],   ';': [4, '⇧'],   '%': [5, '⇧'],   ':': [6, '⇧'],
  '?': [7, '⇧'],   '*': [8, '⇧'],   '(': [9, '⇧'],   ')': [0, '⇧'],
  '-': ['-'],      '_': ['-', '⇧'], '=': ['='],      '+': ['=', '⇧'],
  '\\': ['\\'],    '/': ['\\', '⇧'],
  '.': ['/'],      ',': ['/', '⇧'],
}

export type Character = keyof typeof abc

const press = ([key, modifiers]: Stroke) => toKey(key, modifiers)

const sameStroke = (a: Stroke, b: Stroke) => a[0] === b[0] && a[1] === b[1]

const typeCharacter = (
  from: () => BasicManipulatorBuilder,
  character: Character,
) => {
  const english: Stroke = abc[character]
  const native = russian[character]
  if (native !== undefined && sameStroke(english, native)) {
    return [from().to(press(english))]
  }
  const otherLayout =
    native === undefined
      ? from()
          .to(toAbc)
          .toAfterKeyUp([press(english), toRussian])
      : from().to(press(native))
  return [
    from().to(press(english)).condition(ifEnglish()),
    otherLayout.condition(ifNotEnglish()),
  ]
}

const digits: NumberKeyValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

export const symbolRow = ([plain, shifted]: [
  Cell<Character>[],
  Cell<Character>[],
]) => [
  ...digits.flatMap((digit, i) => {
    const character = plain[i]
    return character === ___ ? [] : typeCharacter(() => map(digit), character)
  }),
  ...digits.flatMap((digit, i) => {
    const character = shifted[i]
    return character === ___
      ? []
      : typeCharacter(() => map(digit, '⇧'), character)
  }),
]

export const characterGrid = (rows: Cell<Character>[][]) =>
  positions(rows).flatMap(([key, character]) =>
    typeCharacter(() => map(key), character),
  )

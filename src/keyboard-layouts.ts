import {
  ifInputSource,
  ifVar,
  type LetterKeyCode,
  map,
  rule,
  withMapper,
} from 'karabiner.ts'

type LayoutKey = LetterKeyCode | ';'

// oxfmt-ignore
const colemakAngle = {
  q: 'q', w: 'w', e: 'f', r: 'p', t: 'b', y: 'j', u: 'l', i: 'u', o: 'y', p: ';',
  a: 'a', s: 'r', d: 's', f: 't', g: 'g', h: 'm', j: 'n', k: 'e', l: 'i', ';': 'o',
  z: 'z', x: 'x', c: 'c', v: 'd', b: 'v', n: 'k', m: 'h',
} as const

// oxfmt-ignore
const colemak = {
  q: 'q', w: 'w', e: 'f', r: 'p', t: 'b', y: 'j', u: 'l', i: 'u', o: 'y', p: ';',
  a: 'a', s: 'r', d: 's', f: 't', g: 'g', h: 'm', j: 'n', k: 'e', l: 'i', ';': 'o',
  z: 'x', x: 'c', c: 'd', v: 'v', b: 'z', n: 'k', m: 'h',
} as const

const ifEnglish = ifInputSource({ language: 'en' })

const layoutRule = (name: string, table: Record<LayoutKey, LayoutKey>) =>
  withMapper(table)((from, to) =>
    map(from, '?⇧').to(to).condition(ifVar('keyboard-layout', name), ifEnglish),
  )

export const colemakLayoutRule = rule('Keyboard Layout').manipulators([
  layoutRule('colemak-angle', colemakAngle),
  layoutRule('colemak', colemak),
])

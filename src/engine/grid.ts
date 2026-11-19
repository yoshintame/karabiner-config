import { type ManipulatorMap, toKey, type ToKeyParam } from 'karabiner.ts'

export const ___ = undefined

export type Cell<T> = T | typeof ___

const qwerty = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
] as const

export type QwertyKey = (typeof qwerty)[number][number]

export const positions = <T>(rows: Cell<T>[][]): Array<[QwertyKey, T]> =>
  rows.flatMap((row, r) =>
    row.flatMap((cell, c): Array<[QwertyKey, T]> => {
      const key = qwerty[r]?.[c]
      return cell === ___ || key === undefined ? [] : [[key, cell]]
    }),
  )

export const grid = (rows: Cell<ToKeyParam>[][]): ManipulatorMap =>
  Object.fromEntries(positions(rows).map(([key, cell]) => [key, toKey(cell)]))

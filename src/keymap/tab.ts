import { rule } from 'karabiner.ts'

import { apps, deletion } from '#src/actions'
import { config } from '#src/config'
import { characterGrid } from '#src/engine/characters'
import { ___, grid } from '#src/engine/grid'
import { layers, tab } from '#src/keymap/layers'

const digitLayouts = {
  homeRow: [
    grid([
    //  q    w    e    r    t    y    u    i    o    p
      [___, ___, ___, ___, ___, ___, ___, '0'],
    //  a    s    d    f    g    h    j    k    l    ;
      [___, '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ]),
    ...characterGrid([
    //  q    w    e    r    t    y    u    i    o    p
      [],
    //  a    s    d    f    g    h    j    k    l    ;
      [],
    //  z    x    c    v    b    n    m
      [___, ___, '.', '+', '=', '-', ','],
    ]),
    { u: deletion.backward, o: deletion.forward },
  ],
  numpad: [
    grid([
    //  q    w    e    r    t    y    u    i    o    p
      [___, ___, ___, ___, ___, ___, '1', '2', '3', ___],
    //  a    s    d    f    g    h    j    k    l    ;
      [___, ___, ___, ___, ___, ___, '4', '5', '6', '0'],
    //  z    x    c    v    b    n    m    ,    .
      [___, ___, ___, ___, ___, ___, '7', '8', '9'],
    ]),
  ],
}

export const tabLayerRule = rule('Tab Layer').manipulators(tab()([
  ...digitLayouts[config.tabDigits],
  {
    e: [apps.switcher, layers.suspend('tab')],
  },
]))

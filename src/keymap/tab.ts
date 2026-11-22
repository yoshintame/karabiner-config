import { rule } from 'karabiner.ts'

import { apps } from '#src/actions'
import { ___, grid } from '#src/engine/grid'
import { layers, tab } from '#src/keymap/layers'

const digits = grid([
//  q    w    e    r    t    y    u    i    o    p
  [___, ___, ___, ___, ___, ___, '1', '2', '3', ___],
//  a    s    d    f    g    h    j    k    l    ;
  [___, ___, ___, ___, ___, ___, '4', '5', '6', '0'],
//  z    x    c    v    b    n    m    ,    .
  [___, ___, ___, ___, ___, ___, '7', '8', '9'],
])

export const tabLayerRule = rule('Tab Layer').manipulators(tab()([
  digits,
  {
    e: [apps.switcher, layers.suspend('tab')],
  },
]))

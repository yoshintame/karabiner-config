import { toPaste } from 'karabiner.ts'

import { none } from '#src/engine/keys'
import { keyLayer } from '#src/engine/layers'

export const slashLayer = keyLayer('/', 'slash-layer', { tap: none })

export const slashLayerRule = slashLayer.rule({
  1:   toPaste('⌘'),
  2:   toPaste('⌥'),
  3:   toPaste('⌃'),
  4:   toPaste('⇧'),
  5:   toPaste('⇪'),
  '←': toPaste('←'),
  '→': toPaste('→'),
  '↑': toPaste('↑'),
  '↓': toPaste('↓'),
  '␣': toPaste('␣'),
  '⏎': toPaste('⏎'),
  '⇥': toPaste('⇥'),
  '⎋': toPaste('⎋'),
  '⌫': toPaste('⌫'),
  '⌦': toPaste('⌦'),
  '⇪': toPaste('⇪'),
})

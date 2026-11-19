import { toPaste } from 'karabiner.ts'

import { keyLayer } from '#src/engine/layers'

const slashLayer = keyLayer('/', 'slash-layer')

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

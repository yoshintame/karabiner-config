import { rule } from 'karabiner.ts'

import { proxy } from '#src/actions'
import { rcmd } from '#src/keymap/layers'

export const rcmdLayerRule = rule('Rcmd Layer').manipulators([
  rcmd()({ f: proxy.spotlight }),
])

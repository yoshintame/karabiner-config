import { map, rule } from 'karabiner.ts'

import { proxy } from '#src/actions'
import { layerRcmd } from '#src/hyper-layers'

export const rcmdLayerRule = rule('Rcmd Layer').manipulators([
  layerRcmd([map('f').to(proxy.spotlight)]),
])

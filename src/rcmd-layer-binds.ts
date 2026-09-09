import { map, rule } from 'karabiner.ts'

import { proxy } from './actions'
import { layerRcmd } from './hyper-layers'

export const rcmdLayerRule = rule('Rcmd Layer').manipulators([
  layerRcmd([map('f').to(proxy.spotlight)]),
])

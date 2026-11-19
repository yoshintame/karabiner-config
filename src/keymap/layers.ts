import { leaders } from '#src/actions'
import { defineLayers } from '#src/engine/layers'

export const layers = defineLayers({
  hyper:  { variable: 'hyper',      trigger: { key: '⇪', anyModifiers: true } },
  s:      { variable: 's-layer',    trigger: { key: 's', anyModifiers: true }, within: 'hyper' },
  d:      { variable: 'd-layer',    trigger: { key: 'd', anyModifiers: true }, within: 'hyper' },
  tab:    { variable: 'tab-layer',  trigger: { key: '⇥' },                      suspendedBy: 'switcher-active' },
  rcmd:   { variable: 'rcmd-layer', trigger: { key: 'right_command', tap: leaders.global } },
})

export const layerTriggersRule = layers.triggersRule('Layers')

export const hyper = (...sublayers: Array<'s' | 'd'>) => layers.when('hyper', ...sublayers)
export const tab = () => layers.when('tab')
export const rcmd = () => layers.when('rcmd')

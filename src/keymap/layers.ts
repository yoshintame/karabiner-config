import { letterKeyCodes } from 'karabiner.ts'

import { apps, leaders, sandbox } from '#src/actions'
import { defineLayers } from '#src/engine/layers'

export const layers = defineLayers({
  hyper:  { variable: 'hyper',      trigger: { key: '⇪', anyModifiers: true, press: [apps.switcherArm], release: [apps.switcherCommit] }, blockedBy: ['tab'], latch: 'switcher-open', fallback: { keys: letterKeyCodes, to: sandbox('⌘⌥⌃') } },
  s:      { variable: 's-layer',    trigger: { key: 's', anyModifiers: true, tap: apps.switcherWindow }, within: 'hyper', latches: true },
  d:      { variable: 'd-layer',    trigger: { key: 'd', anyModifiers: true, tap: apps.switcherApp },    within: 'hyper', latches: true },
  tab:    { variable: 'tab-layer',  trigger: { key: '⇥' },                                         suspendedBy: 'switcher-active', fallback: { keys: letterKeyCodes, to: sandbox('⌥⌃⇧') } },
  rcmd:   { variable: 'rcmd-layer', trigger: { key: 'right_command', tap: leaders.global },        fallback: { keys: letterKeyCodes, to: sandbox('⌘⌃⇧') } },
})

export const layerTriggersRule = layers.triggersRule('Layers')
export const layerFallbacksRule = layers.fallbacksRule('Layer Fallbacks')

export const hyper = (...sublayers: Array<'s' | 'd'>) => layers.when('hyper', ...sublayers)
export const tab = () => layers.when('tab')
export const rcmd = () => layers.when('rcmd')

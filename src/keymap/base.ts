import { rule, toNotificationMessage, toSetVar, withModifier } from 'karabiner.ts'

import { apps, inputSources, keySwitcher, leaders } from '#src/actions'
import { config } from '#src/config'
import { symbolRow } from '#src/engine/characters'
import { ___ } from '#src/engine/grid'
import { defineGuestMode } from '#src/engine/guest-mode'
import { disabled, tapAlone } from '#src/engine/keys'
import { defineLayouts } from '#src/engine/layouts'
import { notify } from '#src/engine/notify'
import { layers } from '#src/keymap/layers'

const layouts = defineLayouts('keyboard-layout', {
  'colemak-angle': [
  //  q    w    e    r    t    y    u    i    o    p
    ['q', 'w', 'f', 'p', 'b', 'j', 'l', 'u', 'y', ';'],
  //  a    s    d    f    g    h    j    k    l    ;
    ['a', 'r', 's', 't', 'g', 'm', 'n', 'e', 'i', 'o'],
  //  z    x    c    v    b    n    m
    ['z', 'x', 'c', 'd', 'v', 'k', 'h'],
  ],
  colemak: [
  //  q    w    e    r    t    y    u    i    o    p
    ['q', 'w', 'f', 'p', 'b', 'j', 'l', 'u', 'y', ';'],
  //  a    s    d    f    g    h    j    k    l    ;
    ['a', 'r', 's', 't', 'g', 'm', 'n', 'e', 'i', 'o'],
  //  z    x    c    v    b    n    m
    ['x', 'c', 'd', 'v', 'z', 'k', 'h'],
  ],
})

export const layoutsRule = layouts.rule('Keyboard Layout')

export const layoutToggleRule = rule('Toggle Layers').manipulators(layouts.toggle('␣', 'fn', 'colemak'))

export const numberRowRule = rule('Number Row Symbols').manipulators(symbolRow([
//  1    2    3    4    5    6    7    8    9    0
  ['%', '@', '/', '.', ':', '"', '?', ',', '(', ')'],
  ['!', '$', '#', '^', ';', "'", ___, '*', '<', '>'],
]))

export const disablesRule = rule('Disables').manipulators([
  disabled(['↑', '↓', '←', '→', '⌫']),
  withModifier('⌘')(disabled(['a', 'c', 'v', 'x', 'z', '`'])),
  withModifier('⌘⇧')(disabled(['`'])),
  disabled(['/']),
  withModifier('⇧')(disabled(['/'])),
])

export const modifierTapsRule = rule('Modifier Taps').manipulators([
  tapAlone('left_option', apps.switcher, config.timings.optionTapTimeoutMilliseconds),
  tapAlone('left_shift', keySwitcher.convert),
])

export const leadersRule = rule('Leaders').manipulators({
  '⏎': [inputSources.abc, leaders.inApp],
})

export const guestMode = defineGuestMode({
  variable: 'guest-mode',
  trigger: { key: 'fn', holdMilliseconds: config.timings.guestModeHoldMilliseconds },
  onEnter: [...layers.toReset, keySwitcher.quit, notify('Guest mode: stock keyboard')],
  onExit: [keySwitcher.launch, notify('Guest mode off')],
})

export const resetRule = rule('Reset').manipulators([
  withModifier('⌘⇧')({
    '⎋': [
      toSetVar('hyper', false),
      toSetVar('s-layer', false),
      toSetVar('d-layer', false),
      ...layouts.toReset,
      toNotificationMessage('layers', 'Reset all layers'),
    ],
  }),
])

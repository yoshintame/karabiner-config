import { ifVar, map, rule } from 'karabiner.ts'

export const toggleLayers = rule('Toggle Layers').manipulators([
  map('␣', 'fn')
    .condition(ifVar('keyboard-layout', 0))
    .toVar('keyboard-layout', 'default')
    .toNotificationMessage('Keyboard layout', 'default'),
  map('␣', 'fn')
    .condition(ifVar('keyboard-layout', 'colemak'))
    .toVar('keyboard-layout', 'default')
    .toNotificationMessage('Keyboard layout', 'default'),
  map('␣', 'fn')
    .condition(ifVar('keyboard-layout', 'default'))
    .toVar('keyboard-layout', 'colemak')
    .toNotificationMessage('Keyboard layout', 'colemak'),
])

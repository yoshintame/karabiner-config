import { map, rule } from 'karabiner.ts'

import {
  clipboard,
  deletetion,
  mouse,
  navigation,
  proxy,
  selection,
  system,
} from './actions'
import { layerD, layerHyper, layerS, layerSD } from './hyper-layers'

const deletetionHyperRule = rule('Deletetion').manipulators([
  layerHyper([
    map('u').to(deletetion.backward),
    map('o').to(deletetion.forward),

    map('u', '⌘').to(deletetion.lineBackward),
    map('o', '⌘').to(deletetion.lineForward),
  ]),

  layerD([
    map('u').to(deletetion.wordBackward),
    map('o').to(deletetion.wordForward),
  ]),
])

const navigationHyperRule = rule('Navigation').manipulators([
  layerHyper([
    map('j').to(navigation.backward),
    map('l').to(navigation.forward),
    map('i').to(navigation.up),
    map('k').to(navigation.down),

    map('j', '⌘').to(navigation.lineBackward),
    map('l', '⌘').to(navigation.lineForward),
    map('i', '⌘').to(navigation.pageStart),
    map('k', '⌘').to(navigation.pageEnd),
  ]),

  layerD([
    map('j').to(navigation.wordBackward),
    map('l').to(navigation.wordForward),
    map('i').to(navigation.optedUp),
    map('k').to(navigation.optedDown),
  ]),
])

const selecetionHyperRule = rule('Selection').manipulators([
  layerHyper([map('a').to(selection.selectAll)]),

  layerS([
    map('j').to(selection.backward),
    map('l').to(selection.forward),
    map('i').to(selection.up),
    map('k').to(selection.down),

    map('j', '⌘').to(selection.lineBackward),
    map('l', '⌘').to(selection.lineForward),
    map('i', '⌘').to(selection.pageStart),
    map('k', '⌘').to(selection.pageEnd),
  ]),

  layerSD([
    map('j').to(selection.wordBackward),
    map('l').to(selection.wordForward),
    map('i').to(selection.shrinkVscode),
    map('k').to(selection.expandVscode),
  ]),
])

const clipboardHyperRule = rule('Clipboard').manipulators([
  layerHyper([
    map('w').to(clipboard.copy),
    map('e').to(clipboard.paste),
    map('q').to(clipboard.cut),
    map('e', '⌘').to(clipboard.manager),
  ]),
])

const screenshotHyperRule = rule('Screenshot').manipulators([
  layerHyper([
    map(1).to(proxy.screenshotFull),
    map(2).to(proxy.screenshotArea),
    map(3).to(proxy.screenshotVideo),
    map(4).to(proxy.screenshotOcr),
    map(5).to(proxy.screenshotWindow),
  ]),
])

const systemHyperRule = rule('System').manipulators([
  layerHyper([
    map(';').to(system.return),
    map(';', '⌘').to(system.returnCmd),
    map('c').to(system.prefix),
    map('h').to(system.escape),
    map('␣').toNone(),
    map('m').to(system.undo),
    map('.').to(system.redo),
    map('x').to(mouse.leftClick),
    map('f').to(proxy.spotlight),
  ]),
  layerS([map(';').to(system.returnShifted)]),
])

export {
  clipboardHyperRule,
  deletetionHyperRule,
  navigationHyperRule,
  screenshotHyperRule,
  selecetionHyperRule,
  systemHyperRule,
}

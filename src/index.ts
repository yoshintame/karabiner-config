import path from 'node:path'

import { map, rule, toKey, toSetVar, writeToProfile } from 'karabiner.ts'

import { system } from '#src/actions'
import { disablesRule } from '#src/disables'
import { guardGuestMode, guestModeRule } from '#src/guest-mode'
import {
  clipboardHyperRule,
  deletetionHyperRule,
  navigationHyperRule,
  numpadHyperRule,
  pasteHistoryHyperRule,
  screenshotHyperRule,
  selecetionHyperRule,
  switchingHyperRule,
  systemHyperRule,
} from '#src/hyper-layer-binds'
import { hyperMode, tabMode } from '#src/hyper-layers'
import { colemakLayoutRule } from '#src/keyboard-layouts'
import { numberRowRule } from '#src/number-row'
import { optionTapRule } from '#src/option-tap'
import { quitAppRule } from '#src/quit-app-binds'
import { rcmdLayerRule } from '#src/rcmd-layer-binds'
import { toggleLayers } from '#src/toggle-layers'
import { symbolModeLayer, utilsRule } from '#src/utils'

const karabinerJsonPath = path.resolve(
  import.meta.dirname,
  '../build/karabiner.json',
)

const target = process.argv.includes('--dry-run')
  ? '--dry-run'
  : { name: 'yoshintame', dryRun: false, karabinerJsonPath }

const customRules = [
  toggleLayers,

  hyperMode,
  tabMode,
  navigationHyperRule,
  selecetionHyperRule,
  deletetionHyperRule,
  clipboardHyperRule,
  pasteHistoryHyperRule,
  screenshotHyperRule,
  systemHyperRule,
  numpadHyperRule,
  switchingHyperRule,
  rcmdLayerRule,

  quitAppRule,

  colemakLayoutRule,

  numberRowRule,

  disablesRule,
  utilsRule,

  optionTapRule,

  symbolModeLayer,

  rule('Other').manipulators([
    map('⏎').to(system.ABCLayout).to(system.leaderInApp),
    map('right_command')
      .toVar('rcmd-layer', true)
      .toAfterKeyUp(toSetVar('rcmd-layer', false))
      .toIfAlone(system.leaderGlobal),
    map('left_shift', 'optionalAny')
      .to(toKey('left_shift'))
      .toIfAlone(system.keySwitcherConvert),
  ]),
]

writeToProfile(target, [guestModeRule, ...guardGuestMode(customRules)])

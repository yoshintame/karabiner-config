import fs from 'node:fs'
import path from 'node:path'

import { ifInputSource, map, rule, toKey, writeToProfile } from 'karabiner.ts'

import { system } from '@/actions'

import { disablesRule } from './disables'
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
} from './hyper-layer-binds'
import { hyperMode, tabMode } from './hyper-layers'
import { colemakLayoutRule } from './keyboard-layouts'
import { optionTapRule } from './option-tap'
import { quitAppRule } from './quit-app-binds'
import { toggleLayers } from './toggle-layers'
import { symbolModeLayer, utilsRule } from './utils'

const isDevelopment = process.env['MODE'] === 'development'
const profileName = 'yoshintame'

const karabinerJsonPath = path.resolve(
  import.meta.dirname,
  '../build/karabiner.json',
)

const dir = path.dirname(karabinerJsonPath)
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}
if (!fs.existsSync(karabinerJsonPath)) {
  fs.writeFileSync(
    karabinerJsonPath,
    JSON.stringify(
      {
        global: {
          show_in_menu_bar: true,
        },
        profiles: [
          {
            name: profileName,
            complex_modifications: {
              rules: [],
            },
            selected: true,
          },
        ],
      },
      null,
      2,
    ),
  )
}

const buildProfile = {
  name: profileName,
  dryRun: false,
  karabinerJsonPath,
}

writeToProfile(isDevelopment ? 'yoshintame' : buildProfile, [
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

  quitAppRule,

  colemakLayoutRule,

  disablesRule,
  utilsRule,

  optionTapRule,

  symbolModeLayer,

  rule('Other').manipulators([
    map('⏎').to(system.ABCLayout).to(system.leaderInApp),
    map('right_command').to(system.leaderGlobal),
    map('left_shift', 'optionalAny')
      .to(toKey('left_shift'))
      .toIfAlone(system.russianLayout)
      .condition(ifInputSource({ language: 'en' })),
    map('left_shift', 'optionalAny')
      .to(toKey('left_shift'))
      .toIfAlone(system.ABCLayout)
      .condition(ifInputSource({ language: 'en' }).unless()),
  ]),
])

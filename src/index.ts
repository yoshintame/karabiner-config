import fs from 'node:fs'
import path from 'node:path'

import { map, rule, toKey, writeToProfile } from 'karabiner.ts'

import { hyper, system } from '@/actions'

import { disablesRule } from './disables'
import {
  clipboardHyperRule,
  deletetionHyperRule,
  navigationHyperRule,
  selecetionHyperRule,
  systemHyperRule,
} from './hyper-layer-binds'
import { hyperMode } from './hyper-layers'
import { colemakLayoutRule } from './keyboard-layouts'
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
  navigationHyperRule,
  selecetionHyperRule,
  deletetionHyperRule,
  clipboardHyperRule,
  systemHyperRule,

  colemakLayoutRule,

  disablesRule,
  utilsRule,

  symbolModeLayer,

  rule('Other').manipulators([
    map('⏎').to(system.ABCLayout).to(hyper.leaderInApp),
    map('right_command').to(hyper.leaderGlobal),
    map('left_shift', 'optionalAny')
      .to(toKey('left_shift'))
      .toIfAlone(toKey('␣', '⌘')),
    // .toIfAlone(system.ABCLayout), doesnt work in karabiner for some reason
  ]),
])

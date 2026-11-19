import { config } from '#src/config'
import { writeProfile } from '#src/engine/profile'
import {
  disablesRule,
  guestMode,
  layoutsRule,
  layoutToggleRule,
  leadersRule,
  modifierTapsRule,
  numberRowRule,
  resetRule,
} from '#src/keymap/base'
import {
  clipboardRule,
  deletionRule,
  navigationRule,
  pasteHistoryRule,
  quitAppRule,
  screenshotRule,
  selectionRule,
  switchingRule,
  systemRule,
} from '#src/keymap/hyper'
import { layerTriggersRule } from '#src/keymap/layers'
import { rcmdLayerRule } from '#src/keymap/rcmd'
import { slashLayerRule } from '#src/keymap/slash'
import { tabLayerRule } from '#src/keymap/tab'

writeProfile(config.profile, [
  guestMode.rule,
  ...guestMode.guard([
    slashLayerRule,
    layoutToggleRule,
    layerTriggersRule,

    navigationRule,
    selectionRule,
    deletionRule,
    clipboardRule,
    pasteHistoryRule,
    screenshotRule,
    systemRule,
    switchingRule,
    quitAppRule,
    tabLayerRule,
    rcmdLayerRule,

    layoutsRule,
    numberRowRule,
    disablesRule,
    resetRule,
    modifierTapsRule,
    leadersRule,
  ]),
])

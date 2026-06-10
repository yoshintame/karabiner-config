import { map, rule, toKey } from 'karabiner.ts'

import { layerHyper } from './hyper-layers'

const frontPid =
  "osascript -e 'tell application \"System Events\" to unix id of first process whose frontmost is true'"
const frontBundle =
  "osascript -e 'tell application \"System Events\" to bundle identifier of first process whose frontmost is true'"

export const quitAppRule = rule('Quit App').manipulators([
  layerHyper([
    map('q', '⌘').to$(`P=$(${frontPid}); [ -n "$P" ] && kill -9 "$P"`),

    map('r', '⌘').to$(
      `B=$(${frontBundle}); P=$(${frontPid}); [ -n "$P" ] && kill -9 "$P"; [ -n "$B" ] && { sleep 0.7; open -b "$B"; }`,
    ),

    map('⎋').to(toKey('⎋', '⌘⌥')),
  ]),
])

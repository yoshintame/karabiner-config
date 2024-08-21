import {
  layer,
  map,
  rule,
  withMapper,
  type NumberKeyValue,
} from "karabiner.ts";

export const utilsRule = rule("Utils").manipulators([
  map("⎋", "⌘⇧")
    .toVar("hyper", false)
    .toVar("s-layer", false)
    .toVar("d-layer", false)
    .toVar("cmd-layer", false)
    .toVar("keyboard-layout", 0)
    .toNotificationMessage("layers", "Reset all layers"),
]);

export const symbolModeLayer = layer("/", "symbol-mode").manipulators([
  withMapper(["⌘", "⌥", "⌃", "⇧", "⇪"])((k, index) =>
    map((index + 1) as NumberKeyValue).toPaste(k)
  ),
  withMapper(["←", "→", "↑", "↓", "␣", "⏎", "⇥", "⎋", "⌫", "⌦", "⇪"])((k) =>
    map(k).toPaste(k)
  ),
]);

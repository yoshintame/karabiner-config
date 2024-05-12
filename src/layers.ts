import { ifVar, map, toSetVar, withCondition } from "karabiner.ts";

export const layers = [
  //Hyper layers
  map("⇪", "optionalAny")
    .toVar("hyper", true)
    .toAfterKeyUp(toSetVar("hyper", false)),

  map("s", "optionalAny")
    .toVar("s-layer", true)
    .toAfterKeyUp(toSetVar("s-layer", false))
    .toIfAlone("s")
    .condition(ifVar("hyper", true)),
  map("d", "optionalAny")
    .toVar("d-layer", true)
    .toAfterKeyUp(toSetVar("d-layer", false))
    .toIfAlone("d")
    .condition(ifVar("hyper", true)),

  // Toggle layers
  map("␣", "fn")
    .condition(ifVar("keyboard-layout", 0))
    .toVar("keyboard-layout", "default")
    .toNotificationMessage("Keyboard layout", "default"),
  map("␣", "fn")
    .condition(ifVar("keyboard-layout", "colemak"))
    .toVar("keyboard-layout", "default")
    .toNotificationMessage("Keyboard layout", "default"),
  map("␣", "fn")
    .condition(ifVar("keyboard-layout", "default"))
    .toVar("keyboard-layout", "colemak")
    .toNotificationMessage("Keyboard layout", "colemak"),

  // Reset all layers
  map("⎋", "⌘⇧")
    .toVar("hyper", false)
    .toVar("s-layer", false)
    .toVar("d-layer", false)
    .toVar("cmd-layer", false)
    .toVar("keyboard-layout", 0)
    .toNotificationMessage("layers", "Reset all layers"),
];

// Explicit using of all existing layers in the conditions of necessity, then that without them the layers cease to be properly triggered
// TODO: need to be invisigated why

// unless is needed, because if use "ifVar("", false)" it want work
// TODO: need to be invisigated why
export function layer(...activeLayers: string[]) {
  const conditions = [
    { key: "hyper", flag: activeLayers.includes("H") },
    { key: "s-layer", flag: activeLayers.includes("S") },
    { key: "d-layer", flag: activeLayers.includes("D") },
    { key: "cmd-layer", flag: activeLayers.includes("F") },
  ].map(({ key, flag }) =>
    flag ? ifVar(key, true) : ifVar(key, true).unless()
  );

  return withCondition(...conditions);
}

export const layerHyper = layer("H");
export const layerS = layer("H", "S");
export const layerD = layer("H", "D");
export const layerSD = layer("H", "S", "D");
export const layerF = layer("H", "F");
export const layerSF = layer("H", "S", "F");

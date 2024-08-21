import { ifVar, map, rule, toSetVar, withCondition } from "karabiner.ts";

export const hyperLayers = rule("Hyper Layers").manipulators([
  //Hyper layers
  map("⇪", "optionalAny")
    .toVar("hyper", true)
    .toAfterKeyUp(toSetVar("hyper", false)),
  // .condition(ifApp("com.github.wez.wezterm").unless()),
  map("s", "optionalAny")
    .toVar("s-layer", true)
    .toAfterKeyUp(toSetVar("s-layer", false))
    .condition(ifVar("hyper", true)),
  map("d", "optionalAny")
    .toVar("d-layer", true)
    .toAfterKeyUp(toSetVar("d-layer", false))
    .condition(ifVar("hyper", true)),
]);

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

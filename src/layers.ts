import { ifVar, map, toSetVar, withCondition } from "karabiner.ts";

// Hyper condition on all letters layers is necessary because if it wasn't there, those buttons alone would be delayed due to the layer trigger
export const layers = [
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
  map("f", "optionalAny")
    .toVar("f-layer", true)
    .toAfterKeyUp(toSetVar("f-layer", false))
    .toIfAlone("f")
    .condition(ifVar("hyper", true)),

  // This condition is necessary, because without it hyper + (layer) + cmd + button want work with cmd behaviour.
  // TODO: need to be invisigated why
  map("left_command", "optionalAny")
    .toVar("f-layer", true)
    .toAfterKeyUp(toSetVar("f-layer", false))
    .toIfAlone("left_command")
    .condition(ifVar("hyper", true)),
];

// Explicit using of all existing layers in the conditions of necessity, then that without them the layers cease to be properly triggered
// TODO: need to be invisigated why

// unless is needed, because if use "ifVar("", false)" it want work
// TODO: need to be invisigated why
export const layerHyper = withCondition(
  ifVar("hyper", true),
  ifVar("s-layer", true).unless(),
  ifVar("d-layer", true).unless(),
  ifVar("f-layer", true).unless()
);

export const layerS = withCondition(
  ifVar("hyper", true),
  ifVar("s-layer", true),
  ifVar("d-layer", true).unless(),
  ifVar("f-layer", true).unless()
);

export const layerD = withCondition(
  ifVar("hyper", true),
  ifVar("s-layer", true).unless(),
  ifVar("d-layer", true),
  ifVar("f-layer", true).unless()
);

export const layerF = withCondition(
  ifVar("hyper", true),
  ifVar("s-layer", true).unless(),
  ifVar("d-layer", true).unless(),
  ifVar("f-layer", true)
);

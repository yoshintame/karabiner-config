import { ifVar, map, toSetVar, withCondition } from "karabiner.ts";

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
  map("left_command", "optionalAny")
    .toVar("f-layer", true)
    .toAfterKeyUp(toSetVar("f-layer", false))
    .toIfAlone("left_command")
    .condition(ifVar("hyper", true)),
];

export const layerF = withCondition(
  ifVar("hyper", true),
  ifVar("s-layer", true).unless(),
  ifVar("d-layer", true).unless(),
  ifVar("f-layer", true)
);

export const layerD = withCondition(
  ifVar("hyper", true),
  ifVar("s-layer", true).unless(),
  ifVar("d-layer", true),
  ifVar("f-layer", true).unless()
);

export const layerHyper = withCondition(
  ifVar("hyper", true),
  ifVar("s-layer", true).unless(),
  ifVar("d-layer", true).unless(),
  ifVar("f-layer", true).unless()
);

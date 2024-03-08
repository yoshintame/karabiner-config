import { ifVar, map, toSetVar, withCondition } from "karabiner.ts";

export const layers = [
  map("⇪", "optionalAny").toVar("hyper", 1).toAfterKeyUp(toSetVar("hyper", 0)),
  map("s", "optionalAny")
    .toVar("s-layer", 1)
    .toAfterKeyUp(toSetVar("s-layer", 0))
    .toIfAlone("s")
    .condition(ifVar("hyper", 1)),
  map("d", "optionalAny")
    .toVar("d-layer", 1)
    .toAfterKeyUp(toSetVar("d-layer", 0))
    .toIfAlone("d")
    .condition(ifVar("hyper", 1)),
  map("f", "optionalAny")
    .toVar("f-layer", 1)
    .toAfterKeyUp(toSetVar("f-layer", 0))
    .toIfAlone("f")
    .condition(ifVar("hyper", 1)),
  map("left_command", "optionalAny")
    .toVar("f-layer", 1)
    .toAfterKeyUp(toSetVar("f-layer", 0))
    .toIfAlone("left_command")
    .condition(ifVar("hyper", 1)),
];

export const layerF = withCondition(
  ifVar("hyper", 1),
  ifVar("s-layer", 1).unless(),
  ifVar("d-layer", 1).unless(),
  ifVar("f-layer", 1)
);

export const layerD = withCondition(
  ifVar("hyper", 1),
  ifVar("s-layer", 1).unless(),
  ifVar("d-layer", 1),
  ifVar("f-layer", 1).unless()
);

export const layerHyper = withCondition(
  ifVar("hyper", 1),
  ifVar("s-layer", 1).unless(),
  ifVar("d-layer", 1).unless(),
  ifVar("f-layer", 1).unless()
);

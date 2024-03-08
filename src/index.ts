import {
  ifVar,
  layer,
  map,
  rule,
  toSetVar,
  withCondition,
  withMapper,
  writeToProfile,
  type NumberKeyValue,
} from "karabiner.ts";

import { deletetion } from "./actions";

writeToProfile("yoshintame", [
  layer("/", "symbol-mode").manipulators([
    withMapper(["⌘", "⌥", "⌃", "⇧", "⇪"])((k, index) =>
      map((index + 1) as NumberKeyValue).toPaste(k)
    ),
    withMapper(["←", "→", "↑", "↓", "␣", "⏎", "⇥", "⎋", "⌫", "⌦", "⇪"])((k) =>
      map(k).toPaste(k)
    ),
  ]),

  rule("Layers").manipulators([
    map("⇪", "optionalAny")
      .toVar("hyper", 1)
      .toAfterKeyUp(toSetVar("hyper", 0)),
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
  ]),

  rule("Deletetion").manipulators([
    withCondition(
      ifVar("hyper", 1),
      ifVar("s-layer", 1).unless(),
      ifVar("d-layer", 1).unless(),
      ifVar("f-layer", 1).unless()
    )([map("u").to(deletetion.backward), map("o").to(deletetion.forward)]),

    withCondition(
      ifVar("hyper", 1),
      ifVar("s-layer", 1).unless(),
      ifVar("d-layer", 1),
      ifVar("f-layer", 1).unless()
    )([
      map("u").to(deletetion.wordBackward),
      map("o").to(deletetion.wordForward),
    ]),

    withCondition(
      ifVar("hyper", 1),
      ifVar("s-layer", 1).unless(),
      ifVar("d-layer", 1).unless(),
      ifVar("f-layer", 1)
    )([
      map("u").to(deletetion.lineBackward),
      map("o").to(deletetion.lineForward),
    ]),
  ]),

  //   importJson(resolve(__dirname, "./karabiner.json")),
]);

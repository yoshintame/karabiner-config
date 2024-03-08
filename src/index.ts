import {
  layer,
  map,
  rule,
  withMapper,
  writeToProfile,
  type NumberKeyValue,
} from "karabiner.ts";

import { deletetion } from "./actions";
import { layerD, layerF, layerHyper, layers } from "./layers";

writeToProfile("yoshintame", [
  layer("/", "symbol-mode").manipulators([
    withMapper(["⌘", "⌥", "⌃", "⇧", "⇪"])((k, index) =>
      map((index + 1) as NumberKeyValue).toPaste(k)
    ),
    withMapper(["←", "→", "↑", "↓", "␣", "⏎", "⇥", "⎋", "⌫", "⌦", "⇪"])((k) =>
      map(k).toPaste(k)
    ),
  ]),

  rule("Layers").manipulators(layers),

  rule("Deletetion").manipulators([
    layerHyper([
      map("u").to(deletetion.backward),
      map("o").to(deletetion.forward),
    ]),

    layerD([
      map("u").to(deletetion.wordBackward),
      map("o").to(deletetion.wordForward),
    ]),

    layerF([
      map("u").to(deletetion.lineBackward),
      map("o").to(deletetion.lineForward),
    ]),
  ]),

  //   importJson(resolve(__dirname, "./karabiner.json")),
]);

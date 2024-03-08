import {
  layer,
  map,
  rule,
  withMapper,
  writeToProfile,
  type NumberKeyValue,
} from "karabiner.ts";

import {
  clipboard,
  deletetion,
  navigation,
  selection,
  system,
} from "./actions";
import {
  layerD,
  layerF,
  layerHyper,
  layerS,
  layerSD,
  layerSF,
  layers,
} from "./layers";

writeToProfile("yoshintame", [
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

  rule("Navigation").manipulators([
    layerHyper([
      map("j").to(navigation.backward),
      map("l").to(navigation.forward),
      map("i").to(navigation.up),
      map("k").to(navigation.down),
    ]),

    layerD([
      map("j").to(navigation.wordBackward),
      map("l").to(navigation.wordForward),
      map("i").toTypeSequence(navigation.fiveLineBackward),
      map("k").toTypeSequence(navigation.fiveLineForward),
    ]),

    layerF([
      map("j").to(navigation.lineBackward),
      map("l").to(navigation.lineForward),
      map("i").to(navigation.pageStart),
      map("k").to(navigation.pageEnd),
    ]),
  ]),

  rule("Selection").manipulators([
    layerHyper([map("a").to(selection.selectAll)]),

    layerS([
      map("j").to(selection.backward),
      map("l").to(selection.forward),
      map("i").to(selection.up),
      map("k").to(selection.down),
    ]),

    layerSD([
      map("j").to(selection.wordBackward),
      map("l").to(selection.wordForward),
      map("i").to(selection.shrinkVscode),
      map("k").to(selection.expandVscode),
    ]),

    layerSF([
      map("j").to(selection.lineBackward),
      map("l").to(selection.lineForward),
      map("i").to(selection.pageStart),
      map("k").to(selection.pageEnd),
    ]),
  ]),

  rule("Clipboard").manipulators([
    layerHyper([
      map("w").to(clipboard.copy),
      map("e").to(clipboard.paste),
      map("q").to(clipboard.cut),
    ]),
  ]),

  rule("Disable").manipulators([
    map("↑").toNone(),
    map("↓").toNone(),
    map("←").toNone(),
    map("→").toNone(),
    map("⌫").toNone(),
    map("a", "⌘").toNone(),
    map("c", "⌘").toNone(),
    map("v", "⌘").toNone(),
    map("x", "⌘").toNone(),
    map("z", "⌘").toNone(),
  ]),

  rule("System").manipulators([
    layerHyper([
      map("␣").to(system.languageSwitch),
      map("m").to(system.undo),
      map(".").to(system.redo),
    ]),
  ]),

  layer("/", "symbol-mode").manipulators([
    withMapper(["⌘", "⌥", "⌃", "⇧", "⇪"])((k, index) =>
      map((index + 1) as NumberKeyValue).toPaste(k)
    ),
    withMapper(["←", "→", "↑", "↓", "␣", "⏎", "⇥", "⎋", "⌫", "⌦", "⇪"])((k) =>
      map(k).toPaste(k)
    ),
  ]),
]);

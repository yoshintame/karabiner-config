import path from "node:path";

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
  mouse,
  navigation,
  raycast,
  selection,
  system,
} from "./actions";
import { colemakLayout } from "./keyboard-layouts";
import { layerD, layerHyper, layerS, layerSD, layers } from "./layers";

const isDevelopment = process.env["MODE"] === "development";

const buildProfile = {
  name: "yoshintame",
  dryRun: false,
  karabinerJsonPath: path.resolve(
    import.meta.dirname,
    "../build/karabiner.json"
  ),
};

writeToProfile(isDevelopment ? "yoshintame" : buildProfile, [
  rule("Layers").manipulators(layers),

  rule("Deletetion").manipulators([
    layerHyper([
      map("u").to(deletetion.backward),
      map("o").to(deletetion.forward),

      map("u", "⌘").to(deletetion.lineBackward),
      map("o", "⌘").to(deletetion.lineForward),
    ]),

    layerD([
      map("u").to(deletetion.wordBackward),
      map("o").to(deletetion.wordForward),
    ]),
  ]),

  rule("Navigation").manipulators([
    layerHyper([
      map("j").to(navigation.backward),
      map("l").to(navigation.forward),
      map("i").to(navigation.up),
      map("k").to(navigation.down),

      map("j", "⌘").to(navigation.lineBackward),
      map("l", "⌘").to(navigation.lineForward),
      map("i", "⌘").to(navigation.pageStart),
      map("k", "⌘").to(navigation.pageEnd),
    ]),

    layerD([
      map("j").to(navigation.wordBackward),
      map("l").to(navigation.wordForward),
      map("i").toTypeSequence(navigation.fiveLineBackward),
      map("k").toTypeSequence(navigation.fiveLineForward),
    ]),
  ]),

  rule("Selection").manipulators([
    layerHyper([map("a").to(selection.selectAll)]),

    layerS([
      map("j").to(selection.backward),
      map("l").to(selection.forward),
      map("i").to(selection.up),
      map("k").to(selection.down),

      map("j", "⌘").to(selection.lineBackward),
      map("l", "⌘").to(selection.lineForward),
      map("i", "⌘").to(selection.pageStart),
      map("k", "⌘").to(selection.pageEnd),
    ]),

    layerSD([
      map("j").to(selection.wordBackward),
      map("l").to(selection.wordForward),
      map("i").to(selection.shrinkVscode),
      map("k").to(selection.expandVscode),
    ]),
  ]),

  rule("Clipboard").manipulators([
    layerHyper([
      map("w").to(clipboard.copy),
      map("e").to(clipboard.paste),
      map("q").to(clipboard.cut),
      map("e", "⌘").to(clipboard.manager),
    ]),
  ]),

  rule("Disable").manipulators([
    map("↑").toNone(),
    map("↓").toNone(),
    map("←").toNone(),
    map("→").toNone(),
    map("⌫").toNone(),
    map("⏎").toNone(),
    map("a", "⌘").toNone(),
    map("c", "⌘").toNone(),
    map("v", "⌘").toNone(),
    map("x", "⌘").toNone(),
    map("z", "⌘").toNone(),
  ]),

  rule("System").manipulators([
    layerHyper([
      map(";").to(system.return),
      map("␣").to(system.languageSwitch),
      map("m").to(system.undo),
      map(".").to(system.redo),
      map("c").to(mouse.leftClick),
      map("f").to(raycast.toggle),
    ]),
    layerS([map(";").to(system.returnShifted)]),
  ]),

  rule("Keyboard Layout").manipulators(colemakLayout),

  layer("/", "symbol-mode").manipulators([
    withMapper(["⌘", "⌥", "⌃", "⇧", "⇪"])((k, index) =>
      map((index + 1) as NumberKeyValue).toPaste(k)
    ),
    withMapper(["←", "→", "↑", "↓", "␣", "⏎", "⇥", "⎋", "⌫", "⌦", "⇪"])((k) =>
      map(k).toPaste(k)
    ),
  ]),
]);

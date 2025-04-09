import path from "node:path";

import { writeToProfile } from "karabiner.ts";

import { disablesRule } from "./disables";
import {
  clipboardHyperRule,
  deletetionHyperRule,
  navigationHyperRule,
  selecetionHyperRule,
  systemHyperRule,
} from "./hyper-layer-binds";
import { hyperMode } from "./hyper-layers";
import { colemakLayoutRule } from "./keyboard-layouts";
import { toggleLayers } from "./toggle-layers";
import { symbolModeLayer, utilsRule } from "./utils";

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
  toggleLayers,

  hyperMode,
  navigationHyperRule,
  selecetionHyperRule,
  deletetionHyperRule,
  clipboardHyperRule,
  systemHyperRule,

  colemakLayoutRule,

  disablesRule,
  utilsRule,

  symbolModeLayer,
]);

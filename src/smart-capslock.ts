import { ifApp, map, rule, toKey } from "karabiner.ts";

export const smartCapsLockRule = rule("Smart Caps Lock").manipulators([
  map("⇪", "optionalAny")
    .condition(ifApp("com.github.wez.wezterm"))
    .toIfAlone("⎋")
    .to(toKey("left_control")),
]);

import {
    ifInputSource,
    ifVar,
    map,
    rule,
    toKey,
    withMapper,
    type Condition,
    type ConditionBuilder,
    type FromKeyParam,
    type ToKeyParam,
} from "karabiner.ts";

export const colemakLayoutRule = rule("Keyboard Layout").manipulators([
  withMapper({
    q: "q", w: "w", e: "f", r: "p", t: "b", y: "j", u: "l", i: "u", o: "y", p: ";",
    a: "a", s: "r", d: "s", f: "t", g: "g", h: "m", j: "n", k: "e", l: "i", ";": "o",
    z: "z", x: "x", c: "c", v: "d", b: "v", n: "k", m: "h",
  } as const)((from, to) =>
    bindKeyboardLayout(from, to, [
      ifVar("keyboard-layout", "colemak-angle"),
      ifInputSource({ language: "en" }),
    ])
  ), withMapper({
    q: "q", w: "w", e: "f", r: "p", t: "b", y: "j", u: "l", i: "u", o: "y", p: ";",
    a: "a", s: "r", d: "s", f: "t", g: "g", h: "m", j: "n", k: "e", l: "i", ";": "o",
    z: "x", x: "c", c: "d", v: "v", b: "z", n: "k", m: "h",
  } as const)((from, to) =>
    bindKeyboardLayout(from, to, [
      ifVar("keyboard-layout", "colemak"),
      ifInputSource({ language: "en" }),
    ])
  ),
]);

const bindKeyboardLayout = (
  from: FromKeyParam,
  to: ToKeyParam,
  condition: (Condition | ConditionBuilder)[]
) =>
  map(from, "?⇧")
    .to(toKey(to))
    .condition(...condition);

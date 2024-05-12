import {
  ifVar,
  map,
  toKey,
  withMapper,
  type FromKeyParam,
  type ToKeyParam,
} from "karabiner.ts";

export const colemakLayout = [
  withMapper({
    q: "q", w: "w", e: "f", r: "p", t: "b", y: "j", u: "l", i: "u", o: "y", p: ";",
    a: "a", s: "r", d: "s", f: "t", g: "g", h: "m", j: "n", k: "e", l: "i", ";": "o",
    z: "x", x: "c", c: "d", v: "v", b: "z", n: "k", m: "h",
  } as const)((from, to) => bindKeyboardLayout(from, to)),
];

const bindKeyboardLayout = (from: FromKeyParam, to: ToKeyParam) =>
  map(from, "?⇧").to(toKey(to)).condition(ifVar("keyboard-layout", "colemak"));

import { to$, toKey, toPointingButton } from "karabiner.ts";

export const clipboard = {
  copy: toKey("c", "⌘"),
  paste: toKey("v", "⌘"),
  cut: toKey("x", "⌘"),
} as const;

export const navigation = {
  backward: toKey("←"),
  forward: toKey("→"),
  up: toKey("↑"),
  down: toKey("↓"),

  wordBackward: toKey("←", "⌥"),
  wordForward: toKey("→", "⌥"),
  lineBackward: toKey("←", "⌘"),
  lineForward: toKey("→", "⌘"),
  fiveLineBackward: "↑↑↑↑↑",
  fiveLineForward: "↓↓↓↓↓",

  pageUp: toKey("⇞"),
  pageDown: toKey("⇟"),
  pageStart: toKey("↑", "⌘"),
  pageEnd: toKey("↓", "⌘"),
} as const;

export const deletetion = {
  backward: toKey("⌫"),
  forward: toKey("⌦"),

  wordBackward: toKey("⌫", "⌥"),
  wordForward: toKey("⌦", "⌥"),

  lineBackward: toKey("⌫", "⌘"),
  lineForward: toKey("⌦", "⌘"),

  file: toKey("⌫", "⌘"),
} as const;

export const selection = {
  backward: toKey("←", "⇧"),
  forward: toKey("→", "⇧"),
  up: toKey("↑", "⇧"),
  down: toKey("↓", "⇧"),
  wordBackward: toKey("←", ["⇧", "⌥"]),
  wordForward: toKey("→", ["⇧", "⌥"]),
  lineBackward: toKey("←", ["⇧", "⌘"]),
  lineForward: toKey("→", ["⇧", "⌘"]),
  pageStart: toKey("↑", ["⇧", "⌘"]),
  pageEnd: toKey("↓", ["⇧", "⌘"]),
  expandVscode: toKey("←", ["⇧", "⌘", "⌃"]),
  shrinkVscode: toKey("→", ["⇧", "⌘", "⌃"]),
} as const;

export const system = {
  languageSwitch: toKey("␣", "⌘"),
  undo: toKey("z", "⌘"),
  redo: toKey("z", ["⌘", "⇧"]),
} as const;

export const tabs = {
  next: toKey("⇥", "⌃"),
  prev: toKey("⇥", ["⌃", "⇧"]),
} as const;

export const apps = {
  next: toKey("⇥", ["⌘", "⇧"]),
  prev: toKey("⇥", "⌘"),
} as const;

export const windowsApps = {
  next: toKey("`", "⌘"),
  prev: toKey("`", ["⌘", "⇧"]),

  fullscreen: toKey("f", ["⌃", "⌘"]),
} as const;

export const yabai = {
  split: to$("/bin/bash ~/opt/shell_commands/window-split.sh"),
  unsplit: to$("/bin/bash ~/opt/shell_commands/window-unsplit.sh"),
};

export const mouse = {
  leftClick: toPointingButton("button1"),
  rightClick: toPointingButton("button2"),
};

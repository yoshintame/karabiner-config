import { to$, toKey, toPointingButton } from "karabiner.ts";

export const clipboard = {
  copy: toKey("c", "left_command"),
  paste: toKey("v", "left_command"),
  cut: toKey("x", "left_command"),
} as const;

export const navigation = {
  backward: toKey("←"),
  forward: toKey("→"),
  up: toKey("↑"),
  down: toKey("↓"),

  wordBackward: toKey("←", "left_option"),
  wordForward: toKey("→", "left_option"),
  lineBackward: toKey("←", "left_command"),
  lineForward: toKey("→", "left_command"),
  fiveLineBackward: "↑↑↑↑↑",
  fiveLineForward: "↓↓↓↓↓",

  pageUp: toKey("page_up"),
  pageDown: toKey("page_down"),
  pageStart: toKey("↑", "left_command"),
  pageEnd: toKey("↓", "left_command"),
} as const;

export const deletetion = {
  backward: toKey("delete_or_backspace"),
  forward: toKey("delete_forward"),

  wordBackward: toKey("delete_or_backspace", "left_option"),
  wordForward: toKey("delete_forward", "left_option"),

  lineBackward: toKey("delete_or_backspace", "left_command"),
  lineForward: toKey("delete_forward", "left_command"),

  file: toKey("delete_or_backspace", "left_command"),
} as const;

export const selection = {
  backward: toKey("←", "left_shift"),
  forward: toKey("→", "left_shift"),
  up: toKey("↑", "left_shift"),
  down: toKey("↓", "left_shift"),
  wordBackward: toKey("←", ["left_shift", "left_option"]),
  wordForward: toKey("→", ["left_shift", "left_option"]),
  lineBackward: toKey("←", ["left_shift", "left_command"]),
  lineForward: toKey("→", ["left_shift", "left_command"]),
  pageStart: toKey("↑", ["left_shift", "left_command"]),
  pageEnd: toKey("↓", ["left_shift", "left_command"]),
  expandVscode: toKey("←", ["left_shift", "left_command", "left_control"]),
  shrinkVscode: toKey("→", ["left_shift", "left_command", "left_control"]),
} as const;

export const system = {
  languageSwitch: toKey("spacebar", "left_command"),
  undo: toKey("z", "left_command"),
  redo: toKey("z", ["left_command", "left_shift"]),
} as const;

export const tabs = {
  next: toKey("tab", "left_control"),
  prev: toKey("tab", ["left_control", "left_shift"]),
} as const;

export const apps = {
  next: toKey("tab", ["left_command", "left_shift"]),
  prev: toKey("tab", "left_command"),
} as const;

export const windowsApps = {
  next: toKey("grave_accent_and_tilde", "left_command"),
  prev: toKey("grave_accent_and_tilde", ["left_command", "left_shift"]),

  fullscreen: toKey("f", ["left_control", "left_command"]),
} as const;

export const yabai = {
  split: to$("/bin/bash ~/opt/shell_commands/window-split.sh"),
  unsplit: to$("/bin/bash ~/opt/shell_commands/window-unsplit.sh"),
};

export const mouse = {
  leftClick: toPointingButton("button1"),
  rightClick: toPointingButton("button2"),
};

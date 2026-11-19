export const config = {
  profile: 'yoshintame',
  timings: {
    guestModeHoldMilliseconds: 1000,
    optionTapTimeoutMilliseconds: 300,
  },
  apps: {
    keySwitcher: { bundleId: 'com.granin.keyswitcher', process: 'keySwitcher' },
    hammerspoonCli: '/opt/homebrew/bin/hs',
  },
  deeplinks: {
    vscodeWindows:
      'raycast://extensions/yoshintame/raycast-app-switcher/app-windows-by-id?arguments=%7B%22appIdentifier%22%3A%22com.microsoft.VSCode%22%7D',
  },
} as const

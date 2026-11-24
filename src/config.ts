type TabDigits = 'homeRow' | 'numpad'

export const config = {
  profile: 'yoshintame',
  tabDigits: 'homeRow' as TabDigits,
  timings: {
    guestModeHoldMilliseconds: 1000,
    optionTapTimeoutMilliseconds: 300,
  },
  apps: {
    keySwitcher: { bundleId: 'com.granin.keyswitcher', process: 'keySwitcher' },
  },
  deeplinks: {
    vscodeWindows:
      'raycast://extensions/yoshintame/raycast-app-switcher/app-windows-by-id?arguments=%7B%22appIdentifier%22%3A%22com.microsoft.VSCode%22%7D',
  },
} as const

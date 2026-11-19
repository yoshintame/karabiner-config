import { oxfmt } from '@yoshintame/ox-config/oxfmt'
import { defineConfig } from 'oxfmt'

const preset = oxfmt()

export default defineConfig({
  ...preset,
  ignorePatterns: [
    ...(preset.ignorePatterns ?? []),
    'build/**',
    'keymap-drawer/**',
  ],
})

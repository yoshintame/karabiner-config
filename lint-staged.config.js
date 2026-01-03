/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{ts,tsx}': [() => 'tsc --noEmit --project tsconfig.json'],
  '*': [
    'biome check --write --no-errors-on-unmatched --files-ignore-unknown=true',
  ],
}

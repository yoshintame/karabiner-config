import { base, ignorePatterns, strict } from '@yoshintame/ox-config/oxlint'
import { defineConfig } from 'oxlint'

export default defineConfig({
  extends: [base, strict],
  ignorePatterns,
  rules: {
    'no-underscore-dangle': ['error', { allow: ['___'] }],
  },
  options: {
    typeCheck: true,
  },
})

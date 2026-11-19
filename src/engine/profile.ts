import path from 'node:path'

import { type Rule, type RuleBuilder, writeToProfile } from 'karabiner.ts'

const karabinerJsonPath = path.resolve(
  import.meta.dirname,
  '../../build/karabiner.json',
)

export const writeProfile = (
  profile: string,
  rules: Array<Rule | RuleBuilder>,
) =>
  writeToProfile(
    process.argv.includes('--dry-run')
      ? '--dry-run'
      : { name: profile, dryRun: false, karabinerJsonPath },
    rules,
  )

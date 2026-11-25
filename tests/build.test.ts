import { beforeAll, describe, expect, test } from 'bun:test'
import path from 'node:path'

const root = path.resolve(import.meta.dir, '..')

type Condition = { type: string; name?: string; value?: unknown }
type Manipulator = { conditions?: Condition[] }
type Rule = { description: string; manipulators: Manipulator[] }
type Config = { profiles: { complex_modifications: { rules: Rule[] } }[] }

const rulesOf = (config: Config) =>
  config.profiles[0]?.complex_modifications.rules ?? []

let generated: Rule[] = []

beforeAll(() => {
  const result = Bun.spawnSync(['bun', 'src/index.ts', '--dry-run'], {
    cwd: root,
  })
  if (result.exitCode !== 0) {
    throw new Error(`dry run failed:\n${result.stderr.toString()}`)
  }
  generated = rulesOf(JSON.parse(result.stdout.toString()) as Config)
})

const isGuestGuard = (condition: Condition) =>
  condition.type === 'variable_unless' &&
  condition.name === 'guest-mode' &&
  condition.value === 1

describe('build/karabiner.json', () => {
  test('matches the generated profile', async () => {
    const committed = rulesOf(
      (await Bun.file(
        path.join(root, 'build/karabiner.json'),
      ).json()) as Config,
    )
    expect(committed).toEqual(generated)
  })
})

describe('layer fallbacks', () => {
  test('no layer bind comes after the fallbacks of its layer', () => {
    const index = generated.findIndex(
      (rule) => rule.description === 'Layer Fallbacks',
    )
    expect(index).toBeGreaterThan(0)
    const fallbackLayers = new Set(
      (generated[index]?.manipulators ?? []).flatMap((m) =>
        (m.conditions ?? [])
          .filter((condition) => condition.type === 'variable_if')
          .map((condition) => condition.name),
      ),
    )
    expect(fallbackLayers.size).toBeGreaterThan(0)
    const shadowed = generated
      .slice(index + 1)
      .flatMap((rule) =>
        rule.manipulators
          .filter((m) =>
            (m.conditions ?? []).some(
              (condition) =>
                condition.type === 'variable_if' &&
                fallbackLayers.has(condition.name),
            ),
          )
          .map(() => rule.description),
      )
    expect(shadowed).toEqual([])
  })
})

describe('guest mode', () => {
  test('the Guest Mode rule comes first', () => {
    expect(generated[0]?.description).toBe('Guest Mode')
  })

  test('every other manipulator is disabled in guest mode', () => {
    const unguarded = generated
      .slice(1)
      .flatMap((rule) =>
        rule.manipulators
          .filter((m) => !(m.conditions ?? []).some(isGuestGuard))
          .map(() => rule.description),
      )
    expect(unguarded).toEqual([])
  })
})

import {
  type FromAndToKeyCode,
  type FromKeyParam,
  ifVar,
  layer,
  type LayerKeyParam,
  type ManipulatorBuilder,
  type ManipulatorMap,
  map,
  rule,
  type ToEvent,
  toSetVar,
  withCondition,
} from 'karabiner.ts'

import { none } from '#src/engine/keys'

type Manipulators = Parameters<ReturnType<typeof withCondition>>[0]

const isBuilder = (
  manipulators: Manipulators | ManipulatorBuilder,
): manipulators is ManipulatorBuilder =>
  !Array.isArray(manipulators) &&
  typeof (manipulators as Partial<ManipulatorBuilder>).build === 'function'

type Trigger = {
  key: FromKeyParam
  anyModifiers?: boolean
  press?: ToEvent[]
  tap?: ToEvent
  release?: ToEvent[]
}

type Fallback = {
  keys: readonly FromAndToKeyCode[]
  to: (key: FromAndToKeyCode) => ToEvent
}

type LayerSpec<Name extends string> = {
  variable: string
  trigger: Trigger
  within?: Name
  suspendedBy?: string
  blockedBy?: Name[]
  latch?: string
  latches?: boolean
  fallback?: Fallback
}

const fromTrigger = (trigger: Trigger) =>
  trigger.anyModifiers === true
    ? map(trigger.key, 'optionalAny')
    : map(trigger.key)

export const defineLayers = <
  const Spec extends Record<string, LayerSpec<Extract<keyof Spec, string>>>,
>(
  spec: Spec,
) => {
  type Name = Extract<keyof Spec, string>
  const layers = Object.entries(spec) as Array<[Name, LayerSpec<Name>]>
  const specOf = (name: Name): LayerSpec<Name> => {
    const found = layers.find(([candidate]) => candidate === name)
    if (found === undefined) throw new Error(`Unknown layer ${name}`)
    return found[1]
  }
  const layerVars = layers.flatMap(([, { suspendedBy, latch }]) =>
    [suspendedBy, latch].filter((name) => name !== undefined),
  )
  const latchOf = (within: Name | undefined, latches: boolean | undefined) =>
    within === undefined || latches !== true ? undefined : specOf(within).latch
  const blockers = ([, { trigger, blockedBy }]: [Name, LayerSpec<Name>]) =>
    (blockedBy ?? []).map((name) => {
      const { variable, suspendedBy } = specOf(name)
      const blocker = fromTrigger(trigger)
        .to(none)
        .condition(ifVar(variable, true))
      if (suspendedBy !== undefined)
        blocker.condition(ifVar(suspendedBy, true).unless())
      return blocker
    })

  const latched = ([, { trigger, within, latches }]: [
    Name,
    LayerSpec<Name>,
  ]) => {
    const latch = latchOf(within, latches)
    if (
      within === undefined ||
      latch === undefined ||
      trigger.tap === undefined
    )
      return []
    return [
      fromTrigger(trigger)
        .to(trigger.tap)
        .condition(ifVar(latch, true))
        .condition(ifVar(specOf(within).variable, true)),
    ]
  }

  const trigger = ([
    ,
    { variable, trigger, within, suspendedBy, latch, latches },
  ]: [Name, LayerSpec<Name>]) => {
    const cleared = [suspendedBy, latch]
      .filter((name) => name !== undefined)
      .map((name) => toSetVar(name, false))
    const held = fromTrigger(trigger)
      .toVar(variable, true)
      .toAfterKeyUp([
        toSetVar(variable, false),
        ...cleared,
        ...(trigger.release ?? []),
      ])
    const press = [
      ...(latch === undefined ? [] : [toSetVar(latch, false)]),
      ...(trigger.press === undefined ? [] : [...trigger.press, none]),
    ]
    if (press.length > 0) held.to(press)
    const childLatch = latchOf(within, latches)
    if (trigger.tap !== undefined)
      held.toIfAlone(
        childLatch === undefined
          ? trigger.tap
          : [trigger.tap, toSetVar(childLatch, true)],
      )
    if (within !== undefined)
      held.condition(ifVar(specOf(within).variable, true))
    return held
  }

  // Every layer variable is checked in each condition: Karabiner fires the first
  // matching manipulator, so a hyper bind would shadow the same key on the s/d
  // sub-layers unless it requires them to be off.
  // "Off" is `variable_unless … true` rather than `variable_if … false`: an unset
  // variable equals 0, and 0 never matches false.
  const when =
    (...active: Name[]) =>
    (manipulators: Manipulators | ManipulatorBuilder) =>
      withCondition(
        ...layers.map(([name, { variable }]) =>
          active.includes(name)
            ? ifVar(variable, true)
            : ifVar(variable, true).unless(),
        ),
        ...active.flatMap((name) => {
          const suspendedBy = specOf(name).suspendedBy
          return suspendedBy === undefined
            ? []
            : [ifVar(suspendedBy, true).unless()]
        }),
      )(isBuilder(manipulators) ? [manipulators] : manipulators)

  return {
    when,
    triggersRule: (description: string) =>
      rule(description).manipulators(
        layers.flatMap((entry) => [
          ...blockers(entry),
          ...latched(entry),
          trigger(entry),
        ]),
      ),
    fallbacksRule: (description: string) =>
      rule(description).manipulators(
        layers.flatMap(([name, { fallback }]) =>
          fallback === undefined
            ? []
            : when(name)(
                fallback.keys.map((key) => map(key, '?⇧').to(fallback.to(key))),
              ),
        ),
      ),
    suspend: (name: Name): ToEvent => {
      const suspendedBy = specOf(name).suspendedBy
      if (suspendedBy === undefined) {
        throw new Error(`Layer ${name} cannot be suspended`)
      }
      return toSetVar(suspendedBy, true)
    },
    toReset: [
      ...layers.map(([, { variable }]) => toSetVar(variable, false)),
      ...layerVars.map((name) => toSetVar(name, false)),
    ],
  }
}

export const keyLayer = (
  key: LayerKeyParam,
  variable: string,
  { tap }: { tap?: ToEvent } = {},
) => ({
  rule: (manipulators: ManipulatorMap) => {
    const builder = layer(key, variable)
    if (tap !== undefined)
      builder.configKey((trigger) => trigger.toIfAlone(tap), true)
    return builder.manipulators(manipulators)
  },
  toReset: [toSetVar(variable, 0), toSetVar('__layer', 0)],
})

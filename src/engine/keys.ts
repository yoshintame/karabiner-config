import {
  type FromKeyParam,
  type ManipulatorMap,
  map,
  type ToEvent,
  type ToKeyParam,
  toNone,
} from 'karabiner.ts'

export const none = toNone()

export const disabled = (keys: FromKeyParam[]): ManipulatorMap =>
  Object.fromEntries(keys.map((key) => [key, none]))

export const tapAlone = (
  key: FromKeyParam & ToKeyParam,
  event: ToEvent,
  timeoutMilliseconds?: number,
) => {
  const manipulator = map(key, 'optionalAny').to(key).toIfAlone(event)
  if (timeoutMilliseconds !== undefined) {
    manipulator.parameters({
      'basic.to_if_alone_timeout_milliseconds': timeoutMilliseconds,
    })
  }
  return manipulator
}

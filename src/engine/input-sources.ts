import { ifInputSource, toInputSource } from 'karabiner.ts'

export const toAbc = toInputSource({
  input_source_id: 'com.apple.keylayout.ABC',
})
export const toRussian = toInputSource({
  input_source_id: 'com.apple.keylayout.RussianWin',
})

export const ifEnglish = () => ifInputSource({ language: 'en' })
export const ifNotEnglish = () => ifInputSource({ language: 'en' }).unless()

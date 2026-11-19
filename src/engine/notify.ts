import { to$, type ToEvent } from 'karabiner.ts'

export const notify = (message: string): ToEvent =>
  to$(`osascript -e 'display notification "${message}" with title "Karabiner"'`)

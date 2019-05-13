import en from './en.json'
// import de from './de.json'

type Key = keyof typeof en

export function l10n(key: Key): string {
  return en[key] || key
}


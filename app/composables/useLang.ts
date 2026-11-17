import type { Localized } from '#shared/data/characters'

export type Lang = 'ar' | 'en'

const UI = {
  langSwitch: { ar: 'English', en: 'عربي' },
  sign: { ar: 'باب الحارة', en: 'Bab Al-Hara' },
  intro: {
    ar: '٨ أسئلة عن حياتك اليومية، وبتعرف مين بيشبهك من أهل الحارة.',
    en: 'Eight everyday questions to find out who you are in the hara.',
  },
  start: { ar: 'افتح الباب', en: 'Open the gate' },
  questionOf: { ar: 'السؤال {n} من {total}', en: 'Question {n} of {total}' },
  back: { ar: 'السؤال اللي قبل', en: 'Previous question' },
  scoring: { ar: 'عم نشوف مين بيشبهك…', en: 'Finding your match…' },
  youAre: { ar: 'إنت', en: 'You are' },
  traits: { ar: 'طبعك', en: 'Your nature' },
  underPressure: { ar: 'وقت الضيق', en: 'Under pressure' },
  weakness: { ar: 'نقطة ضعفك', en: 'Your weakness' },
  stats: {
    ar: '{p} من اللي لعبوا طلعوا متلك.',
    en: '{p} of players got the same result.',
  },
  statsFirst: { ar: 'إنت أول واحد بيطلع هالشخصية!', en: "You're the first player to get this character!" },
  share: { ar: 'شارك النتيجة', en: 'Share result' },
  copied: { ar: 'انتسخ الرابط', en: 'Link copied' },
  shareText: { ar: 'طلعت {name} من شخصيات باب الحارة! وإنت مين؟', en: 'I got {name} in the Bab Al-Hara quiz! Who are you?' },
  retake: { ar: 'العب مرة تانية', en: 'Play again' },
  notFound: { ar: 'هالشخصية مش من أهل الحارة.', en: "That character isn't from the hara." },
  home: { ar: 'ارجع عالباب', en: 'Back to the gate' },
} satisfies Record<string, Localized>

export function useLang() {
  const lang = useCookie<Lang>('lang', { default: () => 'ar', sameSite: 'lax', maxAge: 60 * 60 * 24 * 365 })

  /** Pick the current language from a { ar, en } pair. */
  const tr = (value: Localized) => value[lang.value]

  /** UI string by key, with {placeholders} filled in. */
  const t = (key: keyof typeof UI, vars: Record<string, string | number> = {}) =>
    tr(UI[key]).replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))

  const num = (n: number, opts?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(lang.value === 'ar' ? 'ar-SY' : 'en', opts).format(n)

  const toggle = () => {
    lang.value = lang.value === 'ar' ? 'en' : 'ar'
  }

  return { lang, tr, t, num, toggle }
}

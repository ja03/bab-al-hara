// Structured copy of bab-al-hara-characters.md, used by the app to show results.
// If you change a character there, change it here too.

export type Localized = { ar: string; en: string }

export interface Character {
  id: CharacterId
  name: Localized
  role: Localized
  traits: Localized
  underPressure: Localized
  weakness: Localized
  youAreIf: Localized
}

export const CHARACTER_IDS = [
  'abu_issam',
  'abu_shehab',
  'motaz',
  'issam',
  'abu_ghaleb',
  'um_zaki',
  'abu_badr',
  'abu_alnar',
  'souad',
  'ferial',
] as const

export type CharacterId = (typeof CHARACTER_IDS)[number]

export const CHARACTERS: Record<CharacterId, Character> = {
  abu_issam: {
    id: 'abu_issam',
    name: { ar: 'أبو عصام', en: 'Abu Issam' },
    role: { ar: 'حلّاق الحارة وحكيمها', en: "The neighborhood's barber and healer, its wise man" },
    traits: { ar: 'صبور، متسامح، هادي، وبيصالح الناس. بيحلّ المشاكل بالكلمة مش بالإيد.', en: 'Patient, forgiving, calm, a peacemaker. Solves problems with words, not fists.' },
    underPressure: { ar: 'بيضل هادي، بيسمع من الطرفين، وبيدوّر عالحل اللي بيرضي الكل.', en: 'Stays calm, listens to both sides, looks for the solution everyone can live with.' },
    weakness: { ar: 'بيسامح زيادة عن اللزوم، وبتعزّ عليه كلمته بالبيت.', en: 'Forgives too much. Proud when his authority at home is challenged.' },
    youAreIf: { ar: 'صحابك بيجوا ياخدوا رأيك، وبتفضّل تصلّح الخناقة على إنك تربحها.', en: "Friends come to you for advice, and you'd rather fix a fight than win it." },
  },
  abu_shehab: {
    id: 'abu_shehab',
    name: { ar: 'العكيد أبو شهاب', en: 'Al-Eqeed Abu Shehab' },
    role: { ar: 'عكيد الحارة وحاميها', en: 'The strongman and protector of the neighborhood' },
    traits: { ar: 'شجاع، حاسم، صاحب كلمة، قليل الحكي وكتير الفعل. الشباب بيحترموه.', en: 'Brave, decisive, honorable, few words, a lot of action. Respected by the young men.' },
    underPressure: { ar: 'بيمسك الأمور فوراً وبيحمي الناس أول شي.', en: 'Takes charge immediately and protects people first.' },
    weakness: { ar: 'راسه يابس، وإذا عصّب ما بيرجع بسهولة.', en: "Stubborn. Once he's angry, he doesn't back down easily." },
    youAreIf: { ar: 'الكل بيتطلّع عليك وقت الأزمة، وكلمتك ما بتنزل الأرض.', en: "You're the one people look to in a crisis, and you keep your word no matter what." },
  },
  motaz: {
    id: 'motaz',
    name: { ar: 'معتز', en: "Mo'taz" },
    role: { ar: 'ابن أبو عصام الصغير', en: "Abu Issam's younger son" },
    traits: { ar: 'وفي، مليان حماس، بيحمي أهله، وسريع بالتصرّف.', en: 'Loyal, energetic, protective of family, acts fast.' },
    underPressure: { ar: 'بيتصرّف أول وبيفكّر بعدين. بيدافع عن اسم أهله بأرضها.', en: "Reacts first, thinks later. Will defend his family's name on the spot." },
    weakness: { ar: 'دمه حامي، وبيفوت بخناقات كان فيه يتجنّبها.', en: 'Hot-headed. Gets into fights he could have avoided.' },
    youAreIf: { ar: 'بتموت بأرضك لأجل ناسك، والصبر مش أقوى شي فيك.', en: "You'd ride or die for your people, and patience isn't your strongest skill." },
  },
  issam: {
    id: 'issam',
    name: { ar: 'عصام', en: 'Issam' },
    role: { ar: 'ابن أبو عصام الكبير', en: "Abu Issam's eldest son" },
    traits: { ar: 'قلبه طيب، حنون، وبدّه الكل يكون مبسوط.', en: 'Kind-hearted, gentle, wants everyone happy.' },
    underPressure: { ar: 'بيعلق بالنص وبيحاول يرضي الطرفين.', en: 'Gets caught in the middle and tries to please both sides.' },
    weakness: { ar: 'بيهرب من المواجهة وما بيعرف يقول لأ.', en: 'Avoids confrontation, struggles to say no.' },
    youAreIf: { ar: 'بتكره المشاكل، وبطريقة ما دايماً بتلاقي حالك بنص مشاكل غيرك.', en: "You hate conflict and somehow always end up in the middle of other people's drama." },
  },
  abu_ghaleb: {
    id: 'abu_ghaleb',
    name: { ar: 'أبو غالب', en: 'Abu Ghaleb' },
    role: { ar: 'مشكلجي الحارة', en: "The neighborhood's troublemaker" },
    traits: { ar: 'خبيث، بيدقّق عالصغيرة، ما بينسى، ودايماً عنده خطة.', en: 'Sneaky, petty, holds grudges, always has a scheme.' },
    underPressure: { ar: 'بيخطط بالسر بدل ما يواجه.', en: 'Plots quietly instead of facing things head-on.' },
    weakness: { ar: 'خططه عادةً بترتدّ عليه.', en: 'His schemes usually backfire on him.' },
    youAreIf: { ar: 'ما بتنسى مين غلط عليك، ودايماً عندك خطة ب (وج).', en: 'You never forget who wronged you and always have a plan B (and C).' },
  },
  um_zaki: {
    id: 'um_zaki',
    name: { ar: 'أم زكي', en: 'Um Zaki' },
    role: { ar: 'خاطبة الحارة', en: "The neighborhood's matchmaker" },
    traits: { ar: 'اجتماعية، حكّاية، بتعرف الكل، وعارفة أخبار الكل.', en: "Social, talkative, connected, knows everyone's business." },
    underPressure: { ar: 'بتطلع منها بالحكي، وبطريقة ما بتكون عارفة شي مفيد.', en: 'Talks her way through it and somehow knows something useful.' },
    weakness: { ar: 'الخبر بيمشي عندها أسرع من اللازم.', en: 'News travels through her faster than it should.' },
    youAreIf: { ar: 'بتعرف الكل، إنت مصدر الأخبار بالجروب، وبتحب تجوّز الناس.', en: "You know everyone, you're the group chat's source of news, and you love setting people up." },
  },
  abu_badr: {
    id: 'abu_badr',
    name: { ar: 'أبو بدر', en: 'Abu Badr' },
    role: { ar: 'مهضوم الحارة', en: "The neighborhood's comic figure" },
    traits: { ar: 'مهضوم، خجول، رايق، وبيمشي ورا غيره أكتر ما بيقود.', en: 'Funny, timid, easygoing, a follower rather than a leader.' },
    underPressure: { ar: 'بينخضّ شوي، وبعدين بيمشي مع اللي ماسك. وبالبيت، الكلمة الأخيرة لمرته.', en: 'Panics a little, then goes along with whoever is in charge. His wife has the final word at home.' },
    weakness: { ar: 'بيهرب من المسؤولية وبيتراجع بسرعة.', en: 'Avoids responsibility and backs down quickly.' },
    youAreIf: { ar: 'إنت أهضم واحد بالشلّة، وما بدّك تكون مسؤول عن ولا شي.', en: "You're the funniest one in the group and would rather not be in charge of anything." },
  },
  abu_alnar: {
    id: 'abu_alnar',
    name: { ar: 'العكيد أبو النار', en: 'Al-Eqeed Abu Al-Nar' },
    role: { ar: 'عكيد الحارة المنافسة', en: 'The strongman of the rival neighborhood' },
    traits: { ar: 'شايف حاله، صوته عالي، بيحب المنافسة، ووفي لجماعته للآخر.', en: 'Proud, loud, competitive, fiercely loyal to his own side.' },
    underPressure: { ar: 'بيصعّد أول واحد وبيقلب كل شي لتحدّي.', en: 'Escalates first and turns everything into a rivalry.' },
    weakness: { ar: 'الكبرياء وخلقه الضيق.', en: 'Pride and a short temper.' },
    youAreIf: { ar: 'بتحب المنافسة كتير، بتدافع عن فريقك مهما صار، وما بتقدر تسكت عن تحدّي.', en: "You're very competitive, you defend your team no matter what, and you can't let a challenge go." },
  },
  souad: {
    id: 'souad',
    name: { ar: 'سعاد (أم عصام)', en: 'Souad (Um Issam)' },
    role: { ar: 'مرت أبو عصام وأخت أبو شهاب', en: "Abu Issam's wife and Abu Shehab's sister" },
    traits: { ar: 'قوية الشخصية، عزيزة نفس، وبتقول اللي بتفكّر فيه.', en: 'Strong-willed, proud, outspoken, says what she thinks.' },
    underPressure: { ar: 'بتثبت على موقفها، حتى لو كلّفها.', en: 'Stands her ground, even when it costs her.' },
    weakness: { ar: 'كلمة حادة زيادة.', en: 'One sharp word too many.' },
    youAreIf: { ar: 'بتقول رأيك، ما بتخلّي حدا يتطاول عليك، وكرامتك فوق كل شي.', en: "You speak your mind, you don't let anyone talk down to you, and you have a strong sense of dignity." },
  },
  ferial: {
    id: 'ferial',
    name: { ar: 'فريال', en: 'Ferial' },
    role: { ar: 'أم لطفية (مرت عصام)', en: "Mother of Lotfiya (Issam's wife)" },
    traits: { ar: 'بتحب تتحكّم، بتخطط، ودايماً إلها رأي بجوازات الناس.', en: "Controlling, scheming, always has an opinion on other people's marriages." },
    underPressure: { ar: 'بتخربط الأمور لتوصل للي بدها ياه.', en: 'Stirs things up to get her way.' },
    weakness: { ar: 'بتعمل مشاكل أكتر من اللي بتحلّها.', en: 'Creates more problems than she solves.' },
    youAreIf: { ar: 'بتحب تكون ماسك زمام الأمور، ودايماً عندك شي تقوله عن حياة الكل.', en: "You like to be in control and you always have something to say about everyone's life." },
  },
}

export function isCharacterId(value: unknown): value is CharacterId {
  return typeof value === 'string' && (CHARACTER_IDS as readonly string[]).includes(value)
}

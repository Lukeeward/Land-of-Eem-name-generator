const ONSET_CHANCE = 0.83
const CODA_CHANCE = 0.55
const TWO_SEGMENT_SURNAME_CHANCE = 0.42
const SURNAME_CHANCE = 0.35
const BANE_CHANCE = 0.15

function chance(p) {
  return Math.random() < p
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])
const startsWithVowel = s => s.length > 0 && VOWELS.has(s.charAt(0))

function buildFirstNameAttempt(fragments, pick) {
  const onset = chance(ONSET_CHANCE) ? pick(fragments.firstNameOnsets) : ''
  const vowel = pick(fragments.firstNameVowels)
  const suffix = pick(fragments.firstNameSuffixes)
  const coda = startsWithVowel(suffix)
    ? pick(fragments.firstNameCodas)
    : (chance(CODA_CHANCE) ? pick(fragments.firstNameCodas) : '')
  return onset + vowel + coda + suffix
}

function buildFirstName(fragments, pick) {
  let result
  do { result = buildFirstNameAttempt(fragments, pick) } while (result.length < 3)
  return capitalize(result)
}

function buildSurnameSegmentAttempt(fragments, pick) {
  const onset = pick(fragments.surnameOnsets)
  const vowel = pick(fragments.surnameVowels)
  const suffix = pick(fragments.surnameSuffixes)
  const coda = startsWithVowel(suffix)
    ? pick(fragments.surnameCodas)
    : (chance(0.6) ? pick(fragments.surnameCodas) : '')
  return onset + vowel + coda + suffix
}

function buildSurnameSegment(fragments, pick) {
  let result
  do { result = buildSurnameSegmentAttempt(fragments, pick) } while (result.length < 2)
  return result
}

function buildSurname(fragments, pick) {
  const seg1 = buildSurnameSegment(fragments, pick)
  if (!chance(TWO_SEGMENT_SURNAME_CHANCE)) return capitalize(seg1)
  let seg2
  do {
    seg2 = buildSurnameSegment(fragments, pick)
  } while (seg2.toLowerCase() === seg1.toLowerCase())
  return capitalize(seg1 + seg2)
}

export const gnomes = {
  id: 'gnomes',
  label: 'Gnomes',
  fragments: {
    firstNameOnsets: ['l', 'n', 'g', 'd', 'wh', 'ch', 'c', 'sp', 'w', 'h', 'r', 'j', 'p'],
    firstNameVowels: ['a', 'e', 'i', 'o', 'u', 'oo'],
    firstNameCodas: ['n', 'r', 'l', 'm', 'rl', 'ld'],
    firstNameSuffixes: ['us', 'opold', 'man', 'dy', 'amina', 'otheen', 'ga', 'lotte',
      'stance', 'ky', 'er', 'la', 'rip', 'mor', 'ing', ''],

    surnameOnsets: ['f', 'c', 'n', 'h', 'wh', 'g', 'pr', 't', 'd', 'w', 'b', 'st', 'j', 'm'],
    surnameVowels: ['a', 'e', 'i', 'o', 'u', 'ee'],
    surnameCodas: ['d', 'n', 'b', 'bb', 'm', 'p', 'ck', 'mp', 'l', 't'],
    surnameSuffixes: ['dle', 'et', 'dy', 'ers', 'der', 'ber', 'per', 'ty', ''],

    baneLetters: ['L.', 'C.', 'J.', 'G.', 'P.', 'W.'],
  },
  flavor: {
    homelands: ["The Drippy Downs", "The Quagmash", "River Country", "The Dingledell"],
    quirks: [
      "keeps a small animal companion, like a songbird or bunny",
      "can converse with critters and insects",
      "has a famously strong will",
      "will never run from a fight before others do",
      "feels physically ill when telling a lie",
      "wears a hat color that says a lot about who they are",
    ],
  },
  assemble: ({ fragments, pick }) => {
    const firstName = buildFirstName(fragments, pick)
    const short = firstName

    if (!chance(SURNAME_CHANCE)) return { full: firstName, short }

    const surname = buildSurname(fragments, pick)
    const initial = `${firstName.charAt(0)}.`
    const hasBaneLetter = fragments.baneLetters.includes(initial)
    const full = (hasBaneLetter && chance(BANE_CHANCE))
      ? `${initial} ${firstName} ${surname}`
      : `${firstName} ${surname}`

    return { full, short }
  },
}

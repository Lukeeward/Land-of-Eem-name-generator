const SYLLABLE_COUNT_WEIGHTS = [
  { count: 1, chance: 0.30 },
  { count: 2, chance: 0.85 },
  { count: 3, chance: 1.00 },
]
const SURNAME_CHANCE = 0.15

function chance(p) {
  return Math.random() < p
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function pickSyllableCount() {
  const r = Math.random()
  return SYLLABLE_COUNT_WEIGHTS.find(w => r < w.chance).count
}

function buildRoot(fragments, pick, { terminal }) {
  const onset = chance(0.9) ? pick(fragments.onsets) : ''
  const vowel = pick(fragments.vowels)
  const codaBank = terminal ? fragments.terminalCodas : fragments.codas
  const coda = chance(0.4) ? pick(codaBank) : ''
  return `${onset}${vowel}${coda}`
}

function buildMidSyllable(fragments, pick) {
  return `${pick(fragments.midOnsets)}${pick(fragments.midVowels)}`
}

function hasBadCluster(s) {
  return /(.)\1\1/.test(s) || /[^aeiou]{4,}/.test(s)
}

function buildFirstNameAttempt(fragments, pick) {
  const syllables = pickSyllableCount()
  if (syllables === 1) {
    let root
    do { root = buildRoot(fragments, pick, { terminal: true }) } while (root.length < 3)
    return capitalize(root)
  }
  const root = buildRoot(fragments, pick, { terminal: false })
  if (syllables === 2) return capitalize(root + pick(fragments.flavorEndings))
  return capitalize(root + buildMidSyllable(fragments, pick) + pick(fragments.flavorEndings))
}

function buildFirstName(fragments, pick) {
  let result
  do { result = buildFirstNameAttempt(fragments, pick) } while (hasBadCluster(result))
  return result
}

function buildSurname(fragments, pick) {
  const onset = pick(fragments.onsets)
  const vowel = pick(fragments.vowels)
  const coda = chance(0.5) ? pick(fragments.codas) : ''
  return capitalize(`${onset}${vowel}${coda}${pick(fragments.surnameSuffixes)}`)
}

export const shryms = {
  id: 'shryms',
  label: 'Shryms',
  flavor: {
    homelands: [
      "The Used T'Be Forest", "The Drippy Downs", "The Quagmash",
      "River Country", "Fleabag County", "Scalawag Strand",
    ],
    quirks: [
      "learned mechanics and engineering young",
      "holds one particular piece of gear very dear",
      "resistant to poison after ages of conflict with desert serpents",
      "carries a thousand-year-old fear of snakes",
      "struggles to see anything at a distance",
    ],
  },
  fragments: {
    onsets: ['th', 'qu', 'sh', 'k', 'f', 'r', 'v', 'd', 'h', 'n', 'sk', 'm', 'w', 'p'],
    vowels: ['a', 'e', 'i', 'o', 'u', 'oo', 'ee', 'ar', 'or', 'ow', 'er'],
    codas: ['t', 'd', 'n', 'm', 'l', 'r'],
    terminalCodas: ['t', 'd', 'n', 'm', 'l', 'r', 'ng', 'ff'],
    flavorEndings: [
      'dare', 'bly', 'na', 'die', 'ger', 'ma', 'than', 'fox', 'dle', 'tha', 'wise', 'ra', 'dus',
    ],
    midOnsets: ['l', 'd', 'm', 'g', 'f', 'b', 'w', 'j', 'n', 'r', 't', 'k', 's', 'th', 'sh'],
    midVowels: ['a', 'e', 'i', 'o', 'u'],
    surnameSuffixes: ['dle', 'ling'],
  },
  assemble: ({ fragments, pick }) => {
    const firstName = buildFirstName(fragments, pick)
    const short = firstName
    const full = chance(SURNAME_CHANCE)
      ? `${firstName} ${buildSurname(fragments, pick)}`
      : firstName
    return { full, short }
  },
}

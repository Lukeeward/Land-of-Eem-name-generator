const SOLO_CHANCE = 0.25
const SOFT_CHANCE = 0.5

function chance(p) {
  return Math.random() < p
}

function hasTripleLetterRun(word) {
  return /(.)\1\1/.test(word)
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function buildHard(fragments, pick) {
  let word
  do {
    word = `${pick(fragments.onsets)}${pick(fragments.vowels)}${pick(fragments.codas)}`
  } while (hasTripleLetterRun(word) || word.length < 3)
  return capitalize(word)
}

function buildSoft(fragments, pick) {
  let word
  do {
    word = `${pick(fragments.onsets)}${pick(fragments.vowels)}${pick(fragments.tails)}`
  } while (hasTripleLetterRun(word))
  return capitalize(word)
}

function buildGooName(fragments, pick) {
  if (chance(SOLO_CHANCE)) return pick(fragments.soloNames)
  return chance(SOFT_CHANCE) ? buildSoft(fragments, pick) : buildHard(fragments, pick)
}

export const gelatinousGoos = {
  id: 'gelatinousGoos',
  label: 'Gelatinous Goos',
  fragments: {
    onsets: ['g', 'squ', 'fl', 'bl', 'sp', 'wr', 'l', 'ch', 'm'],
    vowels: ['oo', 'oo', 'oo', 'i', 'u', 'o', 'aw'],
    codas: ['p', 'g', 'sh', 'rp'],
    tails: ['ey', 'mmy', 'nky', 'lee', 'ggle'],
    soloNames: ['Gooey', 'Squish', 'Squoop', 'Florp', 'Bloog', 'Gummy', 'Spunky', 'Wriggle', 'Loog', 'Chawlee', 'Moop'],
  },
  flavor: {
    homelands: ["The Underlands"],
    quirks: [
      "forages for gems and ore",
      "unbothered by molten heat",
      "squeezes through the tightest cracks",
      "struggles to communicate without a translator nearby",
      "gets by without any legs to speak of",
    ],
  },
  assemble: ({ fragments, pick }) => {
    const name = buildGooName(fragments, pick)
    return { full: name, short: name }
  },
}

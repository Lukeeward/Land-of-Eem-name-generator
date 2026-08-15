const SOLO_CHANCE = 0.2
const MONO_CHANCE = 0.3
const SOFT_TAIL_CHANCE = 0.5

function chance(p) {
  return Math.random() < p
}

function hasTripleLetterRun(word) {
  return /(.)\1\1/.test(word)
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function firstSyllable(fragments, pick) {
  const onset = chance(0.15)
    ? pick(fragments.rareOnsetClusters)
    : chance(0.9) ? pick(fragments.onsets) : ''
  const vowel = pick(fragments.vowels)
  return onset + vowel
}

function plainSyllable(fragments, pick) {
  const onset = chance(0.9) ? pick(fragments.onsets) : ''
  const vowel = pick(fragments.vowels)
  return onset + vowel
}

function buildQuortleName(fragments, pick) {
  if (chance(SOLO_CHANCE)) return pick(fragments.soloNames)

  let word
  do {
    if (chance(MONO_CHANCE)) {
      word = firstSyllable(fragments, pick) + pick(fragments.finalCodas)
    } else if (chance(SOFT_TAIL_CHANCE)) {
      word = firstSyllable(fragments, pick) + (chance(0.55) ? pick(fragments.midCodas) : '') + pick(fragments.tails)
    } else {
      word = firstSyllable(fragments, pick) + (chance(0.6) ? pick(fragments.midCodas) : '') + plainSyllable(fragments, pick) + pick(fragments.finalCodas)
    }
  } while (hasTripleLetterRun(word) || word.length > 9 || word.length < 3)

  return capitalize(word)
}

export const quortles = {
  id: 'quortles',
  label: 'Quortles',
  fragments: {
    onsets: ['s', 'sh', 'w', 'p', 'r', 'm', 'k', 'd', 'qu'],
    rareOnsetClusters: ['spr', 'shn'],
    vowels: ['a', 'e', 'i', 'o', 'oo', 'oo', 'ee'],
    midCodas: ['n', 'l', 't', 'r', 'p'],
    finalCodas: ['n', 'l', 't', 'ff', 'sh', 'rk', 'r', 'p'],
    tails: ['ple', 'kle', 'ny', 'li'],
    soloNames: ['Quoff', 'Moosh', 'Cork', 'Andar'],
  },
  flavor: {
    homelands: ["The Drippy Downs", "The Quagmash", "River Country", "Scalawag Strand"],
    quirks: [
      "picked up alchemy at a young age",
      "perfectly at home underwater",
      "tougher than that shell looks",
      "avoids physical confrontation on principle",
      "not built for sprinting",
    ],
  },
  assemble: ({ fragments, pick }) => {
    const name = buildQuortleName(fragments, pick)
    return { full: name, short: name }
  },
}

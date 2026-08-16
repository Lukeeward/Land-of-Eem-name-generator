const APOSTROPHE_CHANCE = 0.5 
const EPITHET_CHANCE = 0.1     
const TWO_SYLLABLE_CHANCE = 0.7 

function chance(p) {
  return Math.random() < p
}

function buildSyllable(fragments, pick, { vowelBank = fragments.vowels, forceOnset = false } = {}) {
  const useCluster = chance(0.1)
  const onset = useCluster
    ? pick(fragments.rareOnsetClusters)
    : (forceOnset || chance(0.8)) ? pick(fragments.onsets) : ''
  const vowel = pick(vowelBank)
  const coda = chance(0.45) ? pick(fragments.codas) : ''
  return { text: `${onset}${vowel}${coda}`, coda }
}

function buildSegmentAttempt(fragments, pick) {
  const first = buildSyllable(fragments, pick)
  if (!chance(TWO_SYLLABLE_CHANCE)) return first.text

  const geminate = first.coda && chance(0.25)
  const onset2 = geminate ? first.coda : pick(fragments.onsets)
  const vowel2 = pick(fragments.secondSyllableVowels)
  const coda2 = chance(0.4) ? pick(fragments.codas) : ''
  return `${first.text}${onset2}${vowel2}${coda2}`
}

function buildSegment(fragments, pick) {
  let result
  do {
    result = buildSegmentAttempt(fragments, pick)
  } while (result.length < 3)
  return result
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const sarpathi = {
  id: 'sarpathi',
  label: 'Sarpathi',
  fragments: {
    onsets: ['z', 's', 'sh', 'n', 'r', 'th', 'v', 'ss', 'zh'],
    rareOnsetClusters: ['dr', 'zr', 'shr'],
    vowels: ['a', 'i', 'u', 'o'],
    secondSyllableVowels: ['a', 'a', 'a', 'i', 'u', 'o'],
    codas: ['r', 'z', 'n', 'th', 'th', 's', 'x'],
    epithets: [
      'the Rough',
      'the Coiled',
      'the Venom-Tongued',
      'the Unblinking',
      'the Pit Lord',
      'the Scale-Bound',
      'the Hollow-Fanged',
      'the Ash Serpent',
    ],
  },
  assemble: ({ fragments, pick }) => {
    const firstSegment = capitalize(buildSegment(fragments, pick))
    const short = firstSegment

    let base = firstSegment
    if (chance(APOSTROPHE_CHANCE)) {
      let second
      do {
        second = buildSegment(fragments, pick)
      } while (second.toLowerCase() === firstSegment.toLowerCase())
      base = `${firstSegment}'${second}`
    }

    const full = chance(EPITHET_CHANCE)
      ? `${base} ${pick(fragments.epithets)}`
      : base

    return { full, short }
  },
  flavor: {
    homelands: ["The Drippy Downs", "The Underlands"],
    quirks: [
      "Serves the Cult of Ehk above all else",
      "Sheds its skin and leaves flakes of scales in its wake",
      "Hisses at the first sign of danger, and strikes without warning",
      "Wary of outsiders",
      "Holds a grudge for a long long time",
    ],
  },
}

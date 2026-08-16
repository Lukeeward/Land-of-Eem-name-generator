const SEGMENT_COUNT_WEIGHTS = [
  { count: 2, chance: 0.6 },
  { count: 3, chance: 0.9 },
  { count: 4, chance: 1.0 },
]

function pickSegmentCount() {
  const r = Math.random()
  return SEGMENT_COUNT_WEIGHTS.find(w => r < w.chance).count
}

function chance(p) {
  return Math.random() < p
}

function maybeDoubleVowel(vowel) {
  if (vowel === 'y') return vowel
  return chance(0.17) ? vowel + vowel : vowel
}

function buildSyllable(fragments, pick, { allowCluster = true, codaChance = 0.3 } = {}) {
  const useCluster = allowCluster && chance(0.06)
  const onset = useCluster ? pick(fragments.rareOnsetClusters) : pick(fragments.onsets)
  const nucleus = maybeDoubleVowel(pick(fragments.vowels))
  const closed = chance(codaChance)
  const coda = closed ? pick(fragments.codas) : ''
  return { text: `${onset}${nucleus}${coda}`, closed }
}

function buildFirstSegmentAttempt(fragments, pick) {
  const onset1 = chance(0.9) ? pick(fragments.onsets) : ''
  const nucleus1 = maybeDoubleVowel(pick(fragments.vowels))

  let coda1 = ''
  let geminate = false
  if (chance(0.28)) {
    coda1 = pick(fragments.codas)
    geminate = chance(0.1)
  }

  const onset2 = geminate ? coda1 : pick(fragments.onsets)
  const nucleus2 = maybeDoubleVowel(pick(fragments.firstSegmentFinalVowels))

  return `${onset1}${nucleus1}${coda1}${onset2}${nucleus2}`
}

function buildFirstSegment(fragments, pick) {
  let result
  do {
    result = buildFirstSegmentAttempt(fragments, pick)
  } while (result.length < 3)
  return result.charAt(0).toUpperCase() + result.slice(1)
}

function pickExtraSyllableCount() {
  const r = Math.random()
  if (r < 0.2) return 1
  if (r < 0.85) return 2
  if (r < 0.95) return 3
  return 5
}

function buildFlavorSyllable(fragments, pick) {
  const onset = pick(fragments.onsets)
  return `${onset}${pick(fragments.flavorEndings)}`
}

function buildFinalSyllable(fragments, pick, prevClosed) {
  if (chance(0.5)) {
    if (chance(0.5)) {
      return buildFlavorSyllable(fragments, pick)
    }
    return buildSyllable(fragments, pick, { allowCluster: !prevClosed, codaChance: 1 }).text
  }
  return buildSyllable(fragments, pick, { allowCluster: !prevClosed, codaChance: 0 }).text
}

function buildExtraSegmentAttempt(fragments, pick) {
  const syllableCount = pickExtraSyllableCount()

  if (syllableCount === 5) {
    let word = ''
    for (let i = 0; i < 3; i++) {
      word += buildSyllable(fragments, pick, { allowCluster: false, codaChance: 0 }).text
    }
    return word + buildFlavorSyllable(fragments, pick)
  }

  let word = ''
  let prevClosed = false
  for (let i = 0; i < syllableCount; i++) {
    const isFinal = i === syllableCount - 1
    if (isFinal) {
      word += buildFinalSyllable(fragments, pick, prevClosed)
    } else {
      const { text, closed } = buildSyllable(fragments, pick, { allowCluster: !prevClosed, codaChance: 0.25 })
      word += text
      prevClosed = closed
    }
  }
  return word
}

function buildExtraSegment(fragments, pick) {
  let result
  do {
    result = buildExtraSegmentAttempt(fragments, pick)
  } while (result.length < 2)
  return result
}

export const mushrums = {
  id: 'mushrums',
  label: 'Mushrums',
  flavor: {
    homelands: ["The Underlands", "The Quagmash"],
    quirks: [
      "Shakes spores into the air when excited",
      "Excessively curious, and often gets into trouble",
      "Morally good to a fault, and often taken advantage of",
      "Has no real concept of frugality",
      "Takes things a little too literally",
    ],
  },
  fragments: {
    onsets: ['b', 'd', 'f', 'g', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 't', 'w', 'z'],
    rareOnsetClusters: ['fr', 'gr', 'dr', 'pl', 'tr'], 
    vowels: ['a', 'e', 'i', 'o', 'u', 'y'],
    firstSegmentFinalVowels: ['a', 'o'], // a first segment 2nd syllable seems to always be a or o
    codas: ['b', 'd', 'g', 'k', 'm', 'n', 's', 'x', 'z'],
    flavorEndings: ['ungus', 'unga', 'away', 'ax', 'ok', 'orn', 'ak'],
  },
  assemble: ({ fragments, pick }) => {
    const segmentCount = pickSegmentCount()
    const first = buildFirstSegment(fragments, pick)
    const segments = [first]

    let previous = null
    for (let i = 1; i < segmentCount; i++) {
      let next
      do {
        next = buildExtraSegment(fragments, pick)
      } while (next === previous)
      segments.push(next)
      previous = next
    }

    return { full: segments.join("'"), short: first }
  },
}

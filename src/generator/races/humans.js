const LEGENDARY_CHANCE = 0.2
const SURNAME_CHANCE = 0.5
const EPITHET_CHANCE = 0.08

function chance(p) {
  return Math.random() < p
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function buildSyllable(fragments, pick, { codaChance = 0.4, noOnsetChance = 0.08, allowFinalCoda = false } = {}) {
  const onset = chance(noOnsetChance) ? '' : pick(fragments.onsets)
  const vowel = pick(fragments.vowels)
  const closed = chance(codaChance)
  let coda = ''
  if (closed) {
    coda = allowFinalCoda
      ? pick([...fragments.midCodas, ...fragments.finalOnlyCodas])
      : pick(fragments.midCodas)
  }
  return { text: `${onset}${vowel}${coda}`, closed }
}

function buildFirstNameCommon(fragments, pick) {
  let result
  do {
    if (chance(0.6)) {
      const first = buildSyllable(fragments, pick, { codaChance: 0.55, allowFinalCoda: false })
      const second = buildSyllable(fragments, pick, { codaChance: 0.35, noOnsetChance: 0, allowFinalCoda: true })
      result = first.text + second.text
    } else {
      result = buildSyllable(fragments, pick, { codaChance: 1, allowFinalCoda: true }).text
    }
  } while (result.length < 3)
  return capitalize(result)
}

function buildSurnameRoot(fragments, pick) {
  let result
  do {
    result = buildSyllable(fragments, pick, { codaChance: 1, allowFinalCoda: true }).text
  } while (result.length < 3)
  return result
}

function buildSuffixedSurnameRoot(fragments, pick) {
  let result
  do {
    result = buildSyllable(fragments, pick, { codaChance: 1, allowFinalCoda: false }).text
  } while (result.length < 3)
  return result
}

function buildSurname(fragments, pick) {
  if (chance(0.5)) return capitalize(buildSurnameRoot(fragments, pick))
  return capitalize(buildSuffixedSurnameRoot(fragments, pick) + 'er' + pick(fragments.surnameSuffixes))
}

export const humans = {
  id: 'humans',
  label: 'Humans',
  fragments: {
    onsets: ['c', 'sh', 'kn', 'r', 'h', 'n', 'g', 'k', 't', 'kl', 'gr', 'b', 'd', 'f', 'l', 'm', 'p', 'w'],
    vowels: ['a', 'e', 'i', 'o', 'u', 'oo'],
    midCodas: ['n', 'l', 'd', 'b', 'g', 'k', 'm', 's', 't', 'bb'],
    finalOnlyCodas: ['p', 'nk', 'nce', 'rf', 'ch'],
    firstNameLegendary: ['Percival', 'Gwendolyn', 'Lyra', 'Lionen'],
    surnameSuffixes: ['son', 'dee', 'ford', 'well', 'ton', 'wick'],
    epithets: ['the Ochre'],
  },
  flavor: {
    homelands: [
      "The Used T'Be Forest", "The Drippy Downs", "The Quagmash",
      "River Country", "Fleabag County", "Scalawag Strand",
    ],
    quirks: [
      "well-rounded out of necessity, having grown up somewhere remote",
      "looks to old hero stories for inspiration in desperate moments",
      "has endured hardship since the golden days of yore",
      "a rare sight these days, sticking out in a crowd",
      "human history is lost to time, wrapped in half-remembered myth",
    ],
  },
  assemble: ({ fragments, pick }) => {
    const firstName = chance(LEGENDARY_CHANCE)
      ? pick(fragments.firstNameLegendary)
      : buildFirstNameCommon(fragments, pick)
    const short = firstName

    const r = Math.random()
    let full
    if (r < EPITHET_CHANCE) {
      full = `${firstName} ${pick(fragments.epithets)}`
    } else if (r < EPITHET_CHANCE + SURNAME_CHANCE) {
      full = `${firstName} ${buildSurname(fragments, pick)}`
    } else {
      full = firstName
    }

    return { full, short }
  },
}

const NO_ENDING_CHANCE = 0.15   // ~4/21 attested words are bare monosyllables
const CORE_CODA_CHANCE = 0.92   // only Gravy among endinged words lacks a coda
const SECOND_WORD_CHANCE = 0.12 // keep existing value

function chance(p) {
  return Math.random() < p
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function buildCore(fragments, pick, { forceCoda = false, codaChance = CORE_CODA_CHANCE, avoidCodaEndingIn = null } = {}) {
  const onset = pick(fragments.onsets)
  const vowel = pick(fragments.vowels)
  let coda = ''
  if (forceCoda || chance(codaChance)) {
    let tries = 0
    do {
      coda = pick(fragments.codas)
      tries++
    } while (avoidCodaEndingIn && coda.endsWith(avoidCodaEndingIn) && tries < 10)
  }
  return onset + vowel + coda
}

const BLOCKED_WORDS = ['bitch']

function buildMonosyllable(fragments, pick) {
  let result
  do {
    result = buildCore(fragments, pick, { forceCoda: true })
  } while (result.length < 3 || BLOCKED_WORDS.includes(result))
  return result
}

function buildNickname(fragments, pick) {
  if (chance(NO_ENDING_CHANCE)) return buildMonosyllable(fragments, pick)
  const ending = pick(fragments.endings)
  const core = buildCore(fragments, pick, {
    codaChance: ending === 'vy' ? 0 : CORE_CODA_CHANCE,
    avoidCodaEndingIn: ending.charAt(0),
  })
  return core + ending
}

export const skeletons = {
  id: 'skeletons',
  label: 'Skeletons',
  flavor: {
    homelands: ["The Underlands"],
    quirks: [
      "yearns to tie up the loose ends of a forgotten past",
      "has no need to eat, though some insist on the ritual anyway",
      "tougher than bone has any right to be",
      "feared and disliked by common folk on sight",
      "more fragile than they let on",
    ],
  },
  fragments: {
    onsets: ['r', 'str', 'sl', 'sk', 'st', 'l', 'b', 'gr', 'tw', 'br', 'cl', 'cr', 'kn', 'm', 'h', 'ch', 'w', 'spl',
             'dr', 'fl', 'sn'],
    vowels: ['i', 'e', 'a', 'o', 'u', 'ea'],
    codas: ['ck', 'nn', 'nk', 'n', 'gg', 'tt', 'k', 'b', 'rr', 'll', 'lk', 'nt', 'm', 'sp', 'tch', 'ff', 'ss'],
    endings: ['y', 'y', 'y', 's', 'es', 'le', 'les', 'er', 'ers', 'ow', 'ety', 'vy'],
  },
  assemble: ({ fragments, pick }) => {
    const nickname = capitalize(buildNickname(fragments, pick))
    const short = nickname

    let full = nickname
    if (chance(SECOND_WORD_CHANCE)) {
      let second
      do {
        second = capitalize(buildMonosyllable(fragments, pick))
      } while (second === nickname)
      full = `${nickname} ${second}`
    }

    return { full, short }
  },
}

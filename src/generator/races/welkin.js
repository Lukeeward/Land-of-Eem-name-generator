const FIRST_NAME_SOLO_CHANCE = 0.2
const SURNAME_CHANCE = 0.25
const SURNAME_SOLO_CHANCE = 0.3

function chance(p) {
  return Math.random() < p
}

function hasTripleLetterRun(word) {
  return /(.)\1\1/.test(word)
}

function buildFirstName(fragments, pick) {
  if (chance(FIRST_NAME_SOLO_CHANCE)) return pick(fragments.firstNameSolo)
  let name
  do {
    name = `${pick(fragments.firstNamePrefixes)}${pick(fragments.firstNameSuffixes)}`
  } while (hasTripleLetterRun(name))
  return name
}

function buildSurname(fragments, pick) {
  if (chance(SURNAME_SOLO_CHANCE)) return pick(fragments.surnameSolo)
  let name
  do {
    name = `${pick(fragments.surnamePrefixes)}${pick(fragments.surnameSuffixes)}`
  } while (hasTripleLetterRun(name))
  return name
}

export const welkin = {
  id: 'welkin',
  label: 'Welkin',
  fragments: {
    firstNamePrefixes: [
      'Kor', 'Ty', 'Ro', 'Per', 'Eg', 'Mel', 'Hoo', 'Wim', 'Nan',
      'Lar', 'Wren', 'Fen', 'Or', 'Syl', 'Bry', 'Lyn', 'Cor', 'Fin', 'Del', 'Ash', 'Sol', 'Pip',
    ],
    firstNameSuffixes: [
      'binn', 'ra', 'en', 'ody', 'na', 'bly', 'wich',
      'wen', 'lin', 'ora', 'wyn', 'ley', 'ette', 'ana', 'ith',
    ],
    firstNameSolo: ['Jae', 'Zygo', 'Calamus', 'Wren', 'Lark', 'Sky', 'Fable', 'Rue'],
    surnamePrefixes: [
      'Down', 'Beak',
      'Wing', 'Feather', 'Crest', 'Talon', 'Plume', 'Quill', 'Nest', 'Song', 'Cloud', 'Dew', 'Moss', 'Bramble', 'Reed',
    ],
    surnameSuffixes: [
      'wattle', 'man',
      'wick', 'wood', 'ford', 'bury', 'song', 'warble', 'thistle', 'hollow',
    ],
    surnameSolo: ['Chants', 'Warbles', 'Trills', 'Chirps', 'Coos', 'Flutters', 'Murmurs'],
  },
  flavor: {
    homelands: ["River Country", "Fleabag County", "Scalawag Strand"],
    quirks: [
      "communicates with birds through whistled birdsong",
      "some sport a pelican-like bill, common in coastal regions",
      "tires quickly in flight, much like a human running",
      "can't carry much thanks to hollow bones",
      "light frame doesn't hold up well in a fight",
    ],
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

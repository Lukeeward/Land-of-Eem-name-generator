const FIRST_NAME_SOLO_CHANCE = 0.35
const SURNAME_CHANCE = 0.45
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

export const boggles = {
  id: 'boggles',
  label: 'Boggles',
  fragments: {
    firstNamePrefixes: [
      'Fid', 'Run', 'Zoo', 'Glis', 'Flo',
      'Fip', 'Zib', 'Wonk', 'Nib', 'Tug', 'Skit', 'Bink',
    ],
    firstNameSuffixes: [
      'get', 'ner', 'ty', 'sta', 'ra',
      'ick', 'o', 'ums', 'et', 'ie',
    ],
    firstNameSolo: ['Hooch', 'Bip', 'Bop', 'Malk', 'Hub', 'Gorl', 'Ophelia', 'Sheanine', 'Ewika'],
    surnamePrefixes: [
      'Zoo', 'Shark', 'Dona', 'Hub', 'Pee',
      'Wig', 'Muck', 'Snig',
    ],
    surnameSuffixes: [
      'wurther', 'ey', 'hee', 'ford', 'weevil',
      'wick', 'er', 'ott',
    ],
    surnameSolo: ['Shremp', 'Nok', 'Tak'],
  },
  flavor: {
    homelands: [
      "The Used T'Be Forest", "The Drippy Downs", "The Quagmash",
      "River Country", "Fleabag County", "The Underlands", "Scalawag Strand",
    ],
    quirks: [
      "Loves other boggles, and will go out of their way to help them",
      "Devious and mischievous, and loves to play pranks on others",
      "Prefers to sit out of sight and watch the world go by",
      "Afraid of the dark, and will avoid it at all costs",
      "Bored easily, and will often wander off to find something more interesting",
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

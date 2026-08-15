// This is the playable Goblins Folk (Rulebook p.60), not "River Goblins"
// (a separate Bestiary adversary race) — do not conflate the two.
const FIRST_NAME_SOLO_CHANCE = 0.5
const SURNAME_SOLO_CHANCE = 0.25
const TITLE_CHANCE = 0.1
const SURNAME_CHANCE = 0.55

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

export const goblins = {
  id: 'goblins',
  label: 'Goblins',
  fragments: {
    firstNameSolo: [
      'Rog', 'Keef', 'Marj', 'Lloyd', 'Blanch', 'Earl', 'Hank', 'Pepper',
      'Vinny', 'Harriet', 'Krog', 'Tog', 'Squobb', 'Ral',
    ],
    firstNamePrefixes: ['Frow', 'Skam', 'Broom', 'Rag', 'Nash', 'Shun', 'Hank', 'Gra'],
    firstNameSuffixes: ['na', 'py', 'hilda', 'tack', 'ur', 'dra', 'le', 'ag'],
    surnamePrefixes: [
      'Tan', 'Grunk', 'Chum', 'Zw', 'Chee', 'Squee', 'Spam', 'Dun', 'Gang', 'Gar', 'Grab',
    ],
    surnameSuffixes: [
      'dy', 'kles', 'ps', 'itch', 'vel', 'ge', 'widge', 'dood', 'doon', 'roo', 'goon', 'ba',
    ],
    surnameSolo: ['Tandy', 'Chumps', 'Grabba', 'Gargoon'],
    titles: ['Captain', 'Taskmaster', 'King'],
  },
  flavor: {
    homelands: [
      "The Used T'Be Forest", "The Drippy Downs", "The Quagmash",
      "River Country", "Fleabag County", "The Underlands", "Scalawag Strand",
    ],
    quirks: [
      "studies architecture and construction for fun",
      "enrolled in a trade school young",
      "sees clearly in the dark after ages underground",
      "always wants the best clothes and finest food",
      "never forgets an old grudge",
    ],
  },
  assemble: ({ fragments, pick }) => {
    const firstName = buildFirstName(fragments, pick)
    const short = firstName

    const r = Math.random()
    let full
    if (r < TITLE_CHANCE) {
      full = `${pick(fragments.titles)} ${firstName}`
    } else if (r < TITLE_CHANCE + SURNAME_CHANCE) {
      full = `${firstName} ${buildSurname(fragments, pick)}`
    } else {
      full = firstName
    }

    return { full, short }
  },
}

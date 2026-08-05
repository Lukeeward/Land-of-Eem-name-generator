const FIRST_NAME_SOLO_CHANCE = 0.2
const SURNAME_CHANCE = 0.5
const SURNAME_SOLO_CHANCE = 0.3

function chance(p) {
  return Math.random() < p
}

function buildFirstName(fragments, pick) {
  if (chance(FIRST_NAME_SOLO_CHANCE)) return pick(fragments.firstNameSolo)
  return `${pick(fragments.firstNamePrefixes)}${pick(fragments.firstNameSuffixes)}`
}

function buildSurname(fragments, pick) {
  if (chance(SURNAME_SOLO_CHANCE)) return pick(fragments.surnameSolo)
  return `${pick(fragments.surnamePrefixes)}${pick(fragments.surnameSuffixes)}`
}

export const boggarts = {
  id: 'boggarts',
  label: 'Boggarts',
  fragments: {
    firstNamePrefixes: [
      'Peach', 'Dan', 'Sko', 'Wil', 'Bus', 'Gil', 'Daz', 'Grunk', 'Chust', 'Fal', 'Shark', 'Nan',
      'Bod', 'Fip', 'Grim', 'Hob', 'Lum', 'Mott', 'Ned', 'Ork', 'Puddle', 'Rusk', 'Snig', 'Tumble',
    ],
    firstNameSuffixes: [
      'ie', 'no', 'bert', 'er', 'ky', 'da', 'mina', 'ston', 'do', 'ey', 'dy',
      'sy', 'ford', 'lin', 'nick', 'sten', 'wick', 'in', 'bo', 'ly',
    ],
    firstNameSolo: ['Maud', 'Sven', 'Pand', 'Grott', 'Bink', 'Yorn'],
    surnamePrefixes: [
      'Wurl', 'Gander', 'Sam', 'Tender', 'Star',
      'Muck', 'Thistle', 'Grubb', 'Hollow', 'Puddle', 'Wither',
    ],
    surnameSuffixes: [
      'wort', 'ly', 'bree', 'feef', 'ward',
      'ditch', 'stock', 'fen', 'root', 'thorn', 'mole',
    ],
    surnameSolo: ['Wrynch', 'Cheel', 'Skoff', 'Bramm'],
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

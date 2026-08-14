const LEGENDARY_CHANCE = 0.2
const SURNAME_CHANCE = 0.5
const EPITHET_CHANCE = 0.08

function chance(p) {
  return Math.random() < p
}

export const humans = {
  id: 'humans',
  label: 'Humans',
  fragments: {
    firstNameCommon: [
      'Coop', 'Shuke', 'Knol', 'Canta', 'Rosha', 'Hankle', 'Olgid', 'Nance', 'Hank', 'Hilga',
    ],
    firstNameLegendary: ['Percival', 'Gwendolyn', 'Lyra', 'Lionen'],
    surnameSolo: ['Cooperson', 'Grobberdee', 'Knorf', 'Hooch'],
    epithets: ['the Ochre'],
  },
  assemble: ({ fragments, pick }) => {
    const firstName = chance(LEGENDARY_CHANCE)
      ? pick(fragments.firstNameLegendary)
      : pick(fragments.firstNameCommon)
    const short = firstName

    const r = Math.random()
    let full
    if (r < EPITHET_CHANCE) {
      full = `${firstName} ${pick(fragments.epithets)}`
    } else if (r < EPITHET_CHANCE + SURNAME_CHANCE) {
      full = `${firstName} ${pick(fragments.surnameSolo)}`
    } else {
      full = firstName
    }

    return { full, short }
  },
}

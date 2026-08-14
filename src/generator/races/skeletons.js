const ATTESTED_CHANCE = 0.7
const SECOND_WORD_CHANCE = 0.12

function chance(p) {
  return Math.random() < p
}

export const skeletons = {
  id: 'skeletons',
  label: 'Skeletons',
  fragments: {
    nicknamesCore: ['Rickety', 'Stretch', 'Slim', 'Skinny', 'Sticks', 'Lanky', 'Bones', 'Gravy'],
    nicknamesExtrapolated: ['Twiggy', 'Brittle', 'Clatter', 'Creaky', 'Knuckles', 'Ribs', 'Marrow', 'Hollow', 'Chalky', 'Wisp', 'Splinters', 'Rattles'],
    secondWords: ['Stitch'],
  },
  assemble: ({ fragments, pick }) => {
    const nickname = chance(ATTESTED_CHANCE) ? pick(fragments.nicknamesCore) : pick(fragments.nicknamesExtrapolated)

    const short = nickname
    const full = chance(SECOND_WORD_CHANCE) ? `${nickname} ${pick(fragments.secondWords)}` : nickname

    return { full, short }
  },
}

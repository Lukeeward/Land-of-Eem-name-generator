const SURNAME_CHANCE = 0.15

function chance(p) {
  return Math.random() < p
}

export const shryms = {
  id: 'shryms',
  label: 'Shryms',
  fragments: {
    firstNames: [
      'Theodare', 'Quembly', 'Shona', 'Kit', 'Ferdie', 'Rooger', 'Velma', 'Danathan',
      'Thrang', 'Halafox', 'Needle', 'Skuff', 'Owd', 'Martha', 'Worm', 'Shumwise', 'Pera', 'Odus',
    ],
    surnameSolo: ['Pendle', 'Radling'],
  },
  assemble: ({ fragments, pick }) => {
    const firstName = pick(fragments.firstNames)
    const short = firstName
    const full = chance(SURNAME_CHANCE) ? `${firstName} ${pick(fragments.surnameSolo)}` : firstName

    return { full, short }
  },
}

const SURNAME_CHANCE = 0.35
const BANE_CHANCE = 0.15

function chance(p) {
  return Math.random() < p
}

export const gnomes = {
  id: 'gnomes',
  label: 'Gnomes',
  fragments: {
    firstNames: [
      'Linus', 'Leopold', 'Nerman', 'Gandy', 'Whillamina', 'Dorotheen',
      'Inga', 'Charlotte', 'Constance', 'Spanky', 'Spooner', 'Willa',
      'Oldrip', 'Humdy', 'Dar', 'Emor', 'Reming', 'Carl',
    ],
    surnames: [
      'Fuddle', 'Canderbandy', 'Nabbernutty', 'Hamperstamp', 'Whillakers',
      'Gandermun', 'Nobb', 'Preel', 'Tucket', 'Dumdy', 'Widdlefiddle', 'Jeepers',
    ],
    baneLetters: ['L.', 'C.', 'J.', 'G.', 'P.', 'W.'],
  },
  assemble: ({ fragments, pick }) => {
    const firstName = pick(fragments.firstNames)
    const short = firstName

    if (!chance(SURNAME_CHANCE)) return { full: firstName, short }

    const surname = pick(fragments.surnames)
    const full = chance(BANE_CHANCE)
      ? `${pick(fragments.baneLetters)} ${firstName} ${surname}`
      : `${firstName} ${surname}`

    return { full, short }
  },
}

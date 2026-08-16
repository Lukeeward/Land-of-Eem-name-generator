const HONORIFIC_CHANCE = 0.35

export const felmogKnight = {
  id: 'felmogKnight',
  label: 'Felmog Knight',
  fragments: {
    prefixes: ['Th', 'Ura', 'Khasa', 'Feo', 'Kors', 'Ulf', 'Kalde', 'Vadda', 'Jae'],
    suffixes: ['rex', 'tan', 'dar', 'ria', 'ca', 'war', 'rak', 'la'],
    honorifics: ['Lord', 'Lady', 'Commander', 'General'],
  },
  flavor: {
    homelands: [
      "The northern realm of Felmog", "Kreeth on the Black Coast",
      "Khet in Rengwere", "Maax in the Lonely Hills",
    ],
    quirks: [
      "Argumentative and quick to anger, but loyal to their friends",
      "Distinct lack of patience",
      "Deeply interested in the history of their homeland, and will talk about it at length",
      "A show-off, and will often boast about their accomplishments",
      "Constantly tired, and will often fall asleep at the most inopportune times",
      "Yeilds at the first sign of danger",
    ],
  },
  assemble: ({ fragments, pick }) => {
    const baseName = `${pick(fragments.prefixes)}${pick(fragments.suffixes)}`

    const short = baseName
    const full = Math.random() < HONORIFIC_CHANCE
      ? `${pick(fragments.honorifics)} ${baseName}`
      : baseName

    return { full, short }
  },
}

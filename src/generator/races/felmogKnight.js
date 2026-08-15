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
      "will parley if there's treasure or gain in it",
      "has no patience for insolence",
      "would rather take a relic as tribute than fight",
      "hunts knight-errants and show-offs first",
      "a ruthlessly calculating tactician",
      "yields with grim honor, or betrays and flees",
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

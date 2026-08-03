const HONORIFIC_CHANCE = 0.35

export const felmogKnight = {
  id: 'felmogKnight',
  label: 'Felmog Knight',
  fragments: {
    prefixes: ['Th', 'Ura', 'Khasa', 'Feo', 'Kors', 'Ulf', 'Kalde', 'Vadda', 'Jae'],
    suffixes: ['rex', 'tan', 'dar', 'ria', 'ca', 'war', 'rak', 'la'],
    honorifics: ['Lord', 'Lady', 'Commander', 'General'],
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

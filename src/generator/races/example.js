export const example = {
  id: 'example',
  label: 'Example',
  fragments: {
    prefixes: ['Bel', 'Or', 'Tha', 'Fen'],
    suffixes: ['dor', 'wyn', 'rick', 'mora'],
  },
  assemble: ({ fragments, pick }) => {
    const full = `${pick(fragments.prefixes)}${pick(fragments.suffixes)}`
    const short = pick(fragments.prefixes)
    return { full, short }
  },
}

function chance(p) {
  return Math.random() < p
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function buildRoot(fragments, pick) {
  return pick(fragments.rootOnsets) + pick(fragments.rootVowels) + pick(fragments.rootCodas)
}

function buildTailSyllable(fragments, pick, prevClosed) {
  const useCluster = !prevClosed && chance(0.45)
  const onset = useCluster ? pick(fragments.tailClusterOnsets) : pick(fragments.tailOnsets)
  const vowel = pick(fragments.tailVowels)
  const closed = chance(0.4)
  const coda = closed ? pick(fragments.tailCodas) : ''
  return { text: `${onset}${vowel}${coda}`, closed }
}

function buildTail(fragments, pick) {
  const syllableCount = 3 + Math.floor(Math.random() * 2)
  let tail = ''
  let prevClosed = true
  for (let i = 0; i < syllableCount; i++) {
    const { text, closed } = buildTailSyllable(fragments, pick, prevClosed)
    tail += text
    prevClosed = closed
  }
  return tail
}

export const imps = {
  id: 'imps',
  label: 'Imps',
  fragments: {
    rootOnsets: ['z', 'm', 'j', 'w', 't', 'b', 'p', 'l', 'd', 'g', 'f', 'n', 'k'],
    rootVowels: ['a', 'e', 'i', 'o'],
    rootCodas: ['gg', 'nd', 'bb', 'll', 'dd', 'ff', 'nt', 'mm', 'nn'],
    nicknameSuffixes: ['', '', '', 'y', 'y', 'y', 'y', 'y', 'a', 'i'],
    tailOnsets: ['l', 'd', 'm', 'g', 'f', 'b', 'w', 'j', 'h', 'n', 'r', 't', 'k', 's'],
    tailClusterOnsets: ['gl', 'fl', 'bl', 'fr', 'st', 'stl', 'sk', 'mpr', 'tch', 'rk', 'sh', 'ch', 'rf'],
    tailVowels: ['a', 'e', 'i', 'o', 'u'],
    tailCodas: ['r', 'n', 's', 'k', 'm', 'l', 'g'],
  },
  assemble: ({ fragments, pick }) => {
    const root = buildRoot(fragments, pick)
    const short = capitalize(root + pick(fragments.nicknameSuffixes))
    const full = capitalize(root + buildTail(fragments, pick))
    return { full, short }
  },
}

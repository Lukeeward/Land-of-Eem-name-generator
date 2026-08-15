const FIRST_NAME_SOLO_CHANCE = 0.4
const SURNAME_SOLO_CHANCE = 0.3
const EPITHET_CHANCE = 0.12
const SURNAME_CHANCE = 0.55

function chance(p) {
  return Math.random() < p
}

function hasTripleLetterRun(word) {
  return /(.)\1\1/.test(word)
}

function buildFirstName(fragments, pick) {
  if (chance(FIRST_NAME_SOLO_CHANCE)) return pick(fragments.firstNameSolo)
  let name
  do {
    name = `${pick(fragments.firstNamePrefixes)}${pick(fragments.firstNameSuffixes)}`
  } while (hasTripleLetterRun(name))
  return name
}

function buildSurname(fragments, pick) {
  if (chance(SURNAME_SOLO_CHANCE)) return pick(fragments.surnameSolo)
  let name
  do {
    name = `${pick(fragments.surnameDescriptors)}${pick(fragments.surnameNatureSuffixes)}`
  } while (hasTripleLetterRun(name))
  return name
}

export const bugbears = {
  id: 'bugbears',
  label: 'Bugbears',
  fragments: {
    firstNameSolo: ['Sorn', 'Mags', 'Hinch', 'Mam', 'Honz', 'Quorg', 'Dook', 'Mov'],
    firstNamePrefixes: [
      'Bar', 'Del', 'Hen', 'Og', 'Vir', 'Koth', 'Pul', 'Bod', 'Gur', 'Bus',
    ],
    firstNameSuffixes: [
      'quin', 'drum', 'na', 'gram', 'bert', 'grub', 'win', 'da', 'ky',
    ],
    surnameSolo: ['Snout', 'Notch', 'Roon', 'Lundy'],
    surnameDescriptors: [
      'Proud', 'Bendy', 'Boulder',
      'Rugged', 'Mossy', 'Shaggy', 'Muddy', 'Craggy', 'Stony', 'Briar',
    ],
    surnameNatureSuffixes: [
      'flower', 'branch', 'hoot', 'fist',
      'root', 'bramble', 'thicket', 'hollow', 'ridge', 'paw', 'claw', 'tooth', 'fang', 'stump',
    ],
    epithets: [
      'the Acrobat', 'the Firebreather',
      'the Wrestler', 'the Strong', 'Big Temper', 'the Cider-Brewer', 'the Bear-Hearted', 'the Rascal',
    ],
  },
  flavor: {
    homelands: [
      "The Used T'Be Forest", "The Drippy Downs", "The Quagmash",
      "River Country", "Fleabag County",
    ],
    quirks: [
      "rarely thinks before acting",
      "loves a good rasslin' match",
      "hardier than most folk",
      "has a famously short fuse",
      "always seems to be hungry",
    ],
  },
  assemble: ({ fragments, pick }) => {
    const firstName = buildFirstName(fragments, pick)
    const short = firstName

    const r = Math.random()
    let full
    if (r < EPITHET_CHANCE) {
      full = `${firstName} ${pick(fragments.epithets)}`
    } else if (r < EPITHET_CHANCE + SURNAME_CHANCE) {
      full = `${firstName} ${buildSurname(fragments, pick)}`
    } else {
      full = firstName
    }

    return { full, short }
  },
}

import { boggarts } from './boggarts.js'
import { example } from './example.js'
import { felmogKnight } from './felmogKnight.js'
import { mushrums } from './mushrums.js'
import { sarpathi } from './sarpathi.js'
import { welkin } from './welkin.js'

// Registry of all race configs, keyed by id. Add new races here as their
// naming rules are finalized.
export const races = {
  boggarts,
  example,
  felmogKnight,
  mushrums,
  sarpathi,
  welkin,
}

export const raceList = Object.values(races)

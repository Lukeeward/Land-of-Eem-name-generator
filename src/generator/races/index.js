import { example } from './example.js'
import { felmogKnight } from './felmogKnight.js'
import { mushrums } from './mushrums.js'

// Registry of all race configs, keyed by id. Add new races here as their
// naming rules are finalized.
export const races = {
  example,
  felmogKnight,
  mushrums,
}

export const raceList = Object.values(races)

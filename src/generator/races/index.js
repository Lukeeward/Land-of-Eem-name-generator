import { example } from './example.js'

// Registry of all race configs, keyed by id. Add new races here as their
// naming rules are finalized.
export const races = {
  example,
}

export const raceList = Object.values(races)

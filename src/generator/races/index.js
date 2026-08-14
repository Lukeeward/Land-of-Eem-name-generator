import { boggarts } from './boggarts.js'
import { boggles } from './boggles.js'
import { bugbears } from './bugbears.js'
import { example } from './example.js'
import { felmogKnight } from './felmogKnight.js'
import { gelatinousGoos } from './gelatinousGoos.js'
import { goblins } from './goblins.js'
import { gnomes } from './gnomes.js'
import { humans } from './humans.js'
import { imps } from './imps.js'
import { mushrums } from './mushrums.js'
import { quortles } from './quortles.js'
import { sarpathi } from './sarpathi.js'
import { shryms } from './shryms.js'
import { skeletons } from './skeletons.js'
import { welkin } from './welkin.js'

// Registry of all race configs, keyed by id. Add new races here as their
// naming rules are finalized.
export const races = {
  boggarts,
  boggles,
  bugbears,
  example,
  felmogKnight,
  gelatinousGoos,
  goblins,
  gnomes,
  humans,
  imps,
  mushrums,
  quortles,
  sarpathi,
  shryms,
  skeletons,
  welkin,
}

export const raceList = Object.values(races)

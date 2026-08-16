import { generateName } from './engine.js'

function pickFragment(fragments) {
  return fragments[Math.floor(Math.random() * fragments.length)]
}

function pickUnique(fragments, countToPick) {
  const pool = [...fragments]
  const picked = []
  for (let i = 0; i < countToPick && pool.length > 0; i++) {
    const index = Math.floor(Math.random() * pool.length)
    picked.push(pool[index])
    pool.splice(index, 1)
  }
  return picked
}

const TRAIT_BANK = [
  'ruthless', 'gregarious', 'naive', 'claustrophobic', 'nervous', 'smirking',
  'soft-spoken', 'boastful', 'superstitious', 'stubborn', 'jumpy', 'chatty',
  'forgetful', 'suspicious of strangers', 'quick to laugh', 'slow to trust',
  'hums when nervous', 'flips a coin when thinking', 'chews on a twig',
  'always hungry', 'collects shiny trinkets', 'never makes eye contact',
  'talks to animals', 'keeps a lucky charm', 'terrible at lying',
  'overly polite', 'bit of a coward', 'secretly kind-hearted', 'loud laugher',
  'counts things obsessively', 'quotes old proverbs', 'distrustful of nobles',
  'a hopeless romantic', 'haggles over everything',
  'whistles off-key', 'afraid of the dark', 'never turns down a dare',
  'keeps meticulous notes', 'terrible sense of direction', 'holds a grudge forever',
  'laughs at the worst times', 'obsessed with maps', 'sleeps with one eye open',
  'can’t resist a good pun', 'always has a snack stashed away', 'talks to themself',
  'fiercely loyal once earned', 'picks fights with bigger folk',
  'collects other folks’ secrets', 'insists on naming everything',
  'flinches at loud noises', 'never removes their hat',
]

const MOTIVATION_BANK = [
  'Pay off a debt to the wrong sort of folk.',
  'Find a place to finally belong.',
  'Protect a secret from their past.',
  'Strike it rich, by any means necessary.',
  'Prove themselves to a doubting family.',
  'Track down an old friend who vanished.',
  'Outrun a reputation they can’t shake.',
  'Recover something stolen long ago.',
  'Earn enough coin to retire from adventuring.',
  'Uncover the truth behind a half-remembered rumor.',
  'Protect their home from a growing threat.',
  'Win back the trust of someone they wronged.',
  'Chase the thrill of the next discovery.',
  'Settle a score, once and for all.',
  'Live up to the name of a lost hero.',
  'Keep a promise made long ago.',
  'Find out who — or what — they used to be.',
  'Build a life better than the one they were given.',
  'Discover what lies at the bottom of an old family mystery.',
  'Win a bet nobody thought they could.',
  'Find a cure for a curse that isn’t theirs.',
  'Reunite with someone they haven’t seen in years.',
  'Prove the old stories about them wrong.',
  'Collect every tale worth telling before they’re forgotten.',
  'Escape a fate someone else decided for them.',
  'Make enough noise that people finally remember their name.',
  'Return home a hero, or not at all.',
  'Undo a mistake that still keeps them up at night.',
]

const SPEECH_BANK = [
  'speaks in a slow, gravelly drawl',
  'chirps quickly, words tripping over each other',
  'talks in a hushed, conspiratorial whisper',
  'booms every sentence like a proclamation',
  'has a musical, sing-song lilt',
  'mutters half of every sentence under their breath',
  'speaks with an odd, clipped formality',
  'drags out vowels when excited',
  'has a nervous stutter that vanishes when angry',
  'punctuates sentences with a wheezy laugh',
  'speaks slowly, like every word costs something',
  'rattles off sentences without pausing for breath',
  'has a thick, rolling burr to their voice',
  'trails off mid-sentence, lost in thought',
  'speaks almost entirely in questions',
  'has an unplaceable, well-traveled accent',
  'over-enunciates every syllable',
  'hums between sentences',
  'speaks louder than the moment calls for',
  'has a raspy voice worn thin from shouting',
  'peppers speech with old sailor’s oaths',
  'talks fast when nervous, slow when lying',
  'a deep, resonant bass that seems to rumble up from the chest',
  'high and reedy, like wind through a narrow pipe',
  'a thin falsetto that cracks when startled',
  'a warm baritone that puts strangers at ease instantly',
  'gravelly and low, like stones grinding together',
  'silky smooth, almost too charming to trust',
  'husky and worn, like a lifetime spent shouting over storms',
  'nasal and whiny, grating after a few sentences',
  'hollow and distant, as if speaking from underwater',
  'thin and breathy, as if every word costs real effort',
  'carries a permanent undertone of barely-contained rage',
  'sounds perpetually on the verge of tears',
  'bright and sunny, even when delivering grim news',
  'flat and toneless, impossible to read',
  'carries a weary sadness under every word',
  'menacing calm, never once raising above a murmur',
  'cracks with nervous energy behind a forced smile',
  'radiates a quiet, unshakeable confidence',
  'sounds like they’re always about to laugh at a private joke',
  'clipped and sharp, used to giving orders and being obeyed',
  'soft and soothing, made for calming frightened children',
  'sing-song and playful, even when the news is serious',
  'sounds exhausted no matter the hour',
]

export function attachFlavor(raceConfig, name) {
  const card = { ...name }

  if (raceConfig.flavor?.homelands?.length) {
    card.homeland = pickFragment(raceConfig.flavor.homelands)
  }
  if (raceConfig.flavor?.quirks?.length) {
    card.quirk = pickFragment(raceConfig.flavor.quirks)
  }

  card.traits = pickUnique(TRAIT_BANK, 3)
  card.motivation = pickFragment(MOTIVATION_BANK)
  card.speech = pickFragment(SPEECH_BANK)

  return card
}

export function generateNpcCard(raceConfig) {
  return attachFlavor(raceConfig, generateName(raceConfig))
}

export function generateNpcCards(raceConfig, count = 1) {
  return Array.from({ length: count }, () => generateNpcCard(raceConfig))
}

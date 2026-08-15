// Optional "nice extra" flavor layered on top of a generated name: a Homeland
// and a personality quirk (both pulled from each race's `flavor` data when
// present — see TASKS.md "NPC card" section), plus a Traits + Motivation line
// in the book's own NPC-writeup style. The book has no generic table for
// Traits/Motivation (its NPC writeups are all hand-authored), so this bank is
// original content written in that voice rather than sourced verbatim.
//
// `flavor` is optional per race — races without homelands/quirks data yet
// (or without a Character Creation entry at all, e.g. felmogKnight) simply
// omit those fields from the card rather than erroring.

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

  return card
}

export function generateNpcCard(raceConfig) {
  return attachFlavor(raceConfig, generateName(raceConfig))
}

export function generateNpcCards(raceConfig, count = 1) {
  return Array.from({ length: count }, () => generateNpcCard(raceConfig))
}

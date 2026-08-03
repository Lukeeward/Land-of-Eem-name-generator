// Shared name generator engine. Race-specific data/logic lives in ./races/*;
// this file only knows how to run an assembly function and pick fragments.

function pickFragment(fragments) {
  return fragments[Math.floor(Math.random() * fragments.length)]
}

export function generateName(raceConfig) {
  const ctx = {
    fragments: raceConfig.fragments,
    pick: pickFragment,
  }
  return raceConfig.assemble(ctx)
}

export function generateNames(raceConfig, count = 1) {
  return Array.from({ length: count }, () => generateName(raceConfig))
}

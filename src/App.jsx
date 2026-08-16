import { useState } from 'react'
import { raceList, races } from './generator/races/index.js'
import { generateNpcCards } from './generator/npcCard.js'
import './App.css'

function App() {
  const [raceId, setRaceId] = useState(raceList[0].id)
  const [count, setCount] = useState(1)
  const [results, setResults] = useState([])
  const [expanded, setExpanded] = useState(() => new Set())

  const handleGenerate = () => {
    const cards = generateNpcCards(races[raceId], count)
    setResults(cards)
    setExpanded(new Set(cards.map((_, i) => i)))
  }

  const toggleExpanded = (i) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(i)) {
        next.delete(i)
      } else {
        next.add(i)
      }
      return next
    })
  }

  return (
    <section id="generator">
      <h1>Land of Eem NPC Generator</h1>

      <div className="controls">
        <label>
          Folk
          <select value={raceId} onChange={(e) => setRaceId(e.target.value)}>
            {raceList.map((race) => (
              <option key={race.id} value={race.id}>
                {race.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Count
          <input
            type="number"
            min="1"
            max="20"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </label>

        <button type="button" onClick={handleGenerate}>
          Generate
        </button>
      </div>

      <ul className="results">
        {results.map((card, i) => (
          <li key={i}>
            <div className="result-row">
              <span className="full-name">{card.full}</span>
              <span className="short-name">({card.short})</span>
              <button
                type="button"
                className="details-toggle"
                onClick={() => toggleExpanded(i)}
              >
                {expanded.has(i) ? 'Hide details' : 'Show details'}
              </button>
            </div>

            {expanded.has(i) && (
              <div className="npc-card">
                {card.homeland && (
                  <div>
                    <span className="npc-card-label">Homeland</span> {card.homeland}
                  </div>
                )}
                {card.quirk && (
                  <div>
                    <span className="npc-card-label">Quirk</span> {card.quirk}
                  </div>
                )}
                <div>
                  <span className="npc-card-label">Traits</span> {card.traits.join(', ')}
                </div>
                <div>
                  <span className="npc-card-label">Motivation</span> {card.motivation}
                </div>
                <div>
                  <span className="npc-card-label">Speech</span> {card.speech}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <footer className="app-footer">
        <p>
          Land of Eem is © Ben Costa &amp; James Parks. This is an unofficial fan-made
          tool. Names and NPC details are procedurally generated and may not always be
          fully book accurate.
        </p>
        <a
          href="https://buymeacoffee.com/onwardluke"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            height="42"
          />
        </a>
      </footer>
    </section>
  )
}

export default App

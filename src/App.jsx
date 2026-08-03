import { useState } from 'react'
import { raceList, races } from './generator/races/index.js'
import { generateNames } from './generator/engine.js'
import './App.css'

function App() {
  const [raceId, setRaceId] = useState(raceList[0].id)
  const [count, setCount] = useState(1)
  const [results, setResults] = useState([])

  const handleGenerate = () => {
    setResults(generateNames(races[raceId], count))
  }

  return (
    <section id="generator">
      <h1>Land of Eem Name Generator</h1>

      <div className="controls">
        <label>
          Race
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
        {results.map((name, i) => (
          <li key={i}>
            <span className="full-name">{name.full}</span>
            <span className="short-name">({name.short})</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default App

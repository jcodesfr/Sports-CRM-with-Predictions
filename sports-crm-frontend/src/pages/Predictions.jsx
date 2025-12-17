import React, { useEffect, useState } from 'react'
import { api } from '../api'
import Table from '../components/Table'

export default function Predictions() {
  const [rows, setRows] = useState([])
  const [fixtures, setFixtures] = useState([])
  const [fixtureId, setFixtureId] = useState('')
  const [items, setItems] = useState([{ playerId: '', predictionMetric: 'points', recent: '20,25,18' }])

  useEffect(() => {
    api.listPredictions().then(setRows)
    api.listGames().then(setFixtures)
  }, [])

  const addRow = () =>
    setItems((p) => [...p, { playerId: '', predictionMetric: 'points', recent: '' }])

  const update = (idx, field, val) =>
    setItems((p) => {
      const c = [...p]
      c[idx] = { ...c[idx], [field]: val }
      return c
    })

  const remove = (idx) => setItems((p) => p.filter((_, i) => i !== idx))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fixtureId) return alert('Select a fixture')

    const payload = {
      fixture_id: Number(fixtureId),
      items: items.map((it) => ({
        player_id: Number(it.playerId),
        metric: it.predictionMetric,
        recent_values: it.recent.split(',').map((x) => Number(x.trim())).filter(Boolean),
      })),
    }

    await api.runPredictions(payload)
    api.listPredictions().then(setRows)
  }

  return (
    <>
      <h1>Predictions</h1>
      <form onSubmit={handleSubmit}>
        <select value={fixtureId} onChange={(e) => setFixtureId(e.target.value)}>
          <option value="">Select fixture</option>
          {fixtures.map((f) => (
            <option key={f.id} value={f.id}>{f.opponent} ({f.date})</option>
          ))}
        </select>

        {items.map((it, idx) => (
          <div key={idx}>
            <input value={it.playerId} placeholder="Player ID"
              onChange={(e) => update(idx, 'playerId', e.target.value)} />
            <select value={it.predictionMetric}
              onChange={(e) => update(idx, 'predictionMetric', e.target.value)}>
              <option value="points">Points</option>
              <option value="assists">Assists</option>
              <option value="rebounds">Rebounds</option>
              <option value="xg">xG</option>
            </select>
            <input value={it.recent} placeholder="20,25,18"
              onChange={(e) => update(idx, 'recent', e.target.value)} />
            <button type="button" onClick={() => remove(idx)}>Remove</button>
          </div>
        ))}

        <button type="button" onClick={addRow}>Add Row</button>
        <button type="submit">Run Predictions</button>
      </form>

      <Table
        cols={['id', 'player_id', 'prediction_metric', 'predicted_value']}
        colLabels={{ id: 'ID', player_id: 'Player', prediction_metric: 'Metric', predicted_value: 'Value' }}
        rows={rows}
      />
    </>
  )
}

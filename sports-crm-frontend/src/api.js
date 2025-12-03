const BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'

async function http(path, opts = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status}: ${text}`)
  }
  return res.json()
}

export const api = {

  listTeams: () => http('/teams'),
  createTeam: (payload) => http('/teams', { method: 'POST', body: JSON.stringify(payload)}),

  listPlayers: () => http('/players'),
  createPlayer: (payload) => http('/players', { method: 'POST', body: JSON.stringify(payload)}),

  listGames: () => http('/fixtures'),
  createGame: (payload) => http('/fixtures', { method: 'POST', body: JSON.stringify(payload)}),

  listPredictions: () => http('/predictions'),
  runPredictions: (items) => http('/predictions/run', { method: 'POST', body: JSON.stringify({ items }) }),

  listSports: () => http('/sports'),

}
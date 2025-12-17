// api.js
const BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';

async function http(path, opts = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

export const api = {
  listTeams: () => http('/teams'),
  createTeam: (p) => http('/teams', { method: 'POST', body: JSON.stringify(p) }),
  listPlayers: () => http('/players'),
  createPlayer: (p) => http('/players', { method: 'POST', body: JSON.stringify(p) }),
  listGames: () => http('/fixtures'),
  createGame: (p) => http('/fixtures', { method: 'POST', body: JSON.stringify(p) }),
  listPredictions: () => http('/predictions'),
  createPrediction: (p) => http('/predictions', { method: 'POST', body: JSON.stringify(p) }),
  runPredictions: (payload) =>
    http('/predictions/run', { method: 'POST', body: JSON.stringify(payload) }),
  listSports: () => http('/sports'),
};

import React, { useEffect, useState } from 'react'
import { api } from '../api'
import Table from '../components/Table'

export default function Dashboard() {
  const [players, setPlayers] = useState([])
  const [games, setGames] = useState([])
  const [preds, setPreds] = useState([])

  useEffect(() => {
    api
      .listPlayers()
      .then((data) => {
        console.log('DASHBOARD PLAYERS:', data)
        setPlayers(data)
      })
      .catch((err) => console.error('Error loading players for dashboard', err))
  }, [])

  useEffect(() => {
    api
      .listGames()
      .then((data) => {
        console.log('DASHBOARD GAMES:', data)
        setGames(data)
      })
      .catch((err) => console.error('Error loading games for dashboard', err))
  }, [])

  useEffect(() => {
    api
      .listPredictions()
      .then((data) => {
        console.log('DASHBOARD PREDS:', data)
        setPreds(data)
      })
      .catch((err) => console.error('Error loading predictions for dashboard', err))
  }, [])

  const backendUrl = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'

  return (
    <>
      <h1>Dashboard</h1>

      <div className = "card" style = {{ marginBottom: '1rem' }}>
        <small className = "muted">
          Backend: {backendUrl}
        </small>
      </div>

      {/* Players overview */}
      <h2>Players</h2>
      <Table
        cols = {['id', 'name', 'position', 'team_id', 'career_time', 'player_health']}
        rows = {players}
        colLabels = {{
          id: 'Player ID',
          name: 'Name',
          position: 'Position',
          team_id: 'Team ID',
          career_time: 'Career Time',
          player_health: 'Player Health',
        }}
      />

      {/* Games overview */}
      <h2>Games</h2>
      <Table
        cols = {['id', 'team_id', 'opponent', 'date', 'location']}
        rows = {games}
        colLabels = {{
          id: 'Game ID',
          team_id: 'Team ID',
          opponent: 'Opponent',
          date: 'Date',
          location: 'Location',
        }}
      />

      {/* Predictions overview */}
      <h2>Predictions</h2>
      <Table
        cols = {['id', 'player_id', 'prediction_metric', 'predicted_value']}
        rows = {preds}
        colLabels = {{
          id: 'Prediction ID',
          player_id: 'Player ID',
          prediction_metric: 'Metric',
          predicted_value: 'Predicted Value',
        }}
      />
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { api } from '../api'
import Table from '../components/Table'

export default function Dashboard(){
  const [players, setPlayers] = useState([])
  const [games, setGames] = useState([])
  const [preds, setPreds] = useState([])

  useEffect(()=>{ api.listPlayers().then(setPlayers).catch(console.error) },[])
  useEffect(()=>{ api.listGames().then(setGames).catch(console.error) },[])
  useEffect(()=>{ api.listPredictions().then(setPreds).catch(console.error) },[])

  return (
    <>
      <h1>Dashboard</h1>
      <div className="card">
        <small className="muted">
          Backend: {import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'}
          </small>
      </div>

      <div className="dashboard-table">
        <Table cols={['Player ID','Name','Position','Team ID','Career Time','Player Health']} rows={players} />
      </div>
      
      <div className="dashboard-table">
        <Table cols={['Fixture ID','Team ID','Opponent','Date','Location']} rows={games} />
      </div>

      <div className="dashboard-table">
        <Table cols={['Prediction ID','Player ID','Prediction Metric','Predicted Value']} rows={preds} />
      </div>
    </>
  )
}
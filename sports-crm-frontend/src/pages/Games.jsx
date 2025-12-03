import React, { useEffect, useState } from 'react'
import { api } from '../api'
import Table from '../components/Table'

export default function Games(){
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({ teamId:'', opponent:'', date:'', location:'' })

  const load = ()=> api.listGames().then(setRows)
  useEffect(()=>{ load() }, [])

  const submit = async (e)=>{
    e.preventDefault()
    const payload = { ...form, teamId: Number(form.teamId) }
    await api.createGame(payload)
    setForm({ teamId:'', opponent:'', date:'', location:'' })
    load()
  }

  return (
    <>
      <h1>Games</h1>
      <div className="card">
        <form className="form" onSubmit={submit}>
          <input placeholder="Team ID" value={form.teamId} onChange={e=>setForm({ ...form, teamId:e.target.value })} required />
          <input placeholder="Opponent" value={form.opponent} onChange={e=>setForm({ ...form, opponent:e.target.value })} required />
          <input placeholder="Date YYYY-MM-DD" value={form.date} onChange={e=>setForm({ ...form, date:e.target.value })} required />
          <input placeholder="Location" value={form.location} onChange={e=>setForm({ ...form, location:e.target.value })} />
          <button type="submit">Add Game</button>
        </form>
      </div>
      <Table cols={['Fixture ID','Team ID','Opponent','Date','Location']} rows={rows} />
    </>
  )
}
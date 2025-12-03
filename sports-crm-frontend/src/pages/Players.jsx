import React, { useEffect, useState } from 'react'
import { api } from '../api'
import Table from '../components/Table'

export default function Players(){
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({ name:'', position:'', teamId:'', careerTime:'', playerHealth:'' })

  const load = ()=> api.listPlayers().then(setRows)
  useEffect(()=>{ load() }, [])

  const submit = async (e)=>{
    e.preventDefault()
    const payload = { ...form, teamId: form.teamId ? Number(form.teamId): null }
    await api.createPlayer(payload)
    setForm({ name:'', position:'', teamId:'', careerTime:'', playerHealth:'' })
    load()
  }

  return (
    <>
      <h1>Players</h1>
      <div className="card">
        <form className="form" onSubmit={submit}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({ ...form, name:e.target.value })} required />
          <input placeholder="Position" value={form.position} onChange={e=>setForm({ ...form, position:e.target.value })} />
          <input placeholder="Team ID" value={form.teamId} onChange={e=>setForm({ ...form, teamId:e.target.value })} />
          <input placeholder="Career Time" value={form.careerTime} onChange={e=>setForm({ ...form, careerTime:e.target.value })} />
          <input placeholder="Health" value={form.playerHealth} onChange={e=>setForm({ ...form, playerHealth:e.target.value })} />
          <button type="submit">Add Player</button>
        </form>
      </div>
      <Table cols={['Player ID','Name','Position','Team ID','Career Time','Player Health']} rows={rows} />
    </>
  )
}
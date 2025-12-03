import React, { useEffect, useState } from 'react'
import { api } from '../api'
import Table from '../components/Table'

export default function Teams(){
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({ name:'', league:'', sportId:'' })

  const load = ()=> api.listTeams().then(setRows)
  useEffect(()=>{ load() }, [])

  const submit = async (e)=>{
    e.preventDefault()
    const payload = { ...form, sportId: form.sportId ? Number(form.sportId) : null }
    await api.createTeam(payload)
    setForm({ name:'', league:'', sportId:'' })
    load()
  }

  return (
    <>
      <h1>Teams</h1>
      <div className="card">
        <form className="form" onSubmit={submit}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({ ...form, name:e.target.value })} required />
          <input placeholder="League" value={form.league} onChange={e=>setForm({ ...form, league:e.target.value })} />
          <input placeholder="Sport ID" value={form.sportId} onChange={e=>setForm({ ...form, sportId:e.target.value })} />
          <button type="submit">Add Team</button>
        </form>
      </div>
      <Table cols={['Team ID','Name','League','Sport ID']} rows={rows} />
    </>
  )
}
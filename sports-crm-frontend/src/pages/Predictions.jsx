import React, { useEffect, useState } from 'react'
import { api } from '../api'
import Table from '../components/Table'

export default function Predictions(){
  const [rows, setRows] = useState([])
  const [items, setItems] = useState([ { playerId:'', predictionMetric:'points', recent:'20,25,18' } ])

  const load = ()=> api.listPredictions().then(setRows)
  useEffect(()=>{ load() }, [])

  const addRow = ()=> setItems(prev=> [...prev, { playerId:'', predictionMetric:'points', recent:'' }])
  const update = (idx, field, value)=>{
    const copy = [...items]; copy[idx][field] = value; setItems(copy)
  }
  const remove = (idx)=> setItems(items.filter((_,i)=> i!==idx))

  const submit = async (e)=>{
    e.preventDefault()
    const payload = items
      .filter(it=> it.playerId && it.predictionMetric)
      .map(it=> ({ playerId: Number(it.playerId), predictionMetric: it.predictionMetric, recentValues: (it.recent||'').split(',').map(s=>s.trim()).filter(Boolean).map(Number) }))
    if(!payload.length){ alert('Add at least one item'); return }
    await api.runPredictions(payload)
    setItems([ { playerId:'', predictionMetric:'points', recent:'' } ])
    load()
  }

  return (
    <>
      <h1>Predictions</h1>

      <div className="card">
        <form className="form" onSubmit={submit}>
          {items.map((it, idx)=>(
            <div key={idx} style={{display:'flex', gap:8, alignItems:'center', width:'100%'}}>
              <input style={{flex:1}} placeholder="Player ID" value={it.playerId} onChange={e=>update(idx, 'playerId', e.target.value)} />
              <select value={it.predictionMetric} onChange={e=>update(idx, 'predictionMetric', e.target.value)}>
                <option value="points">Points</option>
                <option value="assists">Assists</option>
                <option value="rebounds">Rebounds</option>
                <option value="xG">xG</option>
              </select>
              <input style={{flex:2}} placeholder="Recent values (comma separated)" value={it.recent} onChange={e=>update(idx, 'recent', e.target.value)} />
              <button type="button" onClick={()=>remove(idx)}>Remove</button>
            </div>
          ))}
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <button type="button" onClick={addRow}>Add Row</button>
            <button type="submit">Run Predictions</button>
          </div>
        </form>
      </div>

      <Table cols={['Prediction ID','Player ID','Prediction Metric','Predicted Value']} rows={rows} />
    </>
  )
}
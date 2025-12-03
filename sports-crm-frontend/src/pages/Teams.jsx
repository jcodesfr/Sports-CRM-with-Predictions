import React, { useEffect, useState } from 'react'
import { api } from '../api'
import Table from '../components/Table'

export default function Teams() {
  const [sports, setSports] = useState([])
  const [teams, setTeams] = useState([])
  const [form, setForm] = useState({
    name: '',
    league: '',
    sport_id: '',
  })

  useEffect(() => {
    api
      .listSports()
      .then(setSports)
      .catch((err) => {
        console.error('Error loading sports', err)
      })

    api
      .listTeams()
      .then(setTeams)
      .catch((err) => {
        console.error('Error loading teams', err)
      })
  }, [])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const payload = {
        name: form.name,
        league: form.league,
        sport_id: form.sport_id ? Number(form.sport_id) : null,
      }

      const created = await api.createTeam(payload)

      setTeams((prev) => [...prev, created])

      setForm({
        name: '',
        league: '',
        sport_id: '',
      })
    } catch (err) {
      console.error('Error creating team', err)
      alert('Failed to create team. Check console for details.')
    }
  }

  return (
    <>
      <h1>Teams</h1>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="Team Name"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              value={form.league}
              onChange={handleChange('league')}
              placeholder="League Name"
            />
          </div>

          <div className="form-row">
            <select
              value={form.sport_id}
              onChange={handleChange('sport_id')}
              required
            >
              <option value="">Select Sport</option>
              {sports.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <button type="submit">Add Team</button>
          </div>
        </form>
      </div>

      <Table cols={['ID', 'Name', 'League', 'Sport ID']} rows={teams} />
    </>
  )
}

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

  // load teams
  const loadTeams = () => {
    api
      .listTeams()
      .then((data) => {
        console.log('TEAMS FROM API:', data)
        setTeams(data)
      })
      .catch((err) => {
        console.error('Error loading teams', err)
      })
  }

  useEffect(() => {
    // load sports
    api
      .listSports()
      .then((data) => {
        console.log('SPORTS FROM API:', data)
        setSports(data)
      })
      .catch((err) => {
        console.error('Error loading sports', err)
      })

    loadTeams()
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

      await api.createTeam(payload)

      loadTeams()

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

      <div className = "card" style={{ marginBottom: '1rem' }}>
        <form onSubmit = {handleSubmit} className = "form">
          <div className = "form-row">
            <label>
              Team Name:
              <input
                type = "text"
                value = {form.name}
                onChange = {handleChange('name')}
                placeholder = "Name"
                required
              />
            </label>
          </div>

          <div className = "form-row">
            <label>
              League Name:
              <input
                type = "text"
                value = {form.league}
                onChange = {handleChange('league')}
                placeholder = "League"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Sport:
              <select
                value = {form.sport_id}
                onChange = {handleChange('sport_id')}
                required
              >
                <option value = "">Select sport</option>
                {sports.map((s) => (
                  <option key = {s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row">
            <button type="submit">Add Team</button>
          </div>
        </form>
      </div>

      <Table
        cols={['id', 'name', 'league', 'sport_id']}
        rows={teams}
        colLabels={{
          id: 'ID',
          name: 'Team Name',
          league: 'League',
          sport_id: 'Sport',
        }}
      />
    </>
  )
}

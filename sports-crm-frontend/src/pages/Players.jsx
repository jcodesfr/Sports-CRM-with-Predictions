import React, { useEffect, useState } from 'react'
import { api } from '../api'
import Table from '../components/Table'

export default function Players() {
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])

  const [form, setForm] = useState({
    name: '',
    position: '',
    team_id: '',
    career_time: '',
    player_health: '',
  })

  // Load players
  const loadPlayers = () => {
    api
      .listPlayers()
      .then((data) => {
        console.log('PLAYERS FROM API:', data)
        setPlayers(data)
      })
      .catch((err) => {
        console.error('Error loading players', err)
      })
  }

  useEffect(() => {
    loadPlayers()

    // load teams
    api
      .listTeams()
      .then((data) => {
        console.log('TEAMS FOR PLAYER FORM:', data)
        setTeams(data)
      })
      .catch((err) => {
        console.error('Error loading teams for players form', err)
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
        position: form.position,
        team_id: form.team_id ? Number(form.team_id) : null,
        career_time: form.career_time,
        player_health: form.player_health,
      }

      await api.createPlayer(payload)

      loadPlayers()

      setForm({
        name: '',
        position: '',
        team_id: '',
        career_time: '',
        player_health: '',
      })
    } catch (err) {
      console.error('Error creating player', err)
      alert('Failed to create player. Check console for details.')
    }
  }

  return (
    <>
      <h1>Players</h1>

      <div className = "card" style = {{ marginBottom: '1rem' }}>
        <form onSubmit = {handleSubmit} className="form">
          <div className = "form-row">
            <label>
              Name:
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
              Position:
              <input
                type = "text"
                value = {form.position}
                onChange = {handleChange('position')}
                placeholder = "Position"
              />
            </label>
          </div>

          <div className = "form-row">
            <label>
              Team:
              <select
                value = {form.team_id}
                onChange = {handleChange('team_id')}
              >
                <option value = "">No team</option>
                {teams.map((t) => (
                  <option key = {t.id} value = {t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Career Time:
              <input
                type="text"
                value={form.career_time}
                onChange={handleChange('career_time')}
                placeholder="Time"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Player Health:
              <input
                type="text"
                value={form.player_health}
                onChange={handleChange('player_health')}
                placeholder="Health"
              />
            </label>
          </div>

          <div className="form-row">
            <button type="submit">Add Player</button>
          </div>
        </form>
      </div>

      <Table
        cols={['id', 'name', 'position', 'team_id', 'career_time', 'player_health']}
        rows={players}
        colLabels={{
          id: 'Player ID',
          name: 'Name',
          position: 'Position',
          team_id: 'Team',
          career_time: 'Career Time',
          player_health: 'Player Health',
        }}
      />
    </>
  )
}

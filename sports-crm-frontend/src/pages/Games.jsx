import React, { useEffect, useState } from 'react'
import { api } from '../api'
import Table from '../components/Table'

export default function Games() {
  const [games, setGames] = useState([])
  const [teams, setTeams] = useState([])

  const [form, setForm] = useState({
    team_id: '',
    opponent: '',
    date: '',
    location: '',
  })

  // Load games
  const loadGames = () => {
    api
      .listGames()
      .then((data) => {
        console.log('GAMES FROM API:', data)
        setGames(data)
      })
      .catch((err) => {
        console.error('Error loading games', err)
      })
  }

  useEffect(() => {
    loadGames()

    // load teams
    api
      .listTeams()
      .then((data) => {
        console.log('TEAMS FOR GAMES FORM:', data)
        setTeams(data)
      })
      .catch((err) => {
        console.error('Error loading teams for games form', err)
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
        team_id: form.team_id ? Number(form.team_id) : null,
        opponent: form.opponent,
        date: form.date,
        location: form.location,
      }

      await api.createGame(payload)

      loadGames()

      setForm({
        team_id: '',
        opponent: '',
        date: '',
        location: '',
      })
    } catch (err) {
      console.error('Error creating game', err)
      alert('Failed to create game. Check console for details.')
    }
  }

  return (
    <>
      <h1>Games</h1>

      <div className = "card" style = {{ marginBottom: '1rem' }}>
        <form onSubmit = {handleSubmit} className="form">
          <div className = "form-row">
            <label>
              Team:
              <select
                value = {form.team_id}
                onChange = {handleChange('team_id')}
                required
              >
                <option value = "">Select Team</option>
                {teams.map((t) => (
                  <option key = {t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Opponent:
              <input
                type="text"
                value = {form.opponent}
                onChange = {handleChange('opponent')}
                placeholder = "Opponent Name"
                required
              />
            </label>
          </div>

          <div className = "form-row">
            <label>
              Date:
              <input
                type = "text"
                value = {form.date}
                onChange = {handleChange('date')}
                placeholder = "Date (MM-DD-YYYY)"
                required
              />
            </label>
          </div>

          <div className = "form-row">
            <label>
              Location:
              <input
                type = "text"
                value = {form.location}
                onChange = {handleChange('location')}
                placeholder = "Location"
              />
            </label>
          </div>

          <div className = "form-row">
            <button type = "submit">Add Game</button>
          </div>
        </form>
      </div>

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
    </>
  )
}

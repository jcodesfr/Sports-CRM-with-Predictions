import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Players from './pages/Players.jsx'
import Teams from './pages/Teams.jsx'
import Games from './pages/Games.jsx'
import Predictions from './pages/Predictions.jsx'

export default function App(){
  return (
    <>
      <header>
        <h3>Sports CRM</h3>
        <nav>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/players">Players</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/games">Games</NavLink>
          <NavLink to="/predictions">Predictions</NavLink>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/players" element={<Players/>} />
          <Route path="/teams" element={<Teams/>} />
          <Route path="/games" element={<Games/>} />
          <Route path="/predictions" element={<Predictions/>} />
        </Routes>
      </div>
    </>
  )
}
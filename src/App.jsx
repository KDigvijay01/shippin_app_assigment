import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import BoxForm from './pages/BoxForm'
import BoxList from './pages/BoxList'


export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/add" replace />} />
          <Route path="/add" element={<BoxForm />} />
          <Route path="/list" element={<BoxList />} />
        </Routes>
      </main>
    </div>
  )
}
import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Profile from './pages/Profile'

function App() {
  const { user } = useSelector((state) => state.auth);


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

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
import Visions from './pages/VisionBoard'
import BucketList from './pages/BucketList'
import PrayerPage from './pages/MyPrayers'
import GoalPage from './pages/MyGoals'
import BottomNav from './components/BottomNav'

function App() {
  const { user } = useSelector((state) => state.auth);


  return (
    <>
      <Navbar />
      <main className='pb-20'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/vision" element={user ? <Visions /> : <Navigate to="/login" />} />
          <Route path="/bucketlist" element={user ? <BucketList /> : <Navigate to="/login" />} />
          <Route path="/prayers" element={user ? <PrayerPage /> : <Navigate to="/login" />} />
          <Route path="/goals" element={user ? <GoalPage /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <BottomNav />

      <Footer />
    </>
  )
}

export default App

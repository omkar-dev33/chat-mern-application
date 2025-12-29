import { useState } from 'react'
import { Navbar } from './component/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { SignUpPage } from './pages/SignUpPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SettingPage } from './pages/SettingPage.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'

function App() {
  const { authUser, checkAuth } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({ authUser });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/setting' element={<SettingPage />} />
        <Route path='/profile' element={<profilePage />} />
      </Routes>
    </>
  )
}

export default App

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../../screens/home/Home'
import Login from '../../screens/login/Login'
import Register from '../../screens/register/Register'
import ResponsiveAppBar from '../../components/navbar/Navbar'
import Copyright from '../../components/footer/Footer'

const RouterConfig = () => {
  return (
    <>
      <BrowserRouter>
        <ResponsiveAppBar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='Register' element={<Register />} />
        </Routes>

        <Copyright />
      </BrowserRouter>
    </>
  )
}

export default RouterConfig
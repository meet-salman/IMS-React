import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../../screens/home/Home'
import AdminDashboard from '../../screens/dashboard/AdminDashboard'
import Login from '../../screens/login/Login'
import Register from '../../screens/register/Register'
import ResponsiveAppBar from '../../components/navbar/Navbar'
import Copyright from '../../components/footer/Footer'
import Courses from '../../screens/courses/Courses'
import StudentProfile from '../../screens/profile/StudentProfile'

const RouterConfig = () => {
  return (
    <>
      <BrowserRouter>
        <ResponsiveAppBar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='Register' element={<Register />} />
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='profile' element={<StudentProfile />} />
          <Route path='courses' element={<Courses />} />
        </Routes>

        <Copyright />
      </BrowserRouter>
    </>
  )
}

export default RouterConfig
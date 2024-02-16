import React, { useEffect, useState } from 'react'
import HeroSection from '../../components/hero-section/HeroSection'
import CourseCard from '../../components/card/CourseCard'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getData, getUserData, userExist } from '../../config/firebase/FirebaseMethods'

const Home = () => {

  const [currentUser, setCurrentUser] = useState();


  useEffect(() => {

    getUserData()
      .then((res) => {
        // console.log(res);
      })
      .catch((rej) => {
        console.log(rej);
      })

  }, [])

  return (
    <>
      <HeroSection />

      {/* Top Rated Courses */}
      <Box sx={{ paddingX: { xs: '50px', lg: '100px' }, paddingBottom: { xs: '50px', lg: '100px' } }}>

        {/* Heading */}
        <Typography variant='h2'
          sx={{
            marginBottom: '50px',
            fontFamily: '"Inter", sans-serif',
            fontSize: { xs: '30px', md: '40px' },
            fontWeight: '600',
            textAlign: 'center',
          }}>
          Top Rated Courses
        </Typography>

        {/* Courses Cards */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </Box>

      </Box>
    </>
  )
}

export default Home
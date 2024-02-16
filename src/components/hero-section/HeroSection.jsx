import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

  // UseNavigate
  const navigate = useNavigate()

  // Navigate to SignUp
  const navigateToSignUp = () => {
    navigate('/register')
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: { xs: '100vh', sm: '80vh', lg: '90vh', },
          padding: { xs: '80px', lg: '100px' },
          textAlign: 'center',
          alignItems: 'center',
          fontFamily: '"Inter", sans-serif',
          background: 'linear-gradient(#e1effe, #ffffff)'
          // backgroundColor:'red'
        }}>

        <Typography variant='h1'
          sx={{
            fontWeight: '600',
            fontSize: { xs: '40px', md: '50px', lg: '60px' },
            lineHeight: { xs: '60px', md: '70px', lg: '80px' }
          }}>
          Upgrade Your <span className='text-blue'> Learning <br /> Skills </span> & Upgrade Your Life
        </Typography>

        <Typography sx={{ marginTop: '15px', marginBottom: '30px', color: '#4c5967' }}> Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs. <br /> Elevate your experience with top-tier features and services. </Typography>
        <Button onClick={navigateToSignUp} variant="contained"> Regiter Now </Button>
        
      </Box>
    </>
  )
}

export default HeroSection
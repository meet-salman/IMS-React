import React from 'react'
import SidePanel from '../../components/tab/Tab'
import { Box } from '@mui/material'

const AdminDashboard = () => {
  return (
    <>
      <Box sx={{ minHeight: '80vh', marginTop: '50px' }}>
        <SidePanel />
      </Box>
    </>
  )
}

export default AdminDashboard
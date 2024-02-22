import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Paper, Typography } from '@mui/material';
import UserContext from '../../context/UserContext'
import { deleteDocument } from '../../config/firebase/FirebaseMethods';


let settings = ['Edit', 'Delete'];

export default function BasicTable() {

  const { allStudents, setAllStudents } = React.useContext(UserContext);


  const editUser = (id) => {
    console.log(id);
  }
  const DeleteUser = (id, index) => {
    console.log(id);

    deleteDocument(id, 'students')
      .then((res) => {
        allStudents.splice(index, 1)
        setAllStudents([...allStudents])
      })
      .catch((rej) => {
        console.log(rej);
      })

  }

  return (

    // <Box>
    //   {studentsData.length > 0 ?

    //     <TableContainer component={Paper}>

    //       {/* Students Table */}
    //       <Table sx={{ minWidth: 650 }} aria-label="simple table">

    //         {/* Table Head */}
    //         <TableHead>
    //           <TableRow>
    //             <TableCell > <b> Name </b> </TableCell>
    //             <TableCell > <b> Email </b> </TableCell>
    //             <TableCell > <b> Phone </b> </TableCell>
    //             <TableCell > <b> Enroll Date </b> </TableCell>
    //             <TableCell align="right"> <b> Action </b> </TableCell>
    //           </TableRow>
    //         </TableHead>


    //         {/* Table Body */}
    //         <TableBody>
    //           {studentsData.map((student) => (
    //             student.type === 'student' ?

    //               // Table Rows
    //               <TableRow
    //                 key={student.id}
    //                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //               >

    //                 <TableCell component="th" scope="row">
    //                   {student.name}
    //                 </TableCell>
    //                 <TableCell >{student.email}</TableCell>
    //                 <TableCell >{student.name}</TableCell>
    //                 <TableCell >{student.enrollDate}</TableCell>
    //                 <TableCell align="right">

    //                   {/* Student Setting Menu */}
    //                   <Box sx={{ flexGrow: 0 }}>
    //                     <Tooltip title="Open settings">
    //                       <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    //                         <MoreVertIcon />
    //                       </IconButton>
    //                     </Tooltip>
    //                     <Menu
    //                       sx={{ mt: '45px' }}
    //                       id="menu-appbar"
    //                       anchorEl={anchorElUser}
    //                       anchorOrigin={{
    //                         vertical: 'top',
    //                         horizontal: 'right',
    //                       }}
    //                       keepMounted
    //                       transformOrigin={{
    //                         vertical: 'top',
    //                         horizontal: 'right',
    //                       }}
    //                       open={Boolean(anchorElUser)}
    //                       onClose={handleCloseUserMenu}
    //                     >
    //                       {settings.map((setting) => (
    //                         <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
    //                           <Typography textAlign="center">{setting}</Typography>
    //                         </MenuItem>
    //                       ))}
    //                     </Menu>
    //                   </Box>

    //                 </TableCell>

    //               </TableRow>

    //               : console.log('')

    //           ))}
    //         </TableBody>

    //       </Table>

    //     </TableContainer>

    //     : <Typography variant='h5' sx={{ fontFamily: '"Inter", sans-serif', textAlign: 'center', color: 'grey' }}> {status} </Typography>}
    // </Box >






    <Box sx={{ paddingY: '20px', paddingX: '50px' }}>
      {allStudents ?

        <TableContainer component={Paper}>

          {/* Students Table */}
          <Table sx={{ minWidth: 800 }} aria-label="simple table">

            {/* Table Head */}
            <TableHead>
              <TableRow>
                <TableCell > <b> Name </b> </TableCell>
                <TableCell > <b> Email </b> </TableCell>
                <TableCell > <b> Phone </b> </TableCell>
                <TableCell > <b> Enroll Date </b> </TableCell>
                <TableCell align="right"> <b> Action </b> </TableCell>
              </TableRow>
            </TableHead>


            {/* Table Body */}
            <TableBody>
              {allStudents.map((student, index) => (

                // Table Rows
                <TableRow
                  key={student.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell width={300}> {student.name} </TableCell>
                  <TableCell width={400}>{student.email}</TableCell>
                  <TableCell width={300}>{student.phone}</TableCell>
                  <TableCell >{student.enrollDate}</TableCell>
                  <TableCell align="right">
                    <Box>
                      <Button size="small" onClick={() => editUser(student.documentId, index)}> Edit </Button>
                      <Button size="small" onClick={() => DeleteUser(student.documentId, index)}> Delete </Button>
                    </Box>
                  </TableCell>

                </TableRow>

              ))}
            </TableBody>

          </Table>

        </TableContainer>

        : <Typography variant='h5' sx={{ fontFamily: '"Inter", sans-serif', textAlign: 'center', color: 'grey' }}> Loading... </Typography>}
    </Box >
  );
}
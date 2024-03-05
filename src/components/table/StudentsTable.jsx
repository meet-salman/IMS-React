import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Alert, Backdrop, Box, Button, CircularProgress, Paper, Snackbar, Typography } from '@mui/material';
import UserContext from '../../context/UserContext'
import { deleteDocument } from '../../config/firebase/FirebaseMethods';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


let settings = ['Edit', 'Delete'];

export default function BasicTable() {

  const { allStudents, setAllStudents } = React.useContext(UserContext);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loader, setLoderOpen] = React.useState(false);
  const [alert, setAlertOpen] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [alertType, setAlertType] = React.useState();
  const [alertMsg, setAlertMsg] = React.useState();
  const { vertical, horizontal, open } = alert;

  const [id, setID] = React.useState();
  const [idx, setIdx] = React.useState();


  // BackDrop Open & CLose Function
  const loaderShow = () => {
    setLoderOpen(true);
  };
  const loaderClose = () => {
    setLoderOpen(false);
  };

  // Alert Show & Close Function
  const alertShow = (newState) => {
    setAlertOpen({ ...newState, open: true });
  };
  const alertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen({ ...alert, open: false });
  };

  const editUser = (id) => {
    console.log(id);
    setDialogOpen(true)
  }


  // Open Dialog Box to confirmation for Delete Student
  const deleteStudentDialog = (id, index) => {

    setDialogOpen(true)
    setID(id);
    setIdx(index);
  }

  // Student Delete from Database
  const DeleteUser = () => {
    loaderShow();

    deleteDocument(id, 'students')
      .then((res) => {
        allStudents.splice(idx, 1)
        setAllStudents([...allStudents])
        setDialogOpen(false)

        loaderClose();
        setAlertMsg("Student Deleted Succesfully!");
        alertShow({ vertical: 'top', horizontal: 'right' });
      })
      .catch((rej) => {
        console.log(rej);

        loaderClose();
        setAlertMsg(rej);
        alertShow({ vertical: 'top', horizontal: 'right' });
      })

  }


  return (

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
                      <Button size="small" onClick={() => deleteStudentDialog(student.documentId, index)}> Delete </Button>
                    </Box>
                  </TableCell>

                </TableRow>

              ))}
            </TableBody>

          </Table>

        </TableContainer>

        : <Typography variant='h5' sx={{ fontFamily: '"Inter", sans-serif', textAlign: 'center', color: 'grey' }}> Loading... </Typography>}






      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Student"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete the Student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}> Cancel </Button>
          <Button onClick={() => DeleteUser()} autoFocus> Delete </Button>
        </DialogActions>
      </Dialog>



      {/* Backdrop */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}  >
        <CircularProgress color="inherit" />
      </Backdrop>


      {/* Alert */}
      <Snackbar open={open} autoHideDuration={2000} onClose={alertClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} >
        <Alert severity={alertType} variant="filled" sx={{ width: '100%' }} > {alertMsg} </Alert>
      </Snackbar>

    </Box >
  );
}
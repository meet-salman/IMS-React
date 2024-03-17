import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext'
import axios from 'axios';

import { Box, Grid, Button, TextField, Paper, Alert, Snackbar, Backdrop, CircularProgress, Table, TableContainer, TableRow, TableHead, TableBody, TableCell, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';


export default function BasicTable() {

  const { allStudents, setAllStudents, currentToken } = useContext(UserContext);

  const [dialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loader, setLoderOpen] = useState(false);
  const [alert, setAlertOpen] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [alertType, setAlertType] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const { vertical, horizontal, open } = alert;

  const [id, setId] = useState();
  const [index, setIndex] = useState();

  const [editedEmail, setEditedEmail] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedCorse, setEditedCourse] = useState('');




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



  // Opening Edit Dialog Box & Setting Values
  const editStudentDialog = (id, index) => {

    setEditedName(allStudents[index].fullName);
    setEditedEmail(allStudents[index].email);
    setEditedPhone(allStudents[index].contactNo);
    setEditedCourse(allStudents[index].course);

    setEditDialogOpen(true);
    setId(id);
    setIndex(index);
  }

  // Edit Student in Database
  const editStudent = (event) => {
    event.preventDefault();

    setEditDialogOpen(false);
    loaderShow();

    const data = new FormData(event.currentTarget);

    axios(`http://localhost:3001/api/v1/students/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    })
      .then((res) => {
        loaderClose();

        allStudents[index].fullName = data.get('name');
        allStudents[index].email = data.get('email');
        allStudents[index].contactNo = data.get('phone');
        allStudents[index].course = editedCorse;

        setAllStudents([...allStudents]);

        setAlertType('success');
        setAlertMsg('Student Data Updated Successfully');
        alertShow({ vertical: 'top', horizontal: 'right' });
      })
      .catch((rej) => {
        console.log(rej);
        loaderClose();

        setAlertType('error');
        setAlertMsg(rej.message);
        alertShow({ vertical: 'top', horizontal: 'right' });
      })

  };



  // Open Dialog Box to confirmation for Delete Student
  const deleteStudentDialog = (id, index) => {

    setDeleteDialogOpen(true)
    setId(id);
    setIndex(index);
  }

  // Student Delete from Database
  const DeleteUser = () => {
    loaderShow();

    axios(`http://localhost:3001/api/v1/students/${id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    })
      .then((res) => {
        allStudents.splice(index, 1);
        setAllStudents([...allStudents]);
        setDeleteDialogOpen(false);

        loaderClose();

        setAlertType('success');
        setAlertMsg("Student Deleted Succesfully!");
        alertShow({ vertical: 'top', horizontal: 'right' });
      })
      .catch((rej) => {
        loaderClose();

        setAlertType('error');
        setAlertMsg(rej.response.data.message);
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
                <TableCell > <b> Enrolled Course </b> </TableCell>
                <TableCell > <b> Enroll Date </b> </TableCell>
                <TableCell align="right"> <b> Action </b> </TableCell>
              </TableRow>
            </TableHead>


            {/* Table Body */}
            <TableBody>
              {allStudents.length > 0 ?
                allStudents.map((student, index) => (

                  // Table Rows
                  <TableRow
                    key={student.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >

                    <TableCell width={250}> {student.fullName} </TableCell>
                    <TableCell width={300}>{student.email}</TableCell>
                    <TableCell width={200}>{student.contactNo}</TableCell>
                    <TableCell width={300}>{student.course}</TableCell>
                    <TableCell>{student.enrollDate}</TableCell>
                    <TableCell align="right">
                      <Box>
                        <Button size="small" onClick={() => editStudentDialog(student._id, index)}> Edit </Button>
                        <Button size="small" onClick={() => deleteStudentDialog(student._id, index)}> Delete </Button>
                      </Box>
                    </TableCell>

                  </TableRow>

                ))
                :
                <TableRow>
                  <TableCell> <i> No Students Data </i> </TableCell>
                </TableRow>
              }
            </TableBody>

          </Table>

        </TableContainer>

        : <Box sx={{ display: 'flex', justifyContent: 'center' }}   > <CircularProgress /> </Box>
      }





      {/* Is User Delete Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>
          {"Delete Student"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure to delete the Student?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}> Cancel </Button>
          <Button onClick={() => DeleteUser()} autoFocus> Delete </Button>
        </DialogActions>
      </Dialog>


      {/* User Edit Dialog */}
      <Dialog
        spacing={2}
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      >
        <DialogTitle  >
          {"Edit Student"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Enter Edited Information to Update the Student.

            {/* register Form */}
            <Box component="form" onSubmit={editStudent} sx={{ mt: 3 }}>

              {/* Form Fields */}
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <TextField fullWidth name="name" required label="Full Name" value={editedName} onChange={(event) => setEditedName(event.target.value)} />
                </Grid>

                <Grid item xs={12}>
                  <TextField required fullWidth label="Email Address" name="email" autoComplete="email" value={editedEmail} onChange={(event) => setEditedEmail(event.target.value)} />
                </Grid>

                <Grid item xs={12}>
                  <TextField required fullWidth label="Phone No" name="phone" autoComplete="phone" value={editedPhone} onChange={(event) => setEditedPhone(event.target.value)} />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel > Select Course </InputLabel>
                    <Select
                      label="Select Course"
                      name='course'
                      value={editedCorse}
                      onChange={(event) => setEditedCourse(event.target.value)}
                      fullWidth
                    >
                      <MenuItem value={'Web Development'}> Web Development </MenuItem>
                      <MenuItem value={'App Development'}> App Development </MenuItem>
                      <MenuItem value={'Digital Marketing'}> Digital Marketing </MenuItem>
                      <MenuItem value={'Graphic Designing'}> Graphic Designing </MenuItem>
                      <MenuItem value={'Video Editing'}> Video Editing </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

              </Grid>

              <DialogActions sx={{ marginTop: '10px' }}>
                <Button onClick={() => setEditDialogOpen(false)}> Cancel </Button>
                <Button type='submit' onClick={() => editStudent()} variant="contained"> Update </Button>
              </DialogActions>

            </Box>

          </DialogContentText>
        </DialogContent>


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
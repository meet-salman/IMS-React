import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/UserContext';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Grid, Button, Typography, CssBaseline, Avatar, Snackbar, Alert, Backdrop, CircularProgress, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';


const defaultTheme = createTheme();

export default function SignUp() {

  const { setIsUser, setCurrentUser, setCurrentToken } = useContext(UserContext);

  const date = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-PK', options);

  const [course, setCourse] = useState('');

  const [loader, setLoderOpen] = useState(false);
  const [alert, setAlertOpen] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [alertType, setAlertType] = useState();
  const [alertMsg, setAlertMsg] = useState();

  const { vertical, horizontal, open } = alert;


  // UseNavigate
  const navigate = useNavigate()

  // Naviagate to Login
  const navigateUser = () => {
    navigate('/login')
  }

  // BackDrop Open & CLose Function
  const loaderShow = () => {
    setLoderOpen(true);
  };
  const loaderClose = () => {
    setLoderOpen(false);
  };

  //   Alert Show & Close Function
  const alertShow = () => {
    setAlertOpen({ vertical: 'top', horizontal: 'right', open: true });

  };
  const alertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen({ ...alert, open: false });
  };


  // User Register Function
  const UserRegister = (event) => {
    event.preventDefault();
    loaderShow();
    const data = new FormData(event.currentTarget);

    // Register Using API
    axios.post('http://localhost:3001/api/v1/students/register', {
      fullName: data.get('name'),
      age: data.get('age'),
      email: data.get('email'),
      contactNo: data.get('phone'),
      course: course,
      enrollDate: formattedDate,
      password: data.get('password')
    })
      .then((res) => {

        // Login After Register Using API
        axios.put('http://localhost:3001/api/v1/students/login', {
          email: data.get('email'),
          password: data.get('password')
        })
          .then((res) => {
            loaderClose();
            console.log(res.data.student);

            let tokens = res.data.student.tokens;
            setCurrentToken(tokens[tokens.length - 1]);

            const token = JSON.stringify(tokens[tokens.length - 1]);
            localStorage.setItem('token', token);

            const user = JSON.stringify(res.data.student);
            localStorage.setItem('user', user);

            setIsUser(true);
            setCurrentUser(res.data.student);

            setAlertType('success');
            setAlertMsg('SignUp Successfully!');
            alertShow();

            navigate('/profile')
          })
          .catch((rej) => {
            console.log(rej);
            loaderClose();

            setAlertType('error');
            setAlertMsg(`${rej}`);
            alertShow();
          })

      })
      .catch((rej) => {
        loaderClose();

        setAlertType('error');
        setAlertMsg(`${rej.response.data.message}`);
        alertShow();
      })

  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />

        {/* Form Area */}
        <Box sx={{ marginY: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

          {/* Form Header */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> <LockOutlinedIcon /> </Avatar>
          <Typography component="h1" variant="h5"> Register Yourself  </Typography>

          {/* register Form */}
          <Box component="form" onSubmit={UserRegister} sx={{ mt: 3 }}>

            {/* Form Fields */}
            <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth name="name" required label="Full Name" autoFocus />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="phone" label="Phone No" name="phone" autoComplete="phone" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="age" label="Age" name="age" />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel > Select Course </InputLabel>
                  <Select
                    label="Select Course"
                    name='course'
                    value={course}
                    onChange={(event) => setCourse(event.target.value)}
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

              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
              </Grid>

            </Grid>

            {/* Register Button */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Register  </Button>

            {/* Short Link to Navigate Login */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography onClick={navigateUser} sx={{ fontSize: '14px', color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }}>  Already have an account? Sign in </Typography>
              </Grid>
            </Grid>

          </Box>

        </Box>

        {/* Backdrop */}
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}  >
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* Alert */}
        <Snackbar open={open} autoHideDuration={2000} onClose={alertClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} >
          <Alert severity={alertType} variant="filled" sx={{ width: '100%' }} > {alertMsg} </Alert>
        </Snackbar>

      </Container>
    </ThemeProvider>
  );
}
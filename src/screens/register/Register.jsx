import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../config/firebase/FirebaseMethods';
import { Snackbar, Alert, Backdrop, CircularProgress, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select from '@mui/material/Select';


const defaultTheme = createTheme();

export default function SignUp() {

  const date = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-PK', options);

  const [course, setCourse] = React.useState('');

  const [loader, setLoderOpen] = React.useState(false);
  const [alert, setAlertOpen] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [alertType, setAlertType] = React.useState();
  const [alertMsg, setAlertMsg] = React.useState();

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
  const alertShow = (newState) => {
    setAlertOpen({ ...newState, open: true });
  };
  const alertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen({ ...alert, open: false });
  };


  // Setting Course Value
  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  // User Register Function
  const UserRegister = (event) => {
    event.preventDefault();
    loaderShow()
    const data = new FormData(event.currentTarget);

    // User Register to Firebase
    signUpUser({
      name: data.get('fullName'),
      email: data.get('email'),
      phone: data.get('phone'),
      age: data.get('age'),
      course: course,
      password: data.get('password'),
      enrollDate: formattedDate,
      type: 'student'
    })
      .then((res) => {
        loaderClose()

        setAlertType('success')
        setAlertMsg('SignUp Successfully')
        alertShow({ vertical: 'top', horizontal: 'right' })
        navigate('/')
      })
      .catch((rej) => {
        console.log(rej);
        loaderClose()

        setAlertType('error')
        setAlertMsg(`${rej}`)
        alertShow({ vertical: 'top', horizontal: 'right' })
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
                <TextField fullWidth name="fullName" required label="Full Name" autoFocus />
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <TextField label="Last Name" fullWidth name="lastName" autoComplete="family-name" />
              </Grid> */}

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
                    onChange={handleChange}
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
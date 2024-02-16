import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Alert, Backdrop, CircularProgress, Snackbar } from '@mui/material';
import { loginUser } from '../../config/firebase/FirebaseMethods';


const defaultTheme = createTheme();

export default function SignIn() {

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

  // Naviagate to Register
  const navigateUser = () => {
    navigate('/register')
  }


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


  // User Login Function
  const UserLogin = (event) => {
    event.preventDefault();
    loaderShow()
    const data = new FormData(event.currentTarget);

    // Login User From Firebase
    loginUser({
      email: data.get('email'),
      password: data.get('password')
    })
      .then((res) => {
        console.log(res);
        loaderClose()

        setAlertType('success')
        setAlertMsg('Login Successfully')
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        {/* Form Area */}
        <Box sx={{ marginY: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >

          {/* Form Header */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> <LockOutlinedIcon /> </Avatar>
          <Typography component="h1" variant="h5"> Sign in </Typography>

          {/* SignIn Form */}
          <Box component="form" onSubmit={UserLogin} sx={{ mt: 1 }}>

            {/* Form Fields */}
            <Box>
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />

              <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />

              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Sign In </Button>
            </Box>

            {/* Shor Links */}
            <Grid container>

              {/* Short Link to Navigate Register */}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Typography onClick={navigateUser} sx={{ fontSize: '14px', color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }}>  Already have an account? Sign in </Typography>
                </Grid>
              </Grid>

            </Grid>

          </Box>

        </Box>

        {/* BackDrop */}
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
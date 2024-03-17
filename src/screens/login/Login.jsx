import { useState, useContext } from 'react';
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
import UserContext from '../../context/UserContext';
import axios from 'axios';


const defaultTheme = createTheme();

export default function SignIn() {

  const { setIsUser, setCurrentUser, setCurrentToken } = useContext(UserContext);

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
  const alertShow = () => {
    setAlertOpen({ vertical: 'top', horizontal: 'right', open: true });
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
    loaderShow();
    const data = new FormData(event.currentTarget);

    // Login Using API
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

        alertShow();
        setAlertType('success');
        setAlertMsg(`${res.data.message}`);
        navigate('/profile')
      })
      .catch((rej) => {
        console.log(rej);
        loaderClose();

        setAlertType('error');
        setAlertMsg(`${rej}`);
        alertShow();
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
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import userContext from '../../context/UserContext'

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Container, AppBar, Button, Typography, Toolbar, Tooltip, Avatar, Backdrop, Snackbar, Alert, CircularProgress, Menu, MenuItem, IconButton } from '@mui/material';


const pages = ['home', 'courses'];
let settings = [];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { isUser, setIsUser, currentUser, setCurrentUser, currentToken, setCurrentToken } = useContext(userContext);

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

  // Navigate to SignUp
  const navigateToSignUp = () => {
    navigate('/register')
  }

  // Navigate to Login
  const navigateToLogin = () => {
    navigate('/login')
  }

  // UseEffect to set Nav Items
  useEffect(() => {

    if (isUser) {
      if (currentUser.type === 'admin') {
        settings = ['Dashboard', 'Logout'];
      }
      else {
        settings = ['Profile', 'Logout'];
      }
    }

  }, [isUser]);


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


  // Handle NavBar Menues
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);

    page === 'home' ? navigate(`/`) : navigate(`/${page}`)

  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

    if (setting === 'Dashboard') {
      navigate('/admin')
    } else if (setting === 'Profile') {
      navigate('/profile')
    } else if (setting === 'Logout') {

      loaderShow();

      // Logged Out Using API
      axios('http://localhost:3001/api/v1/students/logout', {
        method: 'put',
        headers: {
          Authorization: `Bearer ${currentToken}`
        }
      })
        .then((res) => {
          loaderClose();
          setAlertType('success');
          setAlertMsg(res.data.message);
          alertShow();

          localStorage.removeItem('token');
          localStorage.removeItem('user');

          setIsUser(false);
          setCurrentUser();
          setCurrentToken();

          navigateToLogin();
        })
        .catch((rej) => {
          loaderClose();
          setAlertType('error');
          setAlertMsg(rej.message);
          alertShow();
        })

    }


  };

  return (
    <Box>
      <AppBar position="static">

        <Container maxWidth="xl">
          <Toolbar disableGutters>

            {/* Logo */}
            <Typography
              variant="h6"
              noWrap
              href="/"
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SkillPoint
            </Typography>

            {/* Hamburger Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Responsive Logo */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SkillPoint
            </Typography>

            {/* Nav Menue */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>


            {/* User Menue */}
            {isUser
              ?
              < Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                    <AccountCircleIcon fontSize='large' sx={{ color: '#ffff' }} />
                  </IconButton>
                </Tooltip>
                <Menu

                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              :
              <Box>
                <Button color="inherit" onClick={navigateToLogin}>Login</Button>
                <Button color="inherit" onClick={navigateToSignUp}>Register</Button>
              </Box>
            }

          </Toolbar>
        </Container>
      </AppBar >




      {/* Backdrop */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}  >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Alert */}
      <Snackbar open={open} autoHideDuration={2000} onClose={alertClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} >
        <Alert severity={alertType} variant="filled" sx={{ width: '100%' }} > {alertMsg} </Alert>
      </Snackbar>
    </Box>
  );
}
export default ResponsiveAppBar;

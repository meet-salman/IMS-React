import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { getUserData, signOutUser } from '../../config/firebase/FirebaseMethods';
import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import userContext from '../../context/UserContext'


const pages = ['home', 'courses'];
let settings = [];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { isUser, setIsUser } = React.useContext(userContext);
  const [userData, setUserData] = React.useState();

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


  // UseEffect to get User Data
  React.useEffect(() => {

    getUserData()
      .then((res) => {
        setUserData(res)

        res.type === 'admin' ? settings = ['Dashboard', 'Logout'] : settings = ['Profile', 'Logout']

      })
      .catch((rej) => {
        console.log(rej);
      })

  }, [userData])


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
      signOutUser()
      setIsUser(false)
      setCurrentUser()
    }


  };

  return (
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
                  <AccountCircleIcon fontSize='large' sx={{color:'#ffff'}}/>
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
  );
}
export default ResponsiveAppBar;

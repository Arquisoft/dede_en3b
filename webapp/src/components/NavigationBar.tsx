import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { Link} from 'react-router-dom';
import logo from '../logo.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { doSolidLogout } from '../api/api';

const StyledTypography = styled(Typography)(({ theme }) => ({
  '&':{
    color: theme.palette.common.white,
  }
})) as typeof Typography;


interface NavigationBarProps {
  changeTheme: Function;
  themeState: boolean;
}

function ToggleColorMode(props: any) {
  return (
  <IconButton sx={{ ml: 1 }} onClick={props.changeTheme} color="inherit">
        {props.themeState === false ? <Brightness7Icon sx={{color: 'white'}} /> : <Brightness4Icon />}
    </IconButton>
  )
};

export default function PrimarySearchAppBar(props: NavigationBarProps) : JSX.Element {
  
  var units = 0;
  const cart = useSelector((state:RootState) => state.cart.value);
  cart.forEach((item) => units += item.units);
  
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const goToLogin = () => {
    handleMenuClose();
    navigate('/login');
  }

  const goToOrders = () => {
    handleMenuClose();
    navigate('/orders/find');
  }

  const handleLogout = async () => {
    handleMenuClose();
    await doSolidLogout();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={goToLogin}>
      <Typography
            sx={{ color:'text.dark'}}>
            Profile
          </Typography>
        </MenuItem>
      <MenuItem onClick={goToOrders}>
      <Typography
            sx={{ color:'text.dark'}}>
            My orders
          </Typography>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
      <Typography
            sx={{ color:'text.dark'}}>
            Logout
          </Typography>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      color='background.default'
    >
      <MenuItem>
      <ToggleColorMode
              changeTheme={props.changeTheme}
              themeState={props.themeState}
          />
          <Typography
            sx={{ color:'text.dark'}}>
            Lights out
          </Typography>
      </MenuItem>
      <MenuItem onClick={() =>
          { navigate('shop');
          handleMobileMenuClose();
          }
        }>
        <IconButton size="large" aria-label="show 4 new mails" color="default">
            <SearchIcon />
        </IconButton>
        <Typography
            sx={{ color:'text.dark'}}>
              Catalogue
          </Typography>
      </MenuItem>
      <MenuItem onClick={() =>{ 
          navigate('cart');
          handleMobileMenuClose();
          }}>
        <IconButton
          size="large"
          aria-label={"show " + cart.forEach  + "new notifications"}
          color="default"
        >
          
          <Badge badgeContent={units} color="error">
            
            <ShoppingCartIcon />  
          
            </Badge>
            
          </IconButton>
          <Typography
            sx={{ color:'text.dark'}}>
            Shopping cart
          </Typography>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="default"
        >
          <AccountCircle />
        </IconButton>
        <Typography
            sx={{ color:'text.dark'}}>
            Profile
          </Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "background.dark", opacity: 0.95 }}> 
        <Toolbar>
          
          <Link to="/">
            <IconButton>
              <img src={logo} alt="logo" id="app-logo"/>
            </IconButton>
          </Link>
          
          <Link to="/" style={{textDecoration: 'none'}}>
          <StyledTypography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 1 }}
          >
            DeDe
          </StyledTypography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ mx: 'auto', display: { xs: 'none', md: 'flex'}, flexWrap: 'wrap' }} >
          <Link to="shop" style={{ color: '#FFF', textDecoration:'none' }}>
            <IconButton size="large" aria-label="go to shop" color="inherit">
                <Typography
                  variant='h5'
                  color='text.light'
                >
                  Catalogue
                </Typography>              
            </IconButton>
          </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ mx: 'auto', display: { xs: 'none', md: 'flex'}, flexWrap: 'wrap' }} >
          <Link to="cart" style={{ color: '#FFF', textDecoration:'none' }}>
          <IconButton size="large" 
            aria-label={"show " + units  + "new notifications"} 
            color="inherit">                
              <Badge badgeContent={units} color="error">
                <Typography
                  variant='h5'
                  color='text.light'
                >
                  Cart
                </Typography>
                  {//<ShoppingCartIcon />
}
              </Badge>              
            </IconButton>
          </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <a href= "https://arquisoft.github.io/dede_en3b/"
          style={{ color: '#FFF', textDecoration:'none' }}>
            <IconButton size="large" aria-label="about us" color="inherit">
                <Typography
                  variant='h5'
                  color='text.light'
                >
                  About us
                </Typography>              
            </IconButton>
          </a>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ mx: 'auto', display: { xs: 'none', md: 'flex'}, flexWrap: 'wrap' }} >
            <IconButton size="large"
            edge="end" 
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit">
                <Typography
                  variant='h5'
                  color='text.light'
                >
                  Profile
                </Typography>   
                           
            </IconButton>
      
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <ToggleColorMode
              changeTheme={props.changeTheme}
              themeState={props.themeState}
          />   
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'right' }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MenuIcon />
                </IconButton>
          </Box>
        </Toolbar>
        
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      </Box>
      </>

     
        
  );
}
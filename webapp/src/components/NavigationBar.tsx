import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link} from 'react-router-dom';
import logo from '../logo.png';
import { useNavigate } from 'react-router-dom';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// eslint-disable-next-line
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
// eslint-disable-next-line
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  '&':{
    color: theme.palette.common.white,
  }
})) as typeof Typography;


interface NavigationBarProps {
  numberOfProductsInCart: number;
  changeTheme: Function;
  themeState: boolean;
}

function ToggleColorMode(props: any) {
  return (
   <IconButton sx={{ ml: 1 }} onClick={props.changeTheme} color="inherit">
        {props.themeState === false ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
};


export default function PrimarySearchAppBar(props: NavigationBarProps) : JSX.Element {
  
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
      <MenuItem onClick={goToLogin}>Profile</MenuItem>
      <MenuItem onClick={goToOrders}>My orders</MenuItem>
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
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <SearchIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label={"show " + props.numberOfProductsInCart  + "new notifications"}
          color="inherit"
        >
          
          <Badge badgeContent={17} color="error">
            
            <ShoppingCartIcon />  
          
            </Badge>
            
          </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "background.dark"}}> 
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link to="/">
            <IconButton>
              <img src={logo} alt="logo" id="app-logo"/>
            </IconButton>
          </Link>
          
          <StyledTypography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            DeDe_en3B
          </StyledTypography>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <ToggleColorMode
              changeTheme={props.changeTheme}
              themeState={props.themeState}
          />
          <Link to="shop" style={{ color: '#FFF' }}>
            <IconButton size="large" aria-label="go to shop" color="inherit">
              <Badge color="error">
              
            <SearchIcon />  
          
              </Badge>
              </IconButton>
              </Link>
            <Link to="cart" style={{ color: '#FFF' }}>
            <IconButton
              size="large"
              aria-label={"show " + props.numberOfProductsInCart  + "new notifications"}
              color="inherit"
              >
                
              <Badge badgeContent={props.numberOfProductsInCart} color="error">
              
            <ShoppingCartIcon />  
                 
              </Badge>
              </IconButton>
              </Link>
              
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
                  color=
                  "inherit"
            >
              <AccountCircle />
                </IconButton>
                
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
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
import React, { useState } from 'react';
import clsx from 'clsx';
import logo from '../assets/images/logo.png';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as CartIcon } from '../assets/icons/cart.svg';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import MenuList from '@material-ui/core/MenuList';
import HeaderUser from './HeaderUser';
import SearchBox from './SearchBox';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Drawer, Hidden, Button } from '@material-ui/core';
import { setOpenCartDrawer } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: '#fff',
    color: '#444',
    transition: 'all .2s',
    boxShadow: '0px 2px 8px -1px rgb(0 0 0 / 10%)',
    paddingRight: '0 !important',
  },
  header2: {
    backgroundColor: '#fff',
    color: '#444',
    transition: 'all .2s',
    boxShadow: '0px 2px 8px -1px rgb(0 0 0 / 10%)',
    paddingRight: '0 !important',
  },
  menuButton: {
    display: 'none',
    marginRight: theme.spacing(2),
    '@media(max-width: 740px)': {
      display: 'block',
    },
  },
  logoWrapper: {
    flexBasis: '20%',
    maxWidth: '20%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flexGrow: 1,
    maxWidth: 140,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 120,
      marginLeft: 16,
    },
  },
  navMenu: {
    flexBasis: '40%',
    maxWidth: '40%',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexBasis: 'unset',
      maxWidth: 'unset',
    },
  },
  drawer: {
    width: 250,
  },
  navList: {
    display: 'flex',
    alignItems: 'center',
  },
  tryOnButton: {
    marginLeft: theme.spacing(2),
    backgroundColor: '#ff6f61',
    color: '#fff',
    textTransform: 'none',
    borderRadius: 20,
    padding: '6px 16px',
    '&:hover': {
      backgroundColor: '#ff3d2e',
    },
  },
  navListMobile: {
    width: '250px',
    marginTop: 50,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '& .MuiListItem-root': {
      width: '100%',
      justifyContent: 'center',
    },
  },
  sectionDesktop: {
    flexBasis: '40%',
    maxWidth: '40%',
    ...theme.mixins.customize.flexMixin('flex-end', 'center'),
    [theme.breakpoints.down('sm')]: {
      flexBasis: 'unset',
      maxWidth: 'unset',
      flexGrow: 1,
    },
  },
  closeButton: {
    position: 'fixed',
    top: 10,
    left: 20,
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [mobile, setMobile] = useState(false);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const onMobile = useMediaQuery('(max-width:740px)');

  const classes = useStyles({ mobile });
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    target: window ? window : undefined,
    threshold: 80,
  });

  const handleCloseDrawer = () => {
    setMobile(false);
  };

  const handleTryOnClick = () => {
    window.open('https://yisol-idm-vton.hf.space/', '_blank');
  };

  return (
    <AppBar position='fixed' className={clsx(classes.header, trigger && classes.header2)}>
      <Toolbar>
        <Toolbar className={classes.navMenu}>
          <IconButton edge='start' className={classes.menuButton} onClick={() => setMobile(!mobile)} color='inherit'>
            <MenuIcon />
          </IconButton>
          {!onMobile ? (
            <MenuList className={classes.navList} role='presentation'>
              <MenuItem disableRipple component={Link} to='/' style={{ marginLeft: -16 }}>Home</MenuItem>
              <MenuItem component={Link} to='/shop' disableRipple>Shop</MenuItem>
              <MenuItem component={Link} to='/' disableRipple>About Us</MenuItem>
              <Button className={classes.tryOnButton} onClick={handleTryOnClick}>Try-On</Button>
            </MenuList>
          ) : (
            <Drawer
              variant='temporary'
              anchor='left'
              className={classes.drawer}
              open={mobile}
              onClose={handleCloseDrawer}
              ModalProps={{ keepMounted: true, disablePortal: true }}
            >
              <MenuList className={classes.navListMobile} role='presentation'>
                <MenuItem component={Link} to='/' onClick={handleCloseDrawer}>Home</MenuItem>
                <MenuItem component={Link} to='/shop' onClick={handleCloseDrawer}>Shop</MenuItem>
                <MenuItem component={Link} to='/' onClick={handleCloseDrawer}>About Us</MenuItem>
                <MenuItem onClick={handleTryOnClick}>Try-On</MenuItem>
                {/* User-related links omitted for brevity */}
              </MenuList>
              <IconButton edge='start' className={classes.closeButton} onClick={handleCloseDrawer} color='inherit'>
                <CloseIcon />
              </IconButton>
            </Drawer>
          )}
        </Toolbar>

        <Link to='/' className={classes.logoWrapper}>
          <img src={logo} alt='logo' className={classes.logo} />
        </Link>

        <div className={classes.sectionDesktop}>
          <IconButton color='inherit' onClick={() => setOpenSearchDrawer(true)}>
            <SearchIcon height={22} width={22} />
          </IconButton>

          <Drawer anchor='top' open={openSearchDrawer} onClose={() => setOpenSearchDrawer(false)}>
            <SearchBox setOpenSearchDrawer={setOpenSearchDrawer} />
          </Drawer>

          <IconButton color='inherit' onClick={() => dispatch(setOpenCartDrawer(true))}>
            <Badge badgeContent={cartItems.length} color='secondary'>
              <CartIcon />
            </Badge>
          </IconButton>

          <Hidden smDown>
            <HeaderUser />
          </Hidden>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

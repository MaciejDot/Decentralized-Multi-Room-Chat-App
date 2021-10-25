import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useTypedStyles from '../../hooks/useTypedStyles'
import { appMenuClasses } from '../../theme/appMenuClasses'
import { ChevronLeft,  Lock, Search, Settings } from '@material-ui/icons';
import { useToggle } from 'react-use';
import { Container, CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { getAuthUser } from '../../db';

export const AppMenu = (props: {children?:any}) =>{
  const classes = useTypedStyles(appMenuClasses);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () =>{
      getAuthUser().leave();
      document.location.reload();
  }

  const [drawerIsOpen, setDrawerOpen] = useToggle(false);

  const handleDrawerOpen = () => {
    setDrawerOpen();
  };

  const handleDrawerClose = () => {
    setDrawerOpen();
  };

  const [alias , setAlias] = useState("")

  useEffect(()=>{
    getAuthUser().get("alias").once(x=> setAlias(x));
  },[])

  return (
        <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, drawerIsOpen && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, drawerIsOpen && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Distributed Multi Room Chat
          </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
                <Typography variant="subtitle1">{alias}</Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/settings"><Settings />User Theme Settings</MenuItem>
                <MenuItem onClick={onLogout}><Lock />Logut</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={drawerIsOpen}
        classes={{
          paper: clsx(classes.drawerPaper, !drawerIsOpen && classes.drawerPaperClose),
        }}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List> <ListItem button>
      <Tooltip title="Search">
      <ListItemIcon>
        <Search />
      </ListItemIcon>
      </Tooltip>
      {drawerIsOpen && <ListItemText primary="Search for room" />}
      </ListItem>
    </List>
        <Divider />
        <List>...</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
         {props.children}
        </Container>
      </main>
      </div>
  );
}
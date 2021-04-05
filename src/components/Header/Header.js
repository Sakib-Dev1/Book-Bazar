import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { store } from '../../store/store';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../../helpers/firebase.config';
import { logOutAction } from '../../store/action/actions';
import { useState } from 'react';
import { Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const {
    dispatch,
    state: { user },
  } = useContext(store);

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            className={classes.title}
            onClick={() => history.push('/')}
          >
            Book Bazar
          </Typography>

          <Button onClick={() => history.push('/orders')} color='inherit'>
            Orders
          </Button>

          {user?.name ? (
            <div>
              <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
                color='inherit'
              >
                Admin
              </Button>

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id='menu-list-grow'
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={() => history.push('/books')}>
                            Manage Books
                          </MenuItem>
                          <MenuItem
                            onClick={() => history.push('/create-book')}
                          >
                            Create Book
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <Button color='inherit'>{user.name}</Button>
              <Button
                onClick={(e) => {
                  auth.signOut();
                  dispatch(logOutAction());
                }}
                color='inherit'
              >
                Log Out
              </Button>
            </div>
          ) : (
            <Button color='inherit' onClick={() => history.push('/login')}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

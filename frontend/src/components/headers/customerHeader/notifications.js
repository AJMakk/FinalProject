import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Badge from '@material-ui/core/Badge';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function NotificationsDropDownMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLength, setNotificationsLength] = useState(0);

  const holderNotif = [];

  const options = {
    broadcaster: "pusher",
    key: "9d2040fd9f3ee80d3e21",
    cluster: "eu",
    forceTLS: true,
  
  };
  const echo = new Echo(options);
  echo.channel('appointment-approved').listen('AppointmentApproved', (e) => {
    console.log('notif: ',e.message);
    holderNotif.push(e.message);
    setNotifications(holderNotif);
    setNotificationsLength(holderNotif.length);
  })

  let history = useHistory();

  const handleProfile = () => {
    history.push("/customer/profile")
    handleToggle()
  }

  const handleAppointments = (event) => {
    history.push("/customer/myappointments")
    handleToggle()
  }

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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >   <Badge badgeContent={notificationsLength} color="primary">
                <NotificationsIcon />
            </Badge>
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {notifications.map((item) => {
                    return (
                      <MenuItem>{item} </MenuItem>
                    )
                  })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
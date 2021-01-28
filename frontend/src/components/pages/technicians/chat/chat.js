import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import api from '../../../../api';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    opacity:'0.90',
    marginLeft: theme.spacing(5)

  },
  table: {
    marginTop: theme.spacing(7)
  },
  Title: {
    marginLeft: theme.spacing(2),
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
  },
  chattersList: {
    
  },
  chatSection: {
    width: '95%',
    height: '80vh'
  },
  messagesName: {
    
    marginRight: theme.spacing(20)
  },
  headBG: {
      backgroundColor: '#e0e0e0'
    
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  sendIcon: {
    marginBottom: theme.spacing(200)
  }
}));


const TechnicianChat = () => {
  const classes = useStyles();
  const [currentCustomerId, setCurrentCustomerId] = useState(null);
  const [currentCustomerName, setCurrentCustomerName] = useState('');
  const [customers, setCustomers] = useState([]);
  const [customerMessages, setCustomerMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const[instantMessages, setInstantMessages] = useState([]);

  const technicianId = localStorage.getItem('UsersId');

  const holderMessages = [];

  const options = {
    broadcaster: "pusher",
    key: "9d2040fd9f3ee80d3e21",
    cluster: "eu",
    forceTLS: true,
  
  };
  const echo = new Echo(options);
  echo.channel('messages-sent-to-technician'+technicianId).listen('MessageSentToTechnician', (e) => {
    console.log('notif: ',e.message);
    holderMessages.push(e.message);
    setInstantMessages(holderMessages);
  })
  
  const handleSendKeypress = async () => {
    try {
        await api.technicianSendMessage({
             technicianId,currentCustomerId,newMessage
        });
        handleGetMessages(technicianId,currentCustomerId);
       }
       catch {
        alert('Failed to send message');
       }
        
  };
  
  async function loadUsers() {
    try {
      await api.getUsers(technicianId).then(res => {
           const customerData = res.data;
           setTimeout (() =>{
               setCustomers(customerData.users);
               console.log('techncians search: ', customers);
           }, 600)
        
           console.log('techncians data: ', customerData);   
      })
   }
   catch {
     alert('Failed to get users.');  
   }

  }
 const handleGetMessages = async (technician_id,user_id) => {

    try {
        await api.getMessagesFromUser({
             technician_id,user_id
        }).then(res=> {
              const messages = res.data.messages;
              setCustomerMessages(messages.reverse());
              console.log('messages: ', customerMessages)
        });
       }
       catch {
        alert('Failed to get messages');
       }
 }
 
 useEffect(() => {
  
  loadUsers();
 
}, []);
  return (
      <div className={classes.root}>
        <Grid className={classes.table} container>
            <Grid item xs={12} >
                <Typography variant="h6" className={classes.Title}>Messages</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
                <List className={classes.chattersList}>
                    {customers.map((customer) => {
                        return (
                            <ListItem 
                                button
                                value={customer.first_name + ' ' + customer.last_name} 
                                id={customer.id} 
                                onClick={() => {
                                setCurrentCustomerName(customer.first_name + ' ' + customer.last_name);
                                setCurrentCustomerId(customer.id);
                                handleGetMessages(technicianId,customer.id)}}
                            >
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp"  />
                                </ListItemIcon>
                                <ListItemText primary={customer.first_name + ' ' + customer.last_name}></ListItemText>
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
            <Grid item xs={9}>
            <List className={classes.messageArea}>
            <Typography className={classes.messagesName} variant="h6" primary =" Omar Kabbara">
            &nbsp;{currentCustomerName}
            </Typography>
            <Divider />
                    {customerMessages.map((message) => {
                        return(
                        <ListItem id={message.id}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align={message.sent_by_user === 0 ? "right" : "left" }>{message.content}</ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align={message.sent_by_user === 0 ? "right" : "left" } secondary={message.created_at.substr(11, 5)}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        )
                    })}
                    {instantMessages.map((message) => {
                        return(
                        <ListItem id={message.id}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align={message.sent_by_user === 0 ? "right" : "left" }>{message.content}</ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align={message.sent_by_user === 0 ? "right" : "left" } secondary={message.created_at.substr(11, 5)}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        )
                    })}    
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField 
                        id="messageField" 
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)} label="Type a message." fullWidth />
                    </Grid>
                    
                    <Grid xs={1}  align="center">
                        <Fab  size ="medium" className={classes.sendIcon} color="primary" onClick={handleSendKeypress} aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default TechnicianChat;
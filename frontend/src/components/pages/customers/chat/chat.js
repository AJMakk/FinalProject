import React, { useState } from 'react';
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


const CustomerChat = () => {
  const classes = useStyles();
  const [currentTechnicianId, setCurrentTechnicianId] = useState(null);
  const [currentTechnicianName, setCurrentTechnicianName] = useState('');
  const [search, setSearch] = useState('');
  const [technicians, setTechnicians] = useState([]);
  const [technicianMessages, setTechnicianMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [instantMessages, setInstantMessages] = useState([]);
  
  const userId = localStorage.getItem('UsersId');

  const holderMessages = [];

  const options = {
    broadcaster: "pusher",
    key: "9d2040fd9f3ee80d3e21",
    cluster: "eu",
    forceTLS: true,
  
  };
  const echo = new Echo(options);
  echo.channel('messages-sent-to-user'+userId).listen('MessageSentToUser', (e) => {
    console.log('notif: ',e.message);
    holderMessages.push(e.message);
    setInstantMessages(holderMessages);
  })

  const handleEnterSearchKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
       (async() => {
           try {
               await api.searchForTechnicians(search).then(res => {
                    const techniciansData = res.data;
                    setTimeout (() =>{
                        setTechnicians(techniciansData.technicians);
                        console.log('techncians search: ', technicians);
                    }, 600)
                 
                    console.log('techncians data: ', techniciansData);   
               })
            }
            catch {
              alert('Failed to search for tradesmen.');  
            }
        })();  
    
    }
    
  };
  const handleSendKeypress = async () => {
    try {
        await api.customerSendMessage({
             userId,currentTechnicianId,newMessage
        });
        handleGetMessages(userId,currentTechnicianId);
       }
       catch {
        alert('Failed to send message');
       }
        
  };
  
 const handleGetMessages = async (user_id,technician_id) => {

    try {
        await api.getMessagesFromTechnician({
             user_id,technician_id
        }).then(res=> {
              const messages = res.data.messages;
              setTechnicianMessages(messages.reverse());
              console.log('messages: ', technicianMessages)
        });
       }
       catch {
        alert('Failed to get messages');
       }
 }

  return (
      <div className={classes.root}>
        <Grid className={classes.table} container>
            <Grid item xs={12} >
                <Typography variant="h6" className={classes.Title}>Messages</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>               
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField 
                    id="tradesman-search" 
                    label="Search for a tradesman to message! " 
                    variant="outlined" 
                    onChange={e => setSearch(e.target.value)}
                    onKeyPress={handleEnterSearchKeypress}
                    fullWidth />
                </Grid>
                    <Divider />
                <List className={classes.chattersList}>
                    {technicians.map((technician) => {
                        return (
                            <ListItem 
                                button
                                value={technician.first_name + ' ' + technician.last_name} 
                                id={technician.id} 
                                onClick={() => {
                                setCurrentTechnicianName(technician.first_name + ' ' + technician.last_name);
                                setCurrentTechnicianId(technician.id);
                                handleGetMessages(userId,technician.id)}}
                            >
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp"  />
                                </ListItemIcon>
                                <ListItemText primary={technician.first_name + ' ' + technician.last_name}></ListItemText>
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
            </Grid>
            <Grid item xs={9}>
            <List className={classes.messageArea}>
            <Typography className={classes.messagesName} variant="h6" primary =" Omar Kabbara">
            &nbsp;{currentTechnicianName}
            </Typography>
            <Divider />
                    {technicianMessages.map((message) => {
                        return(
                        <ListItem id={message.id}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align={message.sent_by_user === 1 ? "right" : "left" }>{message.content}</ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align={message.sent_by_user === 1 ? "right" : "left" } secondary={message.created_at.substr(11, 5)}></ListItemText>
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

export default CustomerChat;
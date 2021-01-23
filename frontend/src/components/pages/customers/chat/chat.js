import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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

// create hook function: 

function ChatComponent() {
    const [user, setUser] = useState([]);
    const [messages, setMessages] = useState([]);
    
    return(
    <div>
        <Typography></Typography>
    </div>
        );
}

function changeChatData() {
    
}

function LoayChatData() {
    const classes = useStyles();

    return(
        <List className={classes.messageArea}>
            <Typography className={classes.messagesName} variant="h6" primary =" Loay Farhat">
            &nbsp;Loay Farhat
            </Typography>
            <Divider />
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hey Loay, do you do bathroom pipe renovations?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:33"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hello Ali, I'm currently not able to do any jobs. Sorry for the inconvenience."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:41"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Sorry to hear that."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:20"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
    )
}
function OmarChatData() {
    const classes = useStyles();

    return(
        
        <List className={classes.messageArea}>
            <Typography className={classes.messagesName} variant="h6" primary =" Omar Kabbara">
            &nbsp;Omar Kabbara
            </Typography>
            <Divider />
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hello Omar, I would like to know your checkup fee please."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey Ali, I charge $20 per checkup. If you would like to know 
                                more I'd be happy to answer."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:49"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Great, I'll request an appointment with you soon."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:00"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="4">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Awaiting your request."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="10:11"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
    )
}
function NewOmarChatData() {
    const classes = useStyles();

    return(
        
        <List className={classes.messageArea}>
            <Typography className={classes.messagesName} variant="h6" primary =" Omar Kabbara">
            &nbsp;Omar Kabbara
            </Typography>
            <Divider />
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hello Omar, I would like to know your checkup fee please."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey Ali, I charge $20 per checkup. If you would like to know 
                                more I'd be happy to answer."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:49"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Great, I'll request an appointment with you soon."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:00"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="4">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Awaiting your request."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="10:11"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="5">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="I sent the request."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="12:05"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    
                </List>
    )
}
function FinalOmarChatData() {
    const classes = useStyles();

    return(
        
        <List className={classes.messageArea}>
            <Typography className={classes.messagesName} variant="h6" primary =" Omar Kabbara">
            &nbsp;Omar Kabbara
            </Typography>
            <Divider />
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hello Omar, I would like to know your checkup fee please."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey Ali, I charge $20 per checkup. If you would like to know 
                                more I'd be happy to answer."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:49"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Great, I'll request an appointment with you soon."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:00"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="4">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Awaiting your request."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="10:11"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="5">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="I sent the request."></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="12:05"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="6">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Just approved your request. See you then!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="12:05"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    
                </List>
    )
}
const Chat = () => {
  const classes = useStyles();
  const [user, setUser] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  function setLastUser() {
      setUser(4)
  }

  const handleEnterSendKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
        setUser(3)
        setNewMessage('');
    }
    setTimeout(setLastUser, 10000)
  };
  const handleSendKeypress = () => {
        setUser(3)
        setNewMessage('');
        setTimeout(setLastUser, 10000)
  };
  function chooseChat() {
       switch(user) {
        case 1:
            return(
                <OmarChatData></OmarChatData>
            )
        case 2:
          // code block
          return (
            <LoayChatData></LoayChatData>
        )
        case 3:
          return (
            <NewOmarChatData></NewOmarChatData>
          )
        
        case 4: 
            return (
                <FinalOmarChatData></FinalOmarChatData>
            )
          
        default:
            return(
                <OmarChatData></OmarChatData>
            )
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
                {/* <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search for " variant="outlined" fullWidth />
                </Grid> */}
                 <Divider />
                <List className={classes.chattersList}>
                    <ListItem button key="RemySharp"  onClick={() => {setUser(1)}}>
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="/assets/omarKabbara.jpg" />
                        </ListItemIcon>
                        <ListItemText>Omar Kabbara</ListItemText>
                    </ListItem>
                    <ListItem button key="CindyBaker"onClick={() => {setUser(2)}}>
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Loay Farhat">Loay Farhat</ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={9}>
                {chooseChat()}
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField 
                        id="messageField" 
                        value={newMessage}
                        onKeyPress={handleEnterSendKeypress}
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

export default Chat;
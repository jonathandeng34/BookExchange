import React, { useEffect, useState } from 'react';
import { Container, Grid, List, ListItem, ListItemAvatar, Avatar, Typography, Divider, TextField, Button } from '@mui/material';
import Endpoints from '../Endpoints';
import { Snackbar } from '@mui/material';

// const contacts = [
//   { id: 1, name: 'maanas', avatar: 'https://via.placeholder.com/50' },
//   { id: 2, name: 'sohan', avatar: 'https://via.placeholder.com/50' },
// ];

// const messages = [
//   { id: 1, senderId: 1, content: 'Hello!', timestamp: '9:00 AM' },
//   { id: 2, senderId: 2, content: 'Hi there!', timestamp: '9:05 AM' },
// ];

export function DirectMessaging() {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [snackbarText, setSnackbarText]  = useState('');
  const [open, setOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(contacts[0]?._id);

  useEffect(() => {
    Endpoints.doGetExchangesByUser().then(response => {
        if(!response.ok) {
            throw "Response Failure"
        }
        return response.json();
    }).then(json => {
        setContacts(json);
    }).catch(e => {
        console.log(e);
        setSnackbarText("Unable to fetch exchanges");
        setOpen(true);
    });
  }, [])

  const handleContactClick = (contactId) => {
    setSelectedContactId(contactId);
    Endpoints.doGetMessages(contactId).then(response => {
      if(!response.ok) {
          throw "Response Failure"
      }
      return response.json();
  }).then(json => {
      setMessages(json);
      console.log(json);
  }).catch(e => {
      console.log(e);
      setSnackbarText("Unable to fetch messages");
  });
  };
  
  function getOtherUser() {
    return contacts.find(contact => contact._id === selectedContactId)?.user
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <List>
            {contacts.map(contact => (
              <ListItem
                key={contact._id}
                button
                selected={contact._id === selectedContactId}
                onClick={() => handleContactClick(contact._id)}
              >
                <ListItemAvatar>
                  <Avatar alt={contact?.user.username} src={contact?.avatar} />
                </ListItemAvatar>
                <Typography variant="subtitle1">{contact?.user.username}</Typography>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">Conversation with {getOtherUser()?.username}</Typography>
          <Divider />
          <div style={{ height: '400px', overflowY: 'scroll', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            {messages.map(message => (
              <div key={message.id} style={{ textAlign: message.senderID._id === getOtherUser()?._id ? 'left' : 'right', marginBottom: '10px' }}>
                <Typography variant="body1" style={{ display: 'inline-block', backgroundColor: message.senderID._id === getOtherUser()?._id ? '#e6e6e6' : '#2979ff', padding: '8px', borderRadius: '8px', color: message.senderId === selectedContactId ? '#333' : '#fff' }}>{message.content}</Typography>
                <Typography variant="caption" style={{ display: 'block', textAlign: message.senderID._id === getOtherUser()?._id ? 'left' : 'right', marginTop: '5px', color: '#666' }}>{message.timestamp}</Typography>
              </div>
            ))}
          </div>
          <Divider style={{ margin: '20px 0' }} />
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
              <TextField fullWidth placeholder="Type your message..." variant="outlined" />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" fullWidth>Send</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
                    open={open}
                    autoHideDuration={60000}
                    onClose={() => setOpen(false)}
                    message={snackbarText}
                />
    </Container>
  );
}




/*
export function DirectMessaging(){
    return(
        <>
            <h1> This is the direct messaging page. </h1>
        </>
    )
}
*/
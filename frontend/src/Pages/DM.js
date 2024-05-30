//import React, { useEffect, useRef, useState } from 'react';
import React, { useState } from 'react';
import { Container, Grid, List, ListItem, ListItemAvatar, Avatar, Typography, Divider, TextField, Button } from '@mui/material';

const contacts = [
  { id: 1, name: 'maanas', avatar: 'https://via.placeholder.com/50' },
  { id: 2, name: 'sohan', avatar: 'https://via.placeholder.com/50' },
];

const messages = [
  { id: 1, senderId: 1, content: 'Hello!', timestamp: '9:00 AM' },
  { id: 2, senderId: 2, content: 'Hi there!', timestamp: '9:05 AM' },
];

export function DirectMessaging() {
  const [selectedContactId, setSelectedContactId] = useState(contacts[0].id);

  const handleContactClick = (contactId) => {
    setSelectedContactId(contactId);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <List>
            {contacts.map(contact => (
              <ListItem
                key={contact.id}
                button
                selected={contact.id === selectedContactId}
                onClick={() => handleContactClick(contact.id)}
              >
                <ListItemAvatar>
                  <Avatar alt={contact.name} src={contact.avatar} />
                </ListItemAvatar>
                <Typography variant="subtitle1">{contact.name}</Typography>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">Conversation with {contacts.find(contact => contact.id === selectedContactId).name}</Typography>
          <Divider />
          <div style={{ height: '400px', overflowY: 'scroll', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            {messages.map(message => (
              <div key={message.id} style={{ textAlign: message.senderId === selectedContactId ? 'left' : 'right', marginBottom: '10px' }}>
                <Typography variant="body1" style={{ display: 'inline-block', backgroundColor: message.senderId === selectedContactId ? '#e6e6e6' : '#2979ff', padding: '8px', borderRadius: '8px', color: message.senderId === selectedContactId ? '#333' : '#fff' }}>{message.content}</Typography>
                <Typography variant="caption" style={{ display: 'block', textAlign: message.senderId === selectedContactId ? 'left' : 'right', marginTop: '5px', color: '#666' }}>{message.timestamp}</Typography>
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
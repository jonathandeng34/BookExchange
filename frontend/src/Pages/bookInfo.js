import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Rating,
  TextField,
  Grid,
} from '@mui/material';

const styles = {
  paper: {
    padding: 20,
    borderRadius: 8,
    marginTop: 40,
    backgroundColor: '#FBFFFF',  // Background color from the provided CSS
  },
  title: {
    fontWeight: 'bold',
    color: '#476B70',  // Text color from the provided CSS
  },
  sectionTitle: {
    marginTop: 30,
    color: '#476B70',  // Text color from the provided CSS
  },
  status: {
    marginBottom: 20,
    color: '#476B70',  // Text color from the provided CSS
  },
  button: {
    marginTop: 30,
    backgroundColor: '#2F6066',  // Navbar button background color
    color: '#FBFFFF',  // Navbar button text color
  },
  textField: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#FBFFFF',  // Background color from the provided CSS
  },
};

export function BookInformation() {
  return (
    <Paper elevation={3} style={styles.paper}>
      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        Book Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" style={styles.title}>Title: [Book Title]</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" style={styles.title}>Author: [Author Name]</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" style={styles.title}>Genre: [Genre]</Typography>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        Book Status
      </Typography>
      <Typography style={styles.status}>Status: [Book Status]</Typography>

      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        Owner Rating
      </Typography>
      <Rating value={4.5} readOnly />

      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        Comments
      </Typography>
      <Typography style={styles.status}>[Comments]</Typography>

      <Button variant="contained" style={styles.button}>
        Request Book Exchange
      </Button>

      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        Rate the Book
      </Typography>
      <Rating name="rate-book" defaultValue={0} precision={0.5} />
      <TextField
        label="Additional Comments"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        style={styles.textField}
      />
      <Button variant="contained" style={styles.button}>
        Submit Rating
      </Button>
    </Paper>
  );
}

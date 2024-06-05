import React, {useState, useEffect, useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Endpoints from '../Endpoints';
import { snackbarError } from '../utils.js';
import { useQuery } from '../utils.js';

import {
  Paper,
  Typography,
  Button,
  Rating,
  TextField,
  Grid,
  Snackbar
} from '@mui/material';
import { BookImage } from '../Components/BookImage';

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
  orangeButton: {
    marginTop: 30,
    backgroundColor: 'rgb(255, 111, 97)',  // Navbar button background color
    color: '#FBFFFF',  // Navbar button text color
  },
  textField: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#FBFFFF',  // Background color from the provided CSS
  },
};

export function BookInformation(props) {

  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarText, setSnackbarText]  = useState("");
  const [commentRating, setCommentRating] = useState(4.5);
  const [refresh, setRefresh] = useState(0);
  const [myId, setMyId] = useState(null);

  const { bookId } = useParams();

  let commentRef = useRef(null);
  let query = useQuery();

  

  useEffect(() => {
    Endpoints.doGetBookInfo(bookId).then(async (response) => {
      const json = await response.json();
      if(!response.ok) {
        throw json;
      }
      return json;
    }).then(json => {
      setBook(json);
    }).catch(e => {
      console.log(e);
      setSnackbarText(e["reason"] || "Unable to Fetch Book");
      setOpen(true);
    });

    Endpoints.doGetBookComments(bookId).then(async (response) => {
      const json = await response.json();
      if(!response.ok) {
        throw json;
      }
      return json;
    }).then(json => {
      setComments(json);
    }).catch(e => {
      console.log(e);
      setSnackbarText(e["reason"] || "Unable to Fetch Comments");
      setOpen(true);
    });

  }, [refresh]);

  useEffect(() => {
    Endpoints.doGetSelf().then(async (response) => {
      const json = await response.json();
      if(!response.ok) {
          throw json;
      }
      return json;
    }).then(json => {
        setMyId(json["_id"]);
    }).catch(e => {
        //Do Nothing
    });
  }, []);

  const sendComment = () => {
   if(!commentRef.current.value) {
    return;
   }
    Endpoints.sendBookComment(bookId, commentRef.current.value, commentRating, props.setLoggedIn).then(async (response) => {
      if(!response.ok) {
        const json = await response.json();
        throw json;
      }
      setSnackbarText("Comment Posted");
      setOpen(true);
      setRefresh(refresh+1);
    }).catch(e => {
      console.log(e);
      setSnackbarText(e["reason"] || "Unable to Post Comment");
      setOpen(true);
    });
  }

  const requestExchange = () => {
    Endpoints.doStartExchange(bookId, props.setLoggedIn).then(async (response) => {
      const json = await response.json();
      if(!response.ok) {
        throw json;
      }
      return json;
    }).then(json => {
      navigate('/DirectMessage');
    }).catch(e => {
      console.log(e);
      setSnackbarText(e["reason"] || "Unable to Start Exchange");
      setOpen(true);
    });
  };

  const deleteBook = () => {
    Endpoints.doDeleteBook(bookId).then(async (response) => {
      const json = await response.json();
      if(!response.ok) {
          throw json;
      }
      return json;
    }).then(json => {
      navigate("/");
    }).catch(e => {
      console.log(e);
      setSnackbarText(e["reason"] || "Internal Error");
      setOpen(true);
    });
  };

  const acceptExchange = () => {
    if(!query.get("exchange")) {
      return;
    }
    Endpoints.doAcceptTwoExchange(query.get("exchange"), bookId).then(async (response) => {
      const json = await response.json();
      if(!response.ok) {
        throw json;
      }
      return json;
    }).then(json => {
      navigate('/DirectMessage');
    }).catch(e => {
      console.log(e);
      setSnackbarText(e["reason"] || "Unable to Start Exchange");
      setOpen(true);
    });
  }

  


  return (
    <>
    <Paper elevation={3} style={styles.paper}>
      <BookImage book={book}/>
      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        Book Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" style={styles.title}>Title: {book.title || "Loading..."}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" style={styles.title}>Author: {book.author || "Loading..."}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" style={styles.title}>Genre: {book.genre || "Loading..."}</Typography>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        Book Status
      </Typography>
      <Typography style={styles.status}>Status: {book.isBookOutForExchange ? "Out for Exchange" : "Available"}</Typography>

      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        User Rating
      </Typography>
      <Typography style={styles.status}>{(book.bookOwner && book.bookOwner.userRating != undefined) ? book.bookOwner.userRating : "Loading..."}</Typography>

      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        Comments
      </Typography>
      <div>
        {comments.length == 0 ? "No Comments" : comments.map(comment => {
          return (
          <div key={comment._id}>
            {comment.userId.username} rated {comment.starRating} and said: {comment.commentText}
          </div>);
        })}
      </div>

      { query.get("exchange") ? <Button variant="contained" style={styles.button} onClick={acceptExchange}>
        Use for Book Exchange
        </Button>
        :
        ((myId && book["bookOwner"] && book["bookOwner"]["_id"] && myId === book["bookOwner"]["_id"]) ? 
        <Button variant="contained" style={styles.orangeButton} onClick={deleteBook}>
          Delete Book
        </Button>
        :
        <Button variant="contained" style={styles.button} onClick={requestExchange}>
        Request Book Exchange
        </Button>)
      
    }

      <Typography variant="h5" gutterBottom style={styles.sectionTitle}>
        Rate the Book
      </Typography>
      <Rating name="rate-book" value={commentRating} precision={0.5} onChange={(event, newValue) => {
        setCommentRating(newValue);
      }} />
      <TextField
        label="Additional Comments"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        style={styles.textField}
        inputRef={commentRef}
      />
      <Button variant="contained" style={styles.button} onClick={sendComment}>
        Submit Rating
      </Button>
    </Paper>
    <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={() => setOpen(false)}
                    message={snackbarText}
                />
    </>
  );
}

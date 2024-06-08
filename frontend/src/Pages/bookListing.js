import React, { useState } from 'react';
import Endpoints from '../Endpoints';
import { Snackbar } from '@mui/material';

export function BookListing(props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("Fiction");

  const [open, setOpen] = useState(false);
  const [snackbarText, setSnackbarText]  = useState("");

  const genres = [
    'Fiction', 'Non-fiction', 'Mystery', 'Thriller', 'Science Fiction',
    'Fantasy', 'Biography', 'History', 'Romance', 'Horror'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // console.log({ title, author, file, selectedGenre });
    if(!title || !author || !selectedGenre) {
      setSnackbarText("Please Populate All Fields!");
      setOpen(true);
      return;
    }
    Endpoints.doUploadBook(title, author, selectedGenre, props.setLoggedIn).then(async (response) => {
        if(!response.ok) {
          const json = await response.json();
          throw json;
        }
        return response.json();
    }).then(async (json) => {
      console.log(json);
      if(file && json["_id"]) {
        try {
          await Endpoints.doUploadImage(json._id, file);
        }
        catch(e) {
          setSnackbarText("Upload Successful. Image Load Unsuccessful");
          return;
        }
      }
      setSnackbarText("Upload Successful.");
      setOpen(true);
    }).catch(e => {
      setSnackbarText(e["reason"] || "Internal Server Error");
      setOpen(true);
    });

  };

  const handleGenreChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    if(value.length > 0) setSelectedGenre(value[0]);
    else setSelectedGenre("Fiction");
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto'}}>
      <h1 style = {{textAlign : 'center'}}>Upload a New Book</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>
            Title: <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>
            Author: <br />
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <label htmlFor="upload-file" style={{ cursor: 'pointer', backgroundColor: '#f0f0f0', color: '#333', padding: '10px 20px', borderRadius: '5px', fontSize: '16px', display: 'inline-block' }}>
            {file ? file.name : "Click to upload book image"} <br />
            <input
              type="file"
              accept="image/*"
              formEncType='multipart/form-data'
              onChange={(e) => setFile(e.target.files[0])}
              required
              style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>
            Genre: <br />
            <select
              value={selectedGenre}
              onChange={handleGenreChange}
              style={{ height: '25px', overflowY: 'scroll', marginBottom: '10px' }}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
      <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={() => setOpen(false)}
                    message={snackbarText}
                />
    </div>
  );
}

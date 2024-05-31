import React, { useState } from 'react';

export function BookListing() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genres = [
    'Fiction', 'Non-fiction', 'Mystery', 'Thriller', 'Science Fiction',
    'Fantasy', 'Biography', 'History', 'Romance', 'Horror'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ title, author, file, selectedGenres });
  };

  const handleGenreChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedGenres(value);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>Upload a New Book</h1>
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
            Click to upload book image <br />
            <input
              type="file"
              accept="image/*"
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
              multiple
              value={selectedGenres}
              onChange={handleGenreChange}
              style={{ height: '100px', overflowY: 'scroll', marginBottom: '10px' }}
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
    </div>
  );
}

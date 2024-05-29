import React from 'react';
import '../catalog.css'; // Assuming the CSS file is named styles.css

export function Catalog() {
    return (
        <div className="catalog-page">

            <div className="book-icon"></div>
            <div className="book-icon"></div>
            <div className="book-icon"></div>


            <div className="book-text">Book 1:</div>
            <div className="book-text">Book 2:</div>
            <div className="book-text">Book 3:</div>


            <a href="#" className="book-info-link">Link to book information page</a>
            <a href="#" className="book-info-link">Link to book information page</a>
            <a href="#" className="book-info-link">Link to book information page</a>


            <div className="search-text search-text-position">Search by title, author, and genre</div>


            <div className="search-vector search-vector-position"></div>
        </div>
    );
}

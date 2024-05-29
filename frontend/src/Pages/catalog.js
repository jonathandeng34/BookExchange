import React from 'react';
import '../index.css'; // Assuming the CSS file is named styles.css

export function Catalog() {
    return (
        <div className="catalog-page">

            <div className="book-icon"></div>
            <div className="book-icon"></div>
            <div className="book-icon"></div>


            <div className="book-text" style={{ top: '400px', left: '50px' }}>Book 1:</div>
            <div className="book-text" style={{ top: '700px', left: '50px' }}>Book 2:</div>
            <div className="book-text" style={{ top: '1000px', left: '50px' }}>Book 3:</div>


            {/* probably going to have to make these be links at some point similar to navigation */}
            <a href="#" className="book-info-link">Link to book information page</a> 
            <a href="#" className="book-info-link">Link to book information page</a>
            <a href="#" className="book-info-link">Link to book information page</a>


            <div className="search-text search-text-position">Search by title, author, and genre</div>


            <div className="search-vector search-vector-position" style={{ top: '200px'}}>  </div>
        </div>
    );
}

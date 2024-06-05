import React, { useState } from 'react';

const DeleteButton = ({ onDelete }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };
  
    const handleDelete = () => {
      onDelete(); //parent should pass a prop here
    };
  
    return (
      <div>
        <button onClick={toggleVisibility}>Toggle Delete Button</button>
        {isVisible && <button className="delete-button" onClick={handleDelete}>Delete Book</button>}
      </div>
    );
  };
  
  export default DeleteButton;
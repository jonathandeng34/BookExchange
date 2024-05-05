import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//Things to Change on Deployment:
  //Change the "proxy" value in package.json to the URL of the server

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

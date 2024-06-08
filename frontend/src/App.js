import { React, useEffect, useState } from 'react'
//import { Button } from './Components/Button';
import './App.css'
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import { Layout } from './Layout';


import { Home } from './Pages/home'
import { Login } from './Pages/Login.js'
import { BookInformation } from './Pages/bookInfo.js'
import { Catalog } from './Pages/catalog.js'
import { CreateAccount } from './Pages/createAccount'
import { ResetPassword } from './Pages/resetPassword'
import { DirectMessaging } from './Pages/DM'
import { Verification } from './Pages/verification'
import { BookListing } from './Pages/bookListing'
import Endpoints from './Endpoints.js';
import { BooksByUser } from './Pages/userBooks.js';





function App() {


  //const [text, setText] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    Endpoints.verifyIdentity().then(response => {
      if(response.ok) {
        setLoggedIn(true);
      }
    }).catch(e => {
      console.log(e);
    });
  }, []);

  return (
  <>
    <Router>
      <Routes>
        <Route element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}> 
        <Route path="/" element = {loggedIn ? (<Home setLoggedIn={setLoggedIn}/>) : (<Login setLoggedIn={setLoggedIn}/>)}/>
          <Route path="/Home" element={<Home setLoggedIn={setLoggedIn}/>}/>
          <Route path="/Login" element={<Login setLoggedIn={setLoggedIn}/>}/>
          <Route path="/BookInformation/:bookId" element = {<BookInformation setLoggedIn={setLoggedIn}/>}/>
          <Route path="/Catalog" element = {<Catalog/>}/>
          <Route path="/CreateAccount" element = {<CreateAccount/>}/>
          <Route path="/ResetPassword" element = {<ResetPassword/>}/>
          <Route path="/DirectMessage" element = {<DirectMessaging setLoggedIn={setLoggedIn}/>}/>
          <Route path="/Verification" element = {<Verification/>}/>
          <Route path="/BookListing" element = {<BookListing setLoggedIn={setLoggedIn}/>}/>
          <Route path="/UserBooks/:userId" element = {<BooksByUser/>}/>


        </Route>
      </Routes>
    </Router>    
  </>
    
  );
}

export default App;
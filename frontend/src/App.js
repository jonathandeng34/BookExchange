import { React, useEffect, useState } from 'react'
import { Button } from './Components/Button';
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





function App() {


  const [text, setText] = useState('')

  useEffect(() => {
    fetch('/test').then(res => res.json())
    .then(json => {
      setText(JSON.stringify(json))
    })
  }, []);

  return (
  <>
    <Router>
      <Routes>
        <Route element={<Layout/>}> 
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/BookInformation" element = {<BookInformation/>}/>
          <Route path="/Catalog" element = {<Catalog/>}/>
          <Route path="/CreateAccount" element = {<CreateAccount/>}/>
          <Route path="/ResetPassword" element = {<ResetPassword/>}/>
          <Route path="/DirectMessage" element = {<DirectMessaging/>}/>
          <Route path="/Verification" element = {<Verification/>}/>
          <Route path="/BookListing" element = {<BookListing/>}/>


        </Route>
      </Routes>
    </Router>    
  </>
    
  );
}

export default App;

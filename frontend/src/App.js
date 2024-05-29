import { React, useEffect, useState } from 'react'
import { Button } from './Components/Button';
import './App.css'
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import { Layout } from './Layout';

import { Home } from './Pages/home'
import { Login } from './Pages/Login.js'




function App() {

  /*
  function notify(msg)
  {
    alert(msg)
  }
  */

  //const [text, setText] = useState('')

  /*useEffect(() => {
    fetch('/test').then(res => res.json())
    .then(json => {
      setText(JSON.stringify(json))
    })
  }, []);*/

  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}> 
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
        </Route>
      </Routes>
    </Router>

    /*
    <div className="App">
      <p>{text}</p>
      <Button func={notify} msg={"awesome"}/>
    </div>
    */
  );
}

export default App;

import { React, useEffect, useState } from 'react'
import { Button } from './Button';

function App() {

  function notify(msg)
  {
    alert(msg)
  }

  const [text, setText] = useState('')

  useEffect(() => {
    fetch('/test').then(res => res.json())
    .then(json => {
      setText(JSON.stringify(json))
    })
  }, []);

  return (
    <div className="App">
      <p>{text}</p>
      <Button func={notify} msg={"awesome"}/>
    </div>
  );
}

export default App;

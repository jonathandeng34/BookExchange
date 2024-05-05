import { React, useEffect, useState } from 'react'

function App() {

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
    </div>
  );
}

export default App;

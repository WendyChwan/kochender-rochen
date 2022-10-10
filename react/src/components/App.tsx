import React, { useEffect, useState } from 'react';
import './App.css';

interface Recipe {
  fileName: string;
  content: string;
}

const App: React.FC = () => {
  const [recepies, setRecepies] = useState<Recipe[] | undefined>();

  useEffect(() => {
    fetch('/recepies.json')
      .then(r => r.json().then(json => setRecepies(json)));
  }, [])

  return (
    <div className="App">
      { recepies !== undefined && recepies.map(r => (
        <div>{r.fileName}</div>
      )) }
    </div>
  );
}

export default App;

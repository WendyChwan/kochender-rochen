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
        <div>
          <a href={'/rezept/' + r.fileName.substring(0, r.fileName.length - 3)}>{r.fileName}</a>
        </div>
      )) }
    </div>
  );
}

export default App;

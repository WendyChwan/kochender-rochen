import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [recepies, setRecepies] = useState<any>();

  useEffect(() => {
    fetch('/recepies.json')
      .then(r => r.json().then(json => setRecepies(json)));
  }, [])

  return (
    <div className="App">
      { recepies !== undefined && recepies[0].fileName }
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import { AppHeader } from './cmps/AppHeader/AppHeader';
import { Dashboard } from './views/Dashboard';
function App() {
  const [elementInView, setElementInView] = useState(null);
  const [clickedTitle, setClickedTitle] = useState(null);

  return (
    <div className="App">
      <AppHeader elementInView={elementInView} setClickedTitle={setClickedTitle}/>
      <Dashboard setElementInView={setElementInView} clickedTitle={clickedTitle}/>
    </div>
  );
}

export default App;

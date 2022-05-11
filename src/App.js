import './App.css';
import { AppHeader } from './cmps/AppHeader';
import { Dashboard } from './views/Dashboard';
function App() {
  return (
    <div className="App">
      <AppHeader/>
      <Dashboard/>
    </div>
  );
}

export default App;

import { useState, useContext } from "react";
import "./App.css";
import { AppHeader } from "./cmps/AppHeader/AppHeader";
import { Dashboard } from "./views/Dashboard";
import { ThemeContext } from "./store/context/ThemeContext";

function App() {
  const [elementInView, setElementInView] = useState(null);
  const [clickedTitle, setClickedTitle] = useState(null);
  const theme = useContext(ThemeContext);
  return (
    <div className={`${theme.state.darkMode ? "App dark" : "App"}`}>
      <AppHeader
        elementInView={elementInView}
        setClickedTitle={setClickedTitle}
      />
      <Dashboard
        setElementInView={setElementInView}
        clickedTitle={clickedTitle}
      />
    </div>
  );
}

export default App;

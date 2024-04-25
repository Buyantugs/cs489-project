import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home";
import context from "./data/context";

function App() {
  const [state, setState]=useState({token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWl1LmVkdSIsImlhdCI6MTcxMzQ4MzIwNH0.KNS_wSvV-rBlao-Xijp07Tg1_dJw9yY9mjFuk25bvhQ'});
  return (
    <context.Provider value={{state, setState}}>
      <Router>
        <Home />
      </Router>
    </context.Provider>    
  );
}

export default App;

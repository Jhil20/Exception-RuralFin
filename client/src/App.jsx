import React from 'react'
import {
  Outlet,
  useLocation,
} from "react-router-dom";
import Header from './components/Header';

function App() {
  const location=useLocation();
  return (
    <>
    {location.pathname!="/userDashboard" && location.pathname!="/agentDashboard" && <Header/>}
      <Outlet/>
    </>
  )
}

export default App

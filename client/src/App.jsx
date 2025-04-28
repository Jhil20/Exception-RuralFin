import React from 'react'
import {
  Outlet,
  useLocation,
} from "react-router-dom";
import Body from './routes/Body';

function App() {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App

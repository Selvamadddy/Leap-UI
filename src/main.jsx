import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Activity from './components/Planner/Home';
import Home from "./components/Home/Home";
import Register from "./components/Login/Register"
import Login from "./components/Login/Login"
import ForgotPassword from "./components/Login/ForgotPassword"
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path ="/Activity" element={<Activity/>} />
        <Route path ="/Login" element={<Login/>} />
        <Route path ="/Register" element={<Register/>} />
        <Route path ="/ForgotPassword" element={<ForgotPassword/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Game from "./pages/Game"
import reportWebVitals from "./reportWebVitals"
import Admin from "./pages/Admin"
import {BrowserRouter, Route, Routes} from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Game/>}/>
      <Route path="admin" element={<Admin/>}/>
    </Routes>
  </BrowserRouter>
)
reportWebVitals()

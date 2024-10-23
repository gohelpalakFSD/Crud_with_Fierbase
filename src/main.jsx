import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup.jsx'
import Signin from './Signin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<App />} />
                <Route path='/signup' element={<Signup/>} />
                
                <Route path='/' element={<Signin/>} />
            </Routes>
        </BrowserRouter>
  </StrictMode>,
)

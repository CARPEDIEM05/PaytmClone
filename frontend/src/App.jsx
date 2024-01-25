import { useState } from 'react'
import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import './App.css'
import { Signup } from './Components/SignUp'
import { SignIn } from './Components/SignIn'
import { Dashboard } from './Components/Dashboard'
import {RecoilRoot} from "recoil"
import { SendMoney } from './Components/SendMoney'


function App() {

  return (
    <div>
      <RecoilRoot>

      <BrowserRouter>
        <Routes>
            <Route path='/signup' element= {<Signup/>}></Route>
            <Route path='/signin' element={<SignIn/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/sendmoney' element={<SendMoney />}></Route>
        </Routes>
      </BrowserRouter>  
      </RecoilRoot>
    </div>
  )
}

export default App

import React from "react"
import UserLogin from "./components/user/login/UserLogin"

import { BrowserRouter,Routes,Route } from "react-router-dom"
import ProtectEdit from "./components/protect/ProtectEdit"
import UserSignUp from "./components/user/signup/UserSignup"
import ProtectHome from "./components/protect/ProtectHome"
import Home from "./components/user/home/Home"
import EditProfile from "./components/user/edit/Edit"
import ProtectAdmin from "./components/protect/ProtectAdmin"
import AdminLogin from "./components/admin/login/AdminLogin"
import AdminAuth from "./components/protect/AdminAuth"
import AdminHome from "./components/admin/home/AdminHome"
import Dashboard from "./components/admin/dashboard/Dashboard"
import AdminEdit from "./components/admin/edit/AdminEdit"
import AddUser from "./components/admin/adduser/AddUser"

console.log(AddUser)

function App() {
  

  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ProtectEdit><UserSignUp/></ProtectEdit>} />
      <Route path='/login' element={<ProtectEdit><UserLogin/></ProtectEdit>} />
      <Route path='/home' element={<ProtectHome><Home/></ProtectHome>} />
      <Route path='/update' element={<ProtectHome><EditProfile/></ProtectHome>} />
      <Route path='/adminlogin' element={<ProtectAdmin><AdminLogin/></ProtectAdmin>} />
      <Route path='/adminhome' element={<AdminAuth><AdminHome/></AdminAuth>} />
      <Route path='/dashboard' element={<AdminAuth><Dashboard/></AdminAuth>} />
      <Route path='/adminedit/:id' element={<AdminAuth><AdminEdit/></AdminAuth>} />
      <Route path='/adminadd' element={<AdminAuth><AddUser/></AdminAuth>} />
    </Routes>
    
    </BrowserRouter>
      
    </>
  )
}

export default App

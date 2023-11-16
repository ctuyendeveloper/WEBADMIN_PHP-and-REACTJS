import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, 
  Routes, Navigate, Outlet } from 'react-router-dom'
import React, { useState } from 'react';

import Login from './users/Login'
import List from './news/List'
import Add from './news/Add'
import Edit from './news/Edit'

function App() {

  // doc thong tin user tu localStorage
  const getUserFromLocalStorage = () => {
    const userString = localStorage.getItem('user');
    if (userString)
    {
      return JSON.parse(userString);
    }
    return null;
  }
  const saveUserToLocalStorage = (userInfo) => {
    if (!userInfo)
    {
      localStorage.removeItem('user');
      setUser(null);
      return;
    }
    localStorage.setItem('user', JSON.stringify(userInfo));
    setUser(userInfo);
  }

  const [user, setUser] = useState(getUserFromLocalStorage);

  // Những componet phải đăng nhập mới truy cập được
  const ProtectedRoute = () => {
    if(user)
    {
      return <Outlet/>
    }
    return <Navigate to="/login"/>
  }
  
  // Những componet không đăng nhập truy cập được
  
  const PubliceRoute = () => {
    if(user)
    {
    return <Navigate to="/"/>
    }
    return <Outlet/>

  }

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route element={<PubliceRoute/>}>
            <Route path="/login" element={<Login saveUser={saveUserToLocalStorage}/>} />
          </Route>
          
          <Route element={<ProtectedRoute/>}>
            <Route path="/" element={<List/>} />
            <Route path="/add" element={<Add/>} />
            <Route path="/edit/:id" element={<Edit/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

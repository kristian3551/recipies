import React from 'react';
import './App.css';
import GuestHomePage from './pages/homePages/GuestHomePage';
import LoggedHomePage from './pages/homePages/LoggedHomePage';
import RegisterPage from './pages/authPages/RegisterPage';
import LoginPage from './pages/authPages/LoginPage';
import CreatePage from './pages/createPage';
import DetailsPage from './pages/detailsPage';
import EditPage from './pages/editPage';
import AuthContext from './AuthContext';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const getCookieValue = (name) => {
    let arr = document.cookie.split('; ');
    arr = arr.map(e => e.split('='));
    return arr.find(e => e[0] == name)[1];
  }

  useEffect(async () => {
    const token = getCookieValue('x-auth-token');
    if(!token) return;
    const promise = await fetch('http://localhost:8000/api/user/verify', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token
      })
    });
    const user = await promise.json();
    // console.log(user);
    if(user) {
      setUser(user);
      setLoggedIn(true);
    }
  }, []);

  const login = (userObject, token) => {
    setLoggedIn(true);
    setUser(userObject);
    document.cookie = `x-auth-token=${token}`;
  }

  const logout = () => {
    setLoggedIn(false);
    setUser({});
    document.cookie = 'x-auth-token=';
  }

  return (
    <AuthContext.Provider value={{
      loggedIn, user, login, logout
    }}>
      <BrowserRouter>
          <Route path="/" exact component={loggedIn ? LoggedHomePage : GuestHomePage}/>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/register" exact component={RegisterPage}/>
          <Route path="/create" exact component={CreatePage}/>
          <Route path="/details/:id" exact component={DetailsPage}/>
          <Route path="/edit/:id" exact component={EditPage}/>
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;

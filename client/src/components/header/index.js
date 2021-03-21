import React, { useContext } from 'react';
import AuthContext from '../../AuthContext';
import { Link, useHistory } from 'react-router-dom';
import styles from './index.module.css';

const Header = () => {
    const { loggedIn, user, logout } = useContext(AuthContext);
    const history = useHistory();
    const logoutHandler = () => {
        logout();
        history.push('/');
    }

    return (<header className="masthead mb-auto">    
    <div className="inner">
        <h3 className="masthead-brand">CookUni</h3>
        <nav className="nav nav-masthead justify-content-center">
        {!loggedIn && (<Link className="nav-link" to="/">Home</Link>)}
            { loggedIn ? (<>
            <Link className="nav-link" to="/">Welcome, {user.firstName} {user.lastName}!</Link>
            <Link className="nav-link" to="/create">Share recipe</Link>
            <Link className="nav-link" onClick={logoutHandler}>Logout</Link></>) : (<>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
            </>)}
            
            
        </nav>
    </div>
</header>)
}

export default Header;
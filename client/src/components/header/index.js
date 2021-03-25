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

    return (<header className={`${styles.masthead} mb-auto`}>    
    <div className="inner">
        <h3 className={`${styles['masthead-brand']}`}>Recipes</h3>
        <nav className={`nav ${styles['nav-masthead']} justify-content-center`}>
        {!loggedIn && (<Link className={styles['nav-link']} to="/">Home</Link>)}
            { loggedIn ? (<>
            <Link className={styles['nav-link']} to="/">Welcome, {user.firstName} {user.lastName}!</Link>
            <Link className={styles['nav-link']} to="/create">Share recipe</Link>
            <Link className={styles['nav-link']} onClick={logoutHandler}>Logout</Link></>) : (<>
            <Link className={styles['nav-link']} to="/login">Login</Link>
            <Link className={styles['nav-link']} to="/register">Register</Link>
            </>)}
            
            
        </nav>
    </div>
</header>)
}

export default Header;
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
        <h3 className={`${styles['masthead-brand']}`} style={{marginRight: '20px'}}>Recipes</h3>
        <nav className={`nav ${styles['nav-masthead']} justify-content-center`}>
        {!loggedIn && (<Link className={styles['nav-link']} to="/" style={{marginRight: '20px'}}>Home</Link>)}
            { loggedIn ? (<>
            <Link className={styles['nav-link']} style={{marginRight: '20px'}} to="/" >Welcome, {user.firstName} {user.lastName}!</Link>
            <Link className={styles['nav-link']} style={{marginRight: '20px'}} to="/create">Share recipe</Link>
            <Link className={styles['nav-link']} to="/" onClick={logoutHandler}>Logout</Link></>) : (<>
            <Link className={styles['nav-link']} style={{marginRight: '20px'}} to="/login">Login</Link>
            <Link className={styles['nav-link']} to="/register">Register</Link>
            </>)}
            
            
        </nav>
    </div>
</header>)
}

export default Header;
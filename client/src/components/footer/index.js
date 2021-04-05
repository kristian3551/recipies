import React from 'react';
import styles from './index.module.css';

const Footer = () => {
    return (<footer className={`${styles.mastfoot} mt-5 text-center text-light`}>
    <div className="inner">
        <p>Made with &hearts; by <a className={styles.footlink} href="/">Recipes</a>.</p>
    </div>
</footer>)
}

export default Footer;
import React from 'react';
import styles from './index.module.css';

const guestHomeMain = () => {
    return (<main role="main" className={`inner ${styles.cover} mt-5`}>
    <h1 className="cover-heading">Platform for sharing recipes!!!</h1>
    <p className="lead">They say that food passes through the stomach, we say that food passes through CookUni...
    </p>
</main>)
}

export default guestHomeMain;
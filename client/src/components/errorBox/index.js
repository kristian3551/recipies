import React from 'react';
import styles from './index.module.css';

const ErrorBox = ({ error, errorInfo}) => {
    return (
        <div id="notifications">
        {/* <div id="successBox" class="alert alert-success" role="alert">{Success Message...}</div>
        <div id="loadingBox" class="alert alert-info" role="alert">Loading...</div> */}
        <div id={styles.errorBox} class="alert alert-danger" role="alert">{errorInfo}</div>
    </div>);
}

export default ErrorBox;
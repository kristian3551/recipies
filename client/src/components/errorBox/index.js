import React from 'react';

const ErrorBox = ({ error, errorInfo}) => {
    return (
        <div id="notifications">
        {/* <div id="successBox" class="alert alert-success" role="alert">{Success Message...}</div>
        <div id="loadingBox" class="alert alert-info" role="alert">Loading...</div> */}
        <div id="errorBox" class="alert alert-danger" role="alert">{this.state.errorInfo}</div>
    </div>);
}

export default ErrorBox;
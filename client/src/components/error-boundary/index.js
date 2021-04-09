import React from 'react';
import ErrorBox from '../errorBox';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorInfo: null
        }
    }
    getDerivedStateFromError(error) {
        return { hasError: true, errorInfo: error.errorInfo };
    }
    componentDidCatch(error, errorInfo) {
        console.log(error);
    }

    render() {
        if(this.state.hasError) {
            return ( <><ErrorBox {...this.state}></ErrorBox> 
                {this.props.children}
                </>);
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
import React from 'react';
import ErrorBox from '../errorBox';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error: error, errorInfo: errorInfo});
    }

    render() {
        if(this.state.errorInfo) {
            return ( <><ErrorBox {...this.state}></ErrorBox> 
                {this.props.children}
                </>);
        }
    }
}
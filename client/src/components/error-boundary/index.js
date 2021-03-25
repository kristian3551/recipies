import React from 'react';
import ErrorBox from '../errorBox';

// class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             hasError: false,
//             errorInfo: null
//         }
//     }
//     getDerivedStateFromError(error) {
//         return { hasError: true, errorInfo: error.errorInfo };
//     }
//     componentDidCatch(error, errorInfo) {
//         console.log(error);
//     }

//     render() {
//         if(this.state.hasError) {
//             return ( <><ErrorBox {...this.state}></ErrorBox> 
//                 {this.props.children}
//                 </>);
//         }
//         return this.props.children;
//     }
// }

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, errorInfo: '' };
    }
  
    // static getDerivedStateFromError(error) {
    //   return { hasError: true, errorInfo: error.errorInfo };
    // }
  
    componentDidCatch(error, errorInfo) {
      this.setState({ hasError: true, errorInfo });
    }
  
    render() {
      if (this.state.hasError) {
        return (<><ErrorBox errorInfo={this.state.errorInfo}></ErrorBox> 
            {this.props.children}
            </>);
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary;
import React, { useState, useContext } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ErrorBoundary from '../components/error-boundary';
import AuthContext from '../AuthContext';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const history = useHistory();

    const signInHandler = async (e) => {
        e.preventDefault();
        if(username.length < 3) {
            throw new Error('Username should be more than 3 symbols.');
        }
        
        const promise = await fetch('http://localhost:8000/api/user/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        });
        const user = await promise.json();
        const token = promise.headers.get('Authorization');
        login(user, token);
        history.push('/');
    }

    return (
        <>
            <Header />
            <ErrorBoundary>
                
            <form id="login-form" className="text-center p-5 form-layout" action="#" method="POST">
                <p className="h4 mb-4">Sign in</p>
                <input type="text" id="defaultRegisterFormUsername" name="username" className="form-control mb-4"
                    placeholder="Username" onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                <input type="password" id="defaultRegisterFormPassword" name="password" className="form-control"
                    placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                <hr />
                <button className="btn btn-danger w-25 m-auto my-4 btn-block" type="submit" 
                onClick={signInHandler}>Sign in</button>

            </form>
            <Footer />
            </ErrorBoundary>
            
        </>
    );
}



export default LoginPage;
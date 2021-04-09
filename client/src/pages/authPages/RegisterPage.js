import React, { useContext, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ErrorBox from '../../components/errorBox';
import AuthContext from '../../AuthContext';
import styles from './index.module.css';

const RegisterPage = ({ history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState({ show: false, errorInfo: '' });
    const { login } = useContext(AuthContext);

    const formsHandler = (e, type) => {
        if (type == 'firstName') setFirstName(e.target.value);
        else if (type == 'lastName') setLastName(e.target.value);
        else if (type == 'username') setUsername(e.target.value);
        else if (type == 'password') setPassword(e.target.value);
        else if (type == 'repeatPassword') setRepeatPassword(e.target.value);
    }

    const toggleError = (errorInfo) => {
        setError({ show: true, errorInfo });
        setTimeout(() => {
            setError({ show: false, errorInfo: '' })
        }, 5000);
    }

    const signUpHandler = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName) 
            return toggleError('First name and last name should be non-empty strings!');    
        else if (username.length < 8) 
        return toggleError('Username should be more than 8 symbols.');
        else if (password.length < 8) return toggleError('Password should be more than 8 symbols.');
        const promise = await fetch('http://localhost:8000/api/user/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password, username, firstName, lastName
            })
        });
        if(!promise.ok) return toggleError('Something went wrong!');
        const createdUser = await promise.json();
        const token = promise.headers.get('Authorization')
        login(createdUser, token);
        history.push('/');
    }
    return (<>
        <Header />
        <ErrorBox show={error.show} errorInfo={error.errorInfo}/>
        <form id="register-form" className={`text-center p-5 ${styles['form-layout']}`}>
            <p className="h4 mb-4">Sign up</p>

            <div className="form-row mb-4">
                <div className="col">
                    <input type="text" className="form-control" name="firstName"
                        placeholder="First name" onChange={(e) => formsHandler(e, 'firstName')} />
                </div>
                <div className="col">
                    <input type="text" class="form-control" name="lastName"
                        placeholder="Last name" onChange={(e) => formsHandler(e, 'lastName')} />
                </div>
            </div>

            <input type="text" className="form-control mb-4" name="username"
                placeholder="Username" onChange={(e) => formsHandler(e, 'username')} />
            <input type="password" className="form-control" name="password"
                placeholder="Password" onChange={(e) => formsHandler(e, 'password')} />

            <hr />
            <input type="password" className="form-control" name="repeatPassword"
                placeholder="Repeat Password" onChange={(e) => formsHandler(e, 'repeatPassword')} />
            <button className="btn btn-danger my-4 btn-block w-25 m-auto" type="submit"
                onClick={signUpHandler}>Sign up</button>

        </form>
        <Footer />
    </>)
}

export default RegisterPage;
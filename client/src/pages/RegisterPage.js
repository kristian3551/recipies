import React, { useContext, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import LoginPage from './LoginPage';
import AuthContext from '../AuthContext';

const RegisterPage = ({ history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { login } = useContext(AuthContext);

    const formsHandler = (e, type) => {
        if(type == 'firstName') setFirstName(e.target.value);
        else if(type == 'lastName') setLastName(e.target.value);
        else if(type == 'username') setUsername(e.target.value);
        else if(type == 'password') setPassword(e.target.value);
        else if(type == 'repeatPassword') setRepeatPassword(e.target.value);
    }

    const signUpHandler = async (e) => {
        e.preventDefault();
        console.log(firstName, lastName);
        const promise = await fetch('http://localhost:8000/api/user/register', {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password, username, firstName, lastName
            })
        });
        const createdUser = await promise.json();
        const token = promise.headers.get('Authorization')
        login(createdUser, token);
        history.push('/');
    }
    return (<>
        <Header />
        <form id="register-form" className="text-center p-5 form-layout">
            <p className="h4 mb-4">Sign up</p>

            <div className="form-row mb-4">
                <div className="col">
                    <input type="text" className="form-control" name="firstName"
                        placeholder="First name" onChange={(e) => formsHandler(e, 'firstName')}/>
                </div>
                <div className="col">
                    <input type="text" lass="form-control" name="lastName"
                        placeholder="Last name" onChange={(e) => formsHandler(e, 'lastName')}/>
                </div>
            </div>

            <input type="text"  className="form-control mb-4" name="username"
                placeholder="Username" onChange={(e) => formsHandler(e, 'username')}/>
            <input type="password" className="form-control" name="password"
                placeholder="Password" onChange={(e) => formsHandler(e, 'password')}/>
            <hr />
            <input type="password" className="form-control" name="repeatPassword"
                placeholder="Repeat Password" onChange={(e) => formsHandler(e, 'repeatPassword')}/>
            <button className="btn btn-danger my-4 btn-block w-25 m-auto" type="submit"
            onClick={signUpHandler}>Sign up</button>

        </form>
        <Footer />
    </>)
}

export default RegisterPage;
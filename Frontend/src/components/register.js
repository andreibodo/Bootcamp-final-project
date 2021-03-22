import React, { useContext } from 'react'
import { GlobalContext } from '../App';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './register.css'

export default function Register() {
    const {setRegister}=useContext(GlobalContext);

    let data = {
        username: "",
        email:"",
        password: "",
        passwordConfirm:""
    }
    const handleSubmit = (e) => {
        e.preventDefault();
       
        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch("http://localhost:8888/register", options)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Ha ido algo mal...");
                }
                return response.json();
            })
            .catch(error => alert(error));

        setRegister(false);
    }

    return (
        <div className="register">
             <form onSubmit={handleSubmit} noValidate autoComplete="off" className="registerForm">
                <div>
                    <TextField className="formItem" onChange={(e) => data.username = e.target.value} required color="secondary" id="filled-basic" label="Username" variant="filled" />
                </div>
                <div>
                    <TextField className="formItem" onChange={(e) => data.email = e.target.value} required color="secondary" id="filled-basic" label="E-mail" variant="filled" />
                </div>
                <div>
                    <TextField className="formItem" onChange={(e) => data.password = e.target.value} required color="secondary" type="password" id="filled-basic" label="Password" variant="filled" />
                </div>
                <div>
                    <TextField className="formItem" onChange={(e) => data.passwordConfirm = e.target.value} required color="secondary" type="password" id="filled-basic" label="Confirm password" variant="filled" />
                </div>
                <Button className="formItem" type="submit" variant="contained" color="secondary">Register</Button>
            </form>
        </div>
    )
}

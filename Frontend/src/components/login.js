import React, { useContext } from 'react'
import { GlobalContext } from '../App'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './login.css'

export default function Login() {
    const { setRegister } = useContext(GlobalContext);
    let data = {
        username: "",
        password: ""
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    }
    return (
        <div className="login">
            <form onSubmit={handleSubmit} noValidate autoComplete="off" className="loginForm">
                <div>
                    <TextField className="formItem" onChange={(e) => data.username = e.target.value} required color="secondary" id="filled-basic" label="Username" variant="filled" />
                </div>
                <div>
                    <TextField className="formItem" onChange={(e) => data.password = e.target.value} required color="secondary" type="password" id="filled-basic" label="Password" variant="filled" />
                </div>
                <Button className="formItem" type="submit" variant="contained" color="secondary">Log in</Button>
            </form>
            <div>
                <p>
                    <small>Don't have an account yet? Click <span onClick={() => setRegister(true)}>HERE</span> to register.</small>
                </p>
            </div>
        </div>
    )
}

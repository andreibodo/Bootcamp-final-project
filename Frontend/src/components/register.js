import React, { useContext } from 'react'
import { GlobalContext } from '../App';
import { useForm } from 'react-hook-form'

export default function Register() {
    const {setRegister}=useContext(GlobalContext);
    const { register, handleSubmit } = useForm();
    return (
        <div>
             <button onClick={()=>setRegister(false)}>login</button>
        </div>
    )
}

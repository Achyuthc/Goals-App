import  {FaSignInAlt} from 'react-icons/fa'
import{useState,useEffect} from 'react'
import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {login,reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {


    const [formData,setFormData]=useState({
    email:'',
    password:'',
    })
    const {email,password}=formData

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const {user,isLoading,isSuccess,message,isError}=useSelector((state)=>state.auth)

    useEffect(()=>{

        if(isError){
        toast.error(message)
        }

        if(isSuccess||user) {
        navigate('/')
        }
        
        dispatch(reset())

    },[user,isSuccess,isError,message,navigate,dispatch])

    const  onChange=(e)=>{
        setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value,
        }))
        }

    const onSubmit=(e)=>{
        e.preventDefault();

        const userData={
            email,
            password,
        }
        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner/>
    }
    
    return (
        <>
        <section className="heading">
            <h1><FaSignInAlt/>Login</h1>
            <p>Login To Start Setting Your Goals</p>
        </section>

        <section className="form">

            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <input type="email" id="email" name="email"  className="form-control" value={email} onChange={onChange} placeholder="email" />
                </div>

                <div className="form-group">
                    <input type="password" id="password" name="password"  className="form-control" value={password} onChange={onChange} placeholder="enter password" />
                </div>

                <div className="form-group">
                    <button type="submit" className='btn btn-block'>
                        Submit
                    </button>
                </div>
            </form>
        </section>

        </>
    )
    }

export default Login
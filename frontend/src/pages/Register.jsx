import  {FaUser} from 'react-icons/fa'
import{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {register,reset} from '../features/auth/authSlice'
import React from 'react'
import Spinner from '../components/Spinner'

function Register() {

  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })
  const {name,email,password,password2}=formData

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

  },[user,isError,isSuccess,message,navigate,dispatch])

  const  onChange=(e)=>{
      setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value,
      
      }))
    }

  const onSubmit=(e)=>{
    e.preventDefault();
    
    if(password!==password2){
      toast.error('Passwords are not matched')
    }
    else{
      const userData={
        name,
        email,
        password
      }

      dispatch(register(userData))
    }

  }

  if(isLoading) {
    return <Spinner/>
  }
  
  return (
    <>
    <section className="heading">
      <h1>
        <FaUser/> Register
      </h1>
      <p>
        Please Create An Account
      </p>
     
      
    </section>
    <section className="form">

      <form onSubmit={onSubmit}>
        <div className="form-group">
  
            <input type="text" id="name" name="name"  className="form-control" value={name} onChange={onChange} placeholder="name" />
        
        </div>

        <div className="form-group">
          
            <input type="email" id="email" name="email"  className="form-control" value={email} onChange={onChange} placeholder="email" />
          
        </div>

        <div className="form-group">
        
            <input type="password" id="password" name="password"  className="form-control" value={password} onChange={onChange} placeholder="enter password" />
        
        </div>

        <div className="form-group">
        
            <input type="password" id="password" name="password2"  className="form-control" value={password2} onChange={onChange} placeholder="confirm password" />
        
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

export default Register
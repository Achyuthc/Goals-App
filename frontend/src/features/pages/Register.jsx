import  {FaUser} from 'react-icons/fa'
import{useState,useEffect} from 'react'

function Register() {

  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })
  const {name,email,password,password2}=formData

  const  onChange=(e)=>{
      setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value,
      
      }))
    }

  const onSubmit=(e)=>{
    e.preventDefault();
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
          
            <input type="text" id="email" name="email"  className="form-control" value={email} onChange={onChange} placeholder="email" />
          
        </div>

        <div className="form-group">
        
            <input type="password" id="password" name="password"  className="form-control" value={password} onChange={onChange} placeholder="enter password" />
        
        </div>

        <div className="form-group">
        
            <input type="password" id="password" name="password2"  className="form-control" value={password2} onChange={onChange} placeholder="confirm password" />
        
        </div>

        <div className="form-group">
        
            <button type="submit" className='btn btn-block' on>
              Submit
            </button>
        
        </div>
      </form>
    </section>

    </>
  )
}

export default Register
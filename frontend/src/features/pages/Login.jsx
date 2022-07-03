import  {FaSignInAlt} from 'react-icons/fa'
import{useState,useEffect} from 'react'

function Login() {


    const [formData,setFormData]=useState({
    email:'',
    password:'',
    })
    const {email,password}=formData

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
            <h1><FaSignInAlt/>Login</h1>
            <p>Login To Start Setting Your Goals</p>
        </section>

        <section className="form">

            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <input type="text" id="email" name="email"  className="form-control" value={email} onChange={onChange} placeholder="email" />
                </div>

                <div className="form-group">
                    <input type="password" id="password" name="password"  className="form-control" value={password} onChange={onChange} placeholder="enter password" />
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

export default Login
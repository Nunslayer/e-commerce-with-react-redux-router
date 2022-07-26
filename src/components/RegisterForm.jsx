import {useForm} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
const RegisterForm = () => {
    const {handleSubmit, reset, register} = useForm()
    const [userRegister, setUserRegister] = useState(false)
    const navigate = useNavigate()
    const submit =(data)=>{
        const registerUser= {
          email: data.emailRegister,
          first_name: data.first_name,
          last_name: data.last_name,
          password: data.passwordRegister
        }
        axios.post('https://ecommerce-exercise-backend.herokuapp.com/users/', registerUser)
          .then(res=>{
            console.log(res)
            if(res.status===201){
              setUserRegister(true)
              
            }
          })
          .catch(error=> console.error(error))
      }
    return(
        <form className='register' onSubmit={handleSubmit(submit)}>
            <input type="email" {...register('emailRegister')}/>
            <input type="text" {...register('first_name')}/>
            <input type="text" {...register('last_name')}/>
            <input type="password" {...register('passwordRegister')}/>
            <button>register</button>
            <p>{userRegister?<button onClick={()=>navigate('/login')}>go login</button>:'Sin registrar'}</p>
        </form>
    )
}

export default RegisterForm
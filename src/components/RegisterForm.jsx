import '../assets/styles/RegisterForm.css'
import {useForm} from 'react-hook-form'
import { useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClose, faCheck, faCircleExclamation} from '@fortawesome/free-solid-svg-icons'
import {setLoading} from '../store/slices/loading.slice'
const RegisterForm = () => {
  const [isRegister, setIsRegister] = useState(null)
  const dispatch= useDispatch()
  const {
    handleSubmit, 
    getFieldState, 
    register,
    getValues, 
    formState: {
      errors, 
      isDirty, 
      isValid, 
      dirtyFields
    }
  } = useForm({
    mode:'onChange',
    defaultValues:{
      emailRegister: '',
      first_name: '',
      last_name: '',
      passwordRegister: '',
      confirm_password:'',
    }
  })
  const errorIcon = <FontAwesomeIcon icon={faClose} className='errorIcon'/>
  const checkIcon = <FontAwesomeIcon icon={faCheck} className='checkIcon'/>
  const warningIcon = <FontAwesomeIcon icon={faCircleExclamation} className='warningIcon'/>
  const navigate = useNavigate()
  const submit =(data)=>{
    dispatch(setLoading(true))
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
          setIsRegister(true)
          setTimeout(()=>{
            navigate('/lobi/login')
          }, 3000)
        }
      })
      .catch(error=> setIsRegister(false))
      .finally(dispatch(setLoading(false)))
  }
  
  return(
    <div className="container--register">
      <h4>Register to init</h4>
      <form className='register' onSubmit={handleSubmit(submit)}>
          <label htmlFor='email'>
            Email:{
              getFieldState('emailRegister').isDirty?
              errors.emailRegister?
              errorIcon:
              checkIcon:
              null
            }
          </label>
          <input 
            id='email' 
            type="email" 
            {...register('emailRegister', {
                required: {
                  value:true,
                  message: 'This field is required'
                }, 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message:'Formatt is not acceptable '
                }
            })}
          />
          <p>{errors.emailRegister && <span>{warningIcon} {errors.emailRegister.message}</span>}</p>
          <label htmlFor='firstName'>
            First name:{
              getFieldState('first_name').isDirty? 
              errors.first_name?
              errorIcon:
              checkIcon:
              null
            }
          </label>
          <input 
            id='firstName' 
            type="text" 
            {...register('first_name', {
                required:{
                  value:true,
                  message:'This field is required'
                },
                minLength:{
                  value:4,
                  message:'Min length is 4 characters'
                }
            })}
          />
          <p>{errors.first_name && <span>{warningIcon} {errors.first_name.message}</span>}</p>
          <label htmlFor='lastName'>
            Last name:{
              getFieldState('last_name').isDirty? 
              errors.last_name?
              errorIcon:
              checkIcon:
              null
            }
          </label>
          <input 
            id='lastName' 
            type="text" 
            {...register('last_name', {
              required:{
                value:true,
                message:'This field is required'
              },
              minLength:{
                value:4,
                message:'Min length is 4 characters'
              }
            })}/>
          <p>{errors.last_name && <span>{warningIcon} {errors.last_name.message}</span>}</p>
          <label htmlFor='password'>
            Password:{
              getFieldState('passwordRegister').isDirty? 
              errors.passwordRegister?
              errorIcon:
              checkIcon:
              null
            }
          </label>
          <input 
            id='password' 
            type="password" 
            {...register('passwordRegister',{
              required:{
                value:true,
                message:'This field is required'
              },
              minLength:{
                value: 8,
                message: 'Min length is 8 chars'
              }
            })}
          />
          <p>{errors.passwordRegister && <span>{warningIcon} {errors.passwordRegister.message}</span>}</p>
          <label htmlFor='confirm_password'>
            Confirm Password:{
              getFieldState('confirm_password').isDirty? 
              errors.confirm_password?
              errorIcon:
              checkIcon:
              null
            }
          </label>
          <input 
            id='confirm_password' 
            type="password" 
            {...register('confirm_password',{
              validate: {
                samePass: v => v===getValues('passwordRegister') || 'Passwords does not match'
              }
            })}
          />
          <p>{errors.confirm_password && <span>{warningIcon} {errors.confirm_password.message}</span>}</p>
          <button
            disabled={!isValid}
            className={!isValid?'btn-disabled': null}
          >Register</button>
      </form>
      {isRegister===true && <p className='register--state successful'>
        Successful {checkIcon}
      </p>}
      {isRegister===false && <p className='register--state errors-msg'>
        This email is register {warningIcon}
      </p>}
    </div>
  )
}

export default RegisterForm
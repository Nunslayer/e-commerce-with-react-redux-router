import '../assets/styles/LoginForm.css'
import {useSelector, useDispatch} from 'react-redux'
import { loginUser, setInitLogValue } from "../store/slices/userLog.slice"
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCheck, faWarning} from '@fortawesome/free-solid-svg-icons'
const LoginForm =()=>{
    const navigate = useNavigate()
    const user = useSelector((state)=>state.userLog)
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const errorIcon = <FontAwesomeIcon icon={faWarning} />
    const checkIcon = <FontAwesomeIcon icon={faUserCheck} />
    useEffect(()=>{
        if(user.isLogin===false){
            dispatch(setInitLogValue())
        }
    },[])
    useEffect(()=>{
        if(user.isLogin){
            setTimeout(()=>{
                navigate('/shop')
            }, 5000)     
        }
        if(user.isLogin===false){
            setTimeout(()=>{
                setInitLogValue()
            }, 2000)     
        }
        
    },[user])
    const loginSubmit =(data)=>{
        const login={
          email: data.email,
          password: data.password
        }
        dispatch(loginUser(login))
    }
    return(
        <div className='container--login'>
        <form className='login' onSubmit={handleSubmit(loginSubmit)}>
            <label htmlFor="email">
                Email:
            </label>
            <input
                id='email'
                type="email" 
                placeholder='Type your email here'
                {...register('email')}
            />
            <label htmlFor="password">
                Password:
            </label>
            <input 
                type="password" 
                placeholder='Type your password here'
                {...register('password')}
            />
            <button>
                Login
            </button>
        </form>
        {user.isLogin===true && <p className='register--state successful'>
            Successful Login {checkIcon}
        </p>}
        {user.isLogin===false && <p className='register--state errors-msg'>
            Invalid dates {errorIcon}
        </p>}
        </div>
    )
}

export default LoginForm
import {useSelector, useDispatch} from 'react-redux'
import { loginUser } from "../store/slices/userLog.slice"
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useEffect } from 'react'
const LoginForm =()=>{
    const navigate = useNavigate()
    const user = useSelector((state)=>state.userLog)
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    useEffect(()=>{
        if(user.isLogin){
                navigate('/shop')
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
        <>
        <form className='login' onSubmit={handleSubmit(loginSubmit)}>
            <input type="email" {...register('email')}/>
            <input type="password" {...register('password')}/>
            <button>login</button>
        </form>
        <p>User:{user.isLogin?'registrado':'no registrado'}</p>
        </>
    )
}

export default LoginForm
import '../assets/styles/LoginForm.css'
import {useSelector, useDispatch} from 'react-redux'
import { loginUser, setInitLogValue } from "../store/slices/userLog.slice"
import {useLocation, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCheck, faWarning} from '@fortawesome/free-solid-svg-icons'
import { setBuyCartItems } from '../store/slices/cart.slice'
const LoginForm =({children, tittle})=>{
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state)=>state.userLog)
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()
  // const errorIcon = <FontAwesomeIcon icon={faWarning} />
  // const checkIcon = <FontAwesomeIcon icon={faUserCheck} />
  // useEffect(()=>{
  //   if(user.isLogin===false){
  //     dispatch(setInitLogValue())
  //   }
  // },[])
  // useEffect(()=>{
  //   if(user.isLogin){
  //     setTimeout(()=>{
  //       navigate('/shop')
  //     }, 3000)     
  //   }
  //   if(user.isLogin===false){
  //     setTimeout(()=>{
  //       dispatch(setInitLogValue())
  //     }, 4000)     
  //   }
      
  // },[user])
  const loginSubmit =(data)=>{
    const login={
      email: data.email,
      password: data.password
    }
    if(location.pathname.includes('cart')){
      console.log(login)
      dispatch(setBuyCartItems(login))
    }
    if(location.pathname==='/lobi/login'){
      dispatch(loginUser(login))
    }
  }

  return(
      <div className='container--login'>
        <h4>Login to {location.pathname.includes('cart')?'confirm':'init'}</h4>
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
          <p>Test: <small>prueba@example.com</small></p>
          <label htmlFor="password">
              Password:
          </label>
          <input 
              type="password" 
              placeholder='Type your password here'
              {...register('password')}
          />
          <p>Test: <small>password</small></p>
          <button>
              Login
          </button>
      </form>
      {children}
      </div>
  )
}

export default LoginForm
import '../assets/styles/LoginForm.css'
import { useDispatch } from 'react-redux'
import { loginUser } from "../store/slices/userLog.slice"
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { setBuyCartItems } from '../store/slices/cart.slice'
const LoginForm = ({ children }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const loginSubmit = (data) => {
    const login = {
      email: data.email,
      password: data.password
    }
    if (location.pathname.includes('cart')) {
      console.log(login)
      dispatch(setBuyCartItems(login))
    }
    if (location.pathname === '/lobi/login') {
      dispatch(loginUser(login))
    }
  }

  return (
    <div className='container--login'>
      <h4>Login to
        {location.pathname.includes('cart') ?
          'confirm' :
          'init'}
      </h4>
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
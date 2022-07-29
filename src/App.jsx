import { useState } from 'react'
import './App.css'
import {useSelector, useDispatch} from 'react-redux'
import {HashRouter, Routes, Route} from 'react-router-dom'
// import {newUser} from './store/slices/userLog.slice'
import {updateProducts} from './store/slices/products.slice'
import {useForm} from 'react-hook-form'
import { uploadToken } from './store/slices/token.slice'
import axios from 'axios'
import Products from './components/Products'
import LoginForm from './components/LoginForm'
import UserProfile from './components/UserProfile'
import ProtectedRoutes from './Routes/ProtectedRoutes'
import Login from './Routes/Login'
import Shop from './Routes/Shop'
import Cart from './Routes/Cart'
import ProductDetails from './Routes/ProductDetails'
import Register from './Routes/Register'
import Lobi from './Routes/Lobi'
import NavBar from './components/NavBar'
import Spinner from './components/Spinner'
function App() {
  // const [userRegister, setUserRegister] = useState(false)
  // const [count, setCount] = useState(0)
  // const user = useSelector((state)=>state.userLog)
  // const products = useSelector((state)=>state.products)
  // const token = useSelector((state)=> state.token)
  // const {handleSubmit, reset, register} = useForm()
  const loading = useSelector((state)=> state.loading)
  
  // const tokenDispatch=()=>{

  // }
 
  // const loginSubmit =(data)=>{
    
  //   const login={
  //     email: data.email,
  //     password: data.password
  //   }
  //   axios.post('https://ecommerce-exercise-backend.herokuapp.com/login/', login)
  //     .then(res=>{
  //       console.log(res)
  //       const {access} = res.data
  //       dispatch(uploadToken(access))
  //       dispatch(newUser(true))
  //       productsDispatch()
  //     })
  //     .catch(error=>console.error(error))
  // }
  // console.log(token) 
  // const productsDispatch=()=>{
  //   const getConfig = () => ({
  //     headers: { Authorization: `Bearer ${token}` }
  //   });
  //   axios.get('https://ecommerce-exercise-backend.herokuapp.com/products/',getConfig())
  //     .then(res=> console.log(res))
  //     .catch(error=>{console.error(error)})
  // }
  return (
    <div className="App">
      {/* <form onSubmit={submit}>
        <input type="text" value={value} onChange={e=> setValue(e.target.value)}/>
        <button>change</button>
      </form> */}
      <HashRouter>
        { loading && <Spinner/>}
        <NavBar/>
        <Routes>
          <Route path='/lobi' element={<Lobi/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/' element={<Shop/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/shop/:id' element={<ProductDetails/>}/>
          </Route>
        </Routes>
      </HashRouter>
      {/* <LoginForm />
      

      <Products />
      <UserProfile/> */}
    </div>
  )
}

export default App

import './App.css'
import {useSelector} from 'react-redux'
import {HashRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoutes from './Routes/ProtectedRoutes'
import Login from './Routes/Login'
import Shop from './Routes/Shop'
import Cart from './Routes/Cart'
import ProductDetails from './Routes/ProductDetails'
import Register from './Routes/Register'
import Lobi from './Routes/Lobi'
import NavBar from './components/NavBar'
import Spinner from './components/Spinner'
import User from './Routes/User'
function App() {
  const loading = useSelector((state)=> state.loading)
  return (
    <>
      { loading && <Spinner/>}
      <div className="App">
        <HashRouter>
          <NavBar/>
          <Routes>
            <Route path='/lobi' element={<Lobi/>}>
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
            </Route>
            <Route element={<ProtectedRoutes/>}>
              <Route path='/' element={<Shop/>}/>
              <Route path='/shop' element={<Shop/>}>
              <Route path='cart' element={<Cart/>}/> 
              </Route>
              <Route path='/shop/:id' element={<ProductDetails/>}>
              <Route path='cart' element={<Cart/>}/> 
              </Route>
              <Route path='/user' element={<User/>}/>            
            </Route>
          </Routes>
        </HashRouter>
      </div>
    </>
  )
}

export default App

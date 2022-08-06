import '../assets/styles/UserProfile.css'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initialUserDates } from "../store/slices/userEntity.slice"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { setUserUnlog } from "../store/slices/userLog.slice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCheck, faCartShopping } from '@fortawesome/free-solid-svg-icons'
const UserProfile = () => {
  const userData = useSelector((state) => state.userEntity)
  const userLog = useSelector((state) => state.userLog)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const userIcon = <FontAwesomeIcon icon={faUserCheck} />
  const cartIcon = <FontAwesomeIcon icon={faCartShopping} />
  useEffect(() => {
    if (userLog.isLogin) {
      dispatch(initialUserDates())
    }
  }, [userLog])

  return (
    <div className='user--profile'>
      {userData.id !== null ? <>
        <Link to={location.pathname.includes('user')?'/shop':'/user'}>
          {userIcon}
        </Link>
        {' | '}
        <Link to={location.pathname.includes('cart')?location.pathname.slice(0,-5):location.pathname.includes('shop')? location.pathname + '/cart':'/shop/cart'}>
          {cartIcon}
        </Link>
        {' | '}
        <Link to='/' onClick={() =>{
          dispatch(setUserUnlog())
          console.log(location)
        }}
        >
          LogOut
        </Link>
      </> : null}
    </div>
  )
}

export default UserProfile
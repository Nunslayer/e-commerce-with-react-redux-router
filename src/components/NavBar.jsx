import '../assets/styles/NavBar.css'
import {useSelector} from 'react-redux'
import UserProfile from './UserProfile'
import {NavLink, Link, useLocation} from 'react-router-dom'

const NavBar = () => {
  const userLog= useSelector((state)=> state.userLog)
  const location = useLocation()
  return(
    <>
      <section className='header'>
        <div>
          <Link to='/shop'>
            Shop
          </Link>
          {' | '}
          <Link to='/lobi'>
            Lobi
        </Link>
        </div>
        {
          userLog.isLogin===true? 
            <UserProfile/>:
            <div>
              <NavLink to={location.pathname.includes('login')?'/lobi':'/lobi/login'}>
                Login
              </NavLink>
              <span> | </span>
              <NavLink to={location.pathname.includes('register')?'/lobi':'/lobi/register'}>
                Register
              </NavLink>
            </div>
        }
      </section>
    </>
  )
}

export default NavBar
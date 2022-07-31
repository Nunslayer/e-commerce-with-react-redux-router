import '../assets/styles/NavBar.css'
import {useSelector} from 'react-redux'
import UserProfile from './UserProfile'
import {NavLink, Link, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'
const NavBar = () => {
  const mainIcon=<FontAwesomeIcon icon={faHome} />
  const userLog= useSelector((state)=> state.userLog)
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
              <NavLink to='/lobi/login'>
                Login
              </NavLink>
              <span> | </span>
              <NavLink to='/lobi/register'>
                Register
              </NavLink>
            </div>
        }
      </section>
    </>
  )
}

export default NavBar
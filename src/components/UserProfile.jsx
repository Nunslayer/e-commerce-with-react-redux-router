import '../assets/styles/UserProfile.css'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initialUserDates } from "../store/slices/userEntity.slice"
import {useNavigate, Link} from 'react-router-dom'
import { setUserUnlog } from "../store/slices/userLog.slice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCheck, faCartShopping} from '@fortawesome/free-solid-svg-icons'
const UserProfile =()=>{
    const userData = useSelector((state)=> state.userEntity)
    const userLog = useSelector((state)=> state.userLog)
    const cart = useSelector((state)=> state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userIcon = <FontAwesomeIcon icon={faUserCheck} />
    const cartIcon = <FontAwesomeIcon icon={faCartShopping} />
    useEffect(()=>{
        if(userLog.isLogin){
            dispatch(initialUserDates())
        }
    },[userLog])

    return(
        <div className='user--profile'>
        {userData.id !== null?<>
            <div className="user--profile__data">
                <div>
                    {userIcon}
                    <button 
                        onClick={()=>{
                            navigate('/cart')
                        }}
                    >
                {cartIcon}
            </button>
                </div>
                
                <span>
                    {userData.first_name}
                </span>
            </div>
           
            <Link to='/' onClick={()=>
                    dispatch(setUserUnlog())
                }
            >
                LogOut
            </Link>
        </>:null}
        </div>
    )
}

export default UserProfile
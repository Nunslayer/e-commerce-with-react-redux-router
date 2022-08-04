import '../assets/styles/Login.css'
import LoginForm from "../components/LoginForm"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCheck, faWarning } from '@fortawesome/free-solid-svg-icons'
import { setInitLogValue } from "../store/slices/userLog.slice"
import { useEffect } from "react"

const Login = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.userLog)
  const dispatch = useDispatch()
  const errorIcon = <FontAwesomeIcon icon={faWarning} />
  const checkIcon = <FontAwesomeIcon icon={faUserCheck} />
  useEffect(() => {
    if (user.isLogin === false) {
      dispatch(setInitLogValue())
    }
  }, [])
  useEffect(() => {
    if (user.isLogin) {
      setTimeout(() => {
        navigate('/shop')
      }, 1500)
    }
    if (user.isLogin === false) {
      setTimeout(() => {
        dispatch(setInitLogValue())
      }, 2000)
    }

  }, [user])
  return (
    <section className="main">
      <LoginForm>
        {user.isLogin === true && <p className='register--state successful'>
          Redirecting {<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
        </p>}
        {user.isLogin === false && <p className='register--state errors-msg'>
          Invalid dates {errorIcon}
        </p>}
      </LoginForm>
    </section>

  )
}

export default Login
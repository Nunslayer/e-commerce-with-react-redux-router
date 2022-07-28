import LoginForm from "../components/LoginForm"
import {useNavigate} from 'react-router-dom'
const Login =()=>{
    const navigate = useNavigate()
    return(
        <section className="main">
            <LoginForm />
        </section>
        
    )
}

export default Login
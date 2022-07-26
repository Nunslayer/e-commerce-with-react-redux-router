import LoginForm from "../components/LoginForm"
import {useNavigate} from 'react-router-dom'
const Login =()=>{
    const navigate = useNavigate()
    return(
        <section className="main">
            <LoginForm>

            </LoginForm> 
            <button onClick={()=>navigate('/register')}>
                go register
            </button> 
        </section>
        
    )
}

export default Login
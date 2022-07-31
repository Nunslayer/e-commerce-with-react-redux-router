import { useSelector } from "react-redux"

const User = () =>{
    const userEntity = useSelector((state)=> state.userEntity)
    return(
        <h1>User Dates</h1>
    )
}

export default User
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoutes = () => {
	const user = useSelector((state) => state.userLog)
	if (user.isLogin) {
		return <Outlet />
	} else {
		return <Navigate to='/lobi' />
	}
}

export default ProtectedRoutes
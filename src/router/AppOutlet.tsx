import { Navigate, Outlet } from 'react-router-dom'

const AppOutlet = () => {
    const token = localStorage.getItem('token')

    return (
        token ? <Outlet /> : <Navigate to='/' />
    )
}


export default AppOutlet
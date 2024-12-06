import { Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const AppOutlet = () => {
    const token = localStorage.getItem('token')

    return (
        <>
            <Toaster richColors />
            {
                token ? <Outlet /> : <Navigate to='/' />
            }
        </>
    )
}


export default AppOutlet
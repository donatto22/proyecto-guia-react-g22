import Loading from '@components/Loading'
import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { UserProvider } from '../shared/context/UserContext'

const AppOutlet = () => {
    const token = localStorage.getItem('cookieFallback')

    return (
        <>
            <Toaster richColors />
            {
                token ?
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                    :
                    <Navigate to='/' />
            }
        </>
    )
}


export default AppOutlet
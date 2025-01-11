import Loading from '@components/Loading'
import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const AppOutlet = () => {
    const token = localStorage.getItem('cookieFallback')
    const session = localStorage.getItem('session')

    return (
        <>
            <Toaster richColors />
            {
                (token && session) ?
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
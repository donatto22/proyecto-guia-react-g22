import Loading from '@components/Loading'
import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const AppOutlet = () => {
    const token = localStorage.getItem('token')

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
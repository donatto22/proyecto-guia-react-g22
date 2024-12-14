import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import AppOutlet from './AppOutlet'

import Login from '../pages/Login'

const Products = lazy(() => import('../pages/Products'))
const SingleProduct = lazy(() => import('../pages/SingleProduct'))
const Profile = lazy(() => import('../pages/Profile'))

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<AppOutlet />}>
                <Route path='/products' element={<Products />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/products/:id' element={<SingleProduct />} />
            </Route>

            <Route path='/' element={<Login />} />
        </Routes>
    )
}

export default AppRouter
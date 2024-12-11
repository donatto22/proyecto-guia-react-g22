import { Route, Routes } from 'react-router-dom'

import AppOutlet from './AppOutlet'

import Login from '../pages/Login'
import Products from '../pages/Products'
import SingleProduct from '../pages/SingleProduct'

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<AppOutlet />}>
                <Route path='/products' element={<Products />} />
                <Route path='/products/:id' element={<SingleProduct />} />
            </Route>

            <Route path='/' element={<Login />} />
        </Routes>
    )
}

export default AppRouter
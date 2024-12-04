import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Products from '../pages/Products'
import AppOutlet from './AppOutlet'

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<AppOutlet />}>
                <Route path='/products' element={<Products />} />
            </Route>

            <Route path='/' element={<Login />} />
        </Routes>
    )
}

export default AppRouter
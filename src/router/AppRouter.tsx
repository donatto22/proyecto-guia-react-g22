import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Products from '../pages/Products'

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/products' element={<Products />} />
        </Routes>
    )
}

export default AppRouter
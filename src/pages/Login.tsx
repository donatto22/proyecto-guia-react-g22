import { useRef } from 'react'
import { DummySession } from '../shared/declarations/Dummyjson'
import useFetch from '../shared/hooks/useFetch'

const Login = () => {
    const loginForm = useRef(null)
    const { post } = useFetch('https://dummyjson.com/auth/login')

    const ingresar = async (e: React.MouseEvent) => {
        e.preventDefault()

        const formulario = loginForm.current

        if (formulario) {
            const form = new FormData(formulario)
            const formObject = Object.fromEntries(form.entries())

            const json: DummySession = await post(formObject)

            localStorage.setItem('token', json.accessToken)
        }
    }

    return (
        <div>
            <form ref={loginForm}>
                <div className="formGroup">
                    <label htmlFor="username">Usuario</label>
                    <input id='username' name='username' type="text" />
                </div>

                <div className="formGroup">
                    <label htmlFor="password">Contraseña</label>
                    <input id='password' name='password' type="password" />
                </div>

                <button onClick={(e) => ingresar(e)}>Ingresar</button>
            </form>
        </div>
    )
}

export default Login
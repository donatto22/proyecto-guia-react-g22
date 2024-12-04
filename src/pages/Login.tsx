import { useRef } from 'react'

const Login = () => {
    const loginForm = useRef(null)

    const ingresar = (e) => {
        e.preventDefault()
        console.log(123)
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
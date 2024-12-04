import { useRef } from 'react'

const Login = () => {
    const loginForm = useRef(null)

    const ingresar = async (e: React.MouseEvent) => {
        e.preventDefault()

        const formulario = loginForm.current

        if (formulario) {
            const form = new FormData(formulario)
            const formObject = Object.fromEntries(form.entries())

            const { username, password } = formObject

            // login
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username, password
                })
            })

            const json = await response.json()
            console.log(json)
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
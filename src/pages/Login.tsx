import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, FormLabel, Input, Stack } from '@chakra-ui/react'

import loginBackground from '@images/login-background.jpg'
import { account } from '../shared/lib/appwrite'
import { toast } from 'sonner'

const Login = () => {
    const loginForm = useRef(null)
    const navigate = useNavigate()

    const ingresar = async (e: React.MouseEvent) => {
        e.preventDefault()

        const formulario = loginForm.current

        if (formulario) {
            const form = new FormData(formulario)
            const { email, password } = Object.fromEntries(form.entries())

            const session = await account.createEmailPasswordSession(email, password)

            localStorage.setItem('sessionId', session.$id)

            navigate('/products')
        }
    }

    return (
        <Stack direction='row' h='100vh'>
            <Box w='50%' bgImg={loginBackground} bgPos='center' bgSize='cover' />

            <Box w='50%' display='flex' alignItems='center' justifyContent='center'>
                <Box bgColor='#422F21' padding='2em' borderRadius='20px'>
                    <Box as='form' ref={loginForm} color='beige' display='flex' flexDir='column' gap='1em'>
                        <div className="formGroup">
                            <FormLabel htmlFor='email'>Correo</FormLabel>
                            <Input w='260px' id='email' name='email' type="email" />
                        </div>

                        <div className="formGroup">
                            <FormLabel htmlFor='password'>Contraseña</FormLabel>
                            <Input w='260px' id='password' name='password' type="password" />
                        </div>

                        <Button onClick={(e) => ingresar(e)}>Ingresar</Button>
                    </Box>
                </Box>
            </Box>
        </Stack>
    )
}

export default Login
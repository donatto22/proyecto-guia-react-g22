import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DummyEndpoints, DummySession } from '../shared/declarations/Dummyjson'

import { Box, Button, FormLabel, Input, Stack } from '@chakra-ui/react'

import loginBackground from '@images/login-background.jpg'
import useFetch from '@hooks/useFetch'

const Login = () => {
    const loginForm = useRef(null)
    const navigate = useNavigate()

    const { post } = useFetch(DummyEndpoints.LOGIN)

    const ingresar = async (e: React.MouseEvent) => {
        e.preventDefault()

        const formulario = loginForm.current

        if (formulario) {
            const form = new FormData(formulario)
            const formObject = Object.fromEntries(form.entries())

            const json: DummySession = await post(formObject)

            localStorage.setItem('token', json.accessToken)
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
                            <FormLabel htmlFor='username'>Usuario</FormLabel>
                            <Input w='260px' id='username' name='username' type="text" />
                        </div>

                        <div className="formGroup">
                            <FormLabel htmlFor='password'>Usuario</FormLabel>
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
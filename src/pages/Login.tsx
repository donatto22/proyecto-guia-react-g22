import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, FormLabel, Image, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import loginBackground from '@images/login-background.jpg'
import { account, database, ID } from '../shared/lib/appwrite'
import { Appwrite } from '../shared/lib/env'
import { toast, Toaster } from 'sonner'

import logo from '/my-logo.png'
import useAppwrite from '@hooks/useAppwrite'

const Login = () => {
    const loginForm = useRef(null)
    const crearCuentaForm = useRef(null)
    const navigate = useNavigate()

    const { fromSession } = useAppwrite()

    const ingresar = async (e: React.MouseEvent) => {
        e.preventDefault()

        const formulario = loginForm.current

        if (formulario) {
            const form = new FormData(formulario)
            const { email, password } = Object.fromEntries(form.entries()) as { [k: string]: string }

            const session = await fromSession().login(email, password)

            localStorage.setItem('sessionId', session.$id)

            navigate('/products')
        }
    }

    const crearCuenta = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()

        const formulario = crearCuentaForm.current

        if (formulario) {
            const form = new FormData(formulario)
            const { name, email, password } = Object.fromEntries(form.entries()) as { [k: string]: string }

            const accountId = ID.unique()
            await account.create(accountId, email, password, name)

            await database.createDocument(Appwrite.databaseId, Appwrite.collections.profiles, ID.unique(), {
                userId: accountId
            }).then(() => {
                toast.success('Perfil creado')
            })
        }
    }

    useEffect(() => {
        const session = localStorage.getItem('cookieFallback')

        if (session && JSON.parse(session).length != 0) navigate('/products')
    })

    return (
        <>
            <Toaster richColors />
            <Stack direction='row' h='100vh'>
                <Box w='50%' bgImg={loginBackground} bgPos='center' bgSize='cover' />

                <Box w='50%' display='flex' flexDir='column' alignItems='center' justifyContent='center' gap='3em'>
                    <Image src={logo} width='50px' filter='invert(1)' />

                    <Tabs>
                        <TabList>
                            <Tab>Ingresar</Tab>
                            <Tab>Soy nuevo</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Box onSubmit={(e: React.MouseEvent<HTMLDivElement>) => ingresar(e)} as='form' ref={loginForm} display='flex' flexDir='column' gap='2em'>
                                    <div className="formGroup">
                                        <FormLabel htmlFor='email'>Correo</FormLabel>
                                        <Input required w='260px' id='email' name='email' type="email" />
                                    </div>

                                    <div className="formGroup">
                                        <FormLabel htmlFor='password'>Contraseña</FormLabel>
                                        <Input required w='260px' id='password' name='password' type="password" />
                                    </div>

                                    <Button type='submit'>Ingresar</Button>
                                </Box>
                            </TabPanel>
                            <TabPanel>
                                <Box onSubmit={(e: React.MouseEvent<HTMLDivElement>) => crearCuenta(e)}
                                    ref={crearCuentaForm} as='form' display='flex' flexDir='column' gap='1em'>
                                    <div className="formGroup">
                                        <FormLabel htmlFor='name'>Nombre</FormLabel>
                                        <Input required w='260px' id='name' name='name' type="text" />
                                    </div>

                                    <div className="formGroup">
                                        <FormLabel htmlFor='email'>Correo</FormLabel>
                                        <Input required w='260px' id='email' name='email' type="email" />
                                    </div>

                                    <div className="formGroup">
                                        <FormLabel htmlFor='password'>Contraseña</FormLabel>
                                        <Input required w='260px' id='password' name='password' type="password" />
                                    </div>

                                    <Button type='submit'>Crear cuenta</Button>
                                </Box>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>

            </Stack>
        </>
    )
}

export default Login
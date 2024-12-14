import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, FormLabel, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import loginBackground from '@images/login-background.jpg'
import { account, database, ID } from '../shared/lib/appwrite'
import { Resend } from 'resend';
import Email from '@components/Email'
import { Appwrite } from '../shared/lib/env'
import { toast, Toaster } from 'sonner'

const Login = () => {
    const loginForm = useRef(null)
    const crearCuentaForm = useRef(null)
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

    const crearCuenta = async (e) => {
        e.preventDefault()

        const formulario = crearCuentaForm.current

        if (formulario) {
            const form = new FormData(formulario)
            const { name, email, password } = Object.fromEntries(form.entries())

            const accountId = ID.unique()
            await account.create(accountId, email, password, name)

            await database.createDocument(Appwrite.databaseId, Appwrite.collections.profiles, ID.unique(), {
                userId: accountId
            }).then(() => {
                toast.success('Perfil creado')
            })
        }
    }

    const sendEmail = async () => {
        const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY)

        const resultado = await resend.emails.send({
            from: '<constantinne9@gmail.com>',
            to: ['grenwket@gmail.com'],
            subject: 'Correo de prueba',
            react: <Email />
        })

        console.log(resultado)
    }

    useEffect(() => {
        // sendEmail()
    }, [])

    return (
        <>
            <Toaster richColors />
            <Stack direction='row' h='100vh'>
                <Box w='50%' bgImg={loginBackground} bgPos='center' bgSize='cover' />

                <Box w='50%' display='flex' alignItems='center' justifyContent='center'>
                    <Tabs>
                        <TabList>
                            <Tab>Ingresar</Tab>
                            <Tab>Soy nuevo</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Box minH='400px' as='form' ref={loginForm} display='flex' flexDir='column' gap='1em'>
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
                            </TabPanel>
                            <TabPanel>
                                <Box ref={crearCuentaForm} minH='400px' as='form' display='flex' flexDir='column' gap='1em'>
                                    <div className="formGroup">
                                        <FormLabel htmlFor='name'>Nombre</FormLabel>
                                        <Input w='260px' id='name' name='name' type="text" />
                                    </div>

                                    <div className="formGroup">
                                        <FormLabel htmlFor='email'>Correo</FormLabel>
                                        <Input w='260px' id='email' name='email' type="email" />
                                    </div>

                                    <div className="formGroup">
                                        <FormLabel htmlFor='password'>Contraseña</FormLabel>
                                        <Input w='260px' id='password' name='password' type="password" />
                                    </div>

                                    <Button onClick={(e) => crearCuenta(e)}>Crear cuenta</Button>
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
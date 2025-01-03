import { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Image, Link as ChakraLink, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { RiHomeLine } from "react-icons/ri"
import { FaUsers } from "react-icons/fa"
import { LuCircleUserRound, LuShoppingCart } from "react-icons/lu"
import { MdDelete } from "react-icons/md"

import logo from '/my-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../lib/appwrite'
import { UserContext } from '../context/UserContext'
import { useCartStore } from '../store/useCartStore'

const NavLink = ({ icon, text, reference, onClick }: {
    icon: ReactElement,
    text: string,
    onClick: () => void
}) => {
    return (
        <ChakraLink ref={reference} onClick={onClick} display='flex' gap='10px' alignItems='center'> {icon} {text}</ChakraLink>
    )
}

const ProfileMenu = ({ username }: { username: string }) => {
    const navigate = useNavigate()
    const userContext = useContext(UserContext)

    const logout = async () => {
        await userContext?.logout()
        // toast.success('Has cerrado sesión')
        navigate('/')
    }

    return (
        <Menu>
            <MenuButton>
                <Box display='flex' gap='10px' alignItems='center'> <LuCircleUserRound /> {username}</Box>
            </MenuButton>
            <MenuList color='#1a1a1a'>
                <MenuItem><Link to='/profile'>Ver Perfil</Link></MenuItem>
                <MenuItem><Link to='/products'>Productos</Link></MenuItem>
                <MenuItem>Vaciar carrito</MenuItem>
                <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
            </MenuList>
        </Menu>
    )
}

const Navbar = () => {
    const btnRef = useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [username, setUsername] = useState()
    const { cartProducts, removeProduct } = useCartStore()
    const navigate = useNavigate()

    async function getUser() {
        const cuenta = await account.get()
        setUsername(cuenta.name)
    }

    useEffect(() => {
        getUser()
    }, [])


    const goToPay = () => {
        navigate('/billing')
    }

    return (
        <>
            <HStack minH='40px' bgColor='#1a1a1a' mb='2em'>
                <HStack w='70%' m='0 auto' p='1em 0' color='#eee' justifyContent='space-between'>
                    <HStack gap='1em'>
                        <Image w='40px' src={logo} alt='logo tienda' />
                        <Text fontSize='2xl'>Mi tienda</Text>
                    </HStack>

                    <HStack gap='2em'>
                        <NavLink icon={<RiHomeLine />} text='Inicio' />
                        <NavLink icon={<FaUsers />} text='Nosotros' />
                        <ProfileMenu username={username} />

                        {/* Icono del carrito */}
                        <NavLink ref={btnRef} onClick={onOpen} icon={<LuShoppingCart />} text='' />
                    </HStack>
                </HStack>
            </HStack>

            <Drawer size='md'
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <VStack>
                            {
                                cartProducts.map(product => (
                                    <HStack w='100%' bgColor='#eee' color='#1a1a1a' p='1em' borderRadius='10px'>
                                        <Image src={product.thumbnail} w='50px' />
                                        <VStack align='start'>
                                            <Text>{product.title}</Text>
                                            <Button bgColor='red.200' onClick={() => removeProduct(product.id)}>
                                                <MdDelete color='darkred' />
                                            </Button>
                                        </VStack>

                                    </HStack>
                                ))
                            }
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={goToPay}>Comprar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Navbar
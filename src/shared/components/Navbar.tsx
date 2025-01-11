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
import QuantityButton from './QuantityButton'
import { FiMenu } from 'react-icons/fi'

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
                <HStack w='80%' m='0 auto' p='1em 0' color='#eee' justifyContent='space-between'>
                    <HStack gap='1em'>
                        <Image w='40px' src={logo} alt='logo tienda' />
                        <Text fontSize='2xl'>Mi tienda</Text>
                    </HStack>

                    <HStack gap='2em'>
                        <HStack gap='2em' display={{
                            base: 'none', md: 'flex'
                        }}>
                            <NavLink icon={<RiHomeLine />} text='Inicio' />
                            <NavLink icon={<FaUsers />} text='Nosotros' />
                            <ProfileMenu username={username} />
                        </HStack>

                        <VStack display={{
                            base: 'flex', md: 'none'
                        }}>
                            <Menu>
                                <MenuButton bgColor='green'>
                                    <FiMenu />
                                </MenuButton>
                                <MenuList color='black'>
                                    <MenuItem>Inicio</MenuItem>
                                    <MenuItem>Nosotros</MenuItem>
                                    <MenuItem>Perfil</MenuItem>
                                </MenuList>
                            </Menu>
                        </VStack>

                        {/* Icono del carrito */}
                        <NavLink ref={btnRef} onClick={onOpen} icon={<LuShoppingCart />} text={String(cartProducts.length)} />
                    </HStack>
                </HStack>
            </HStack>

            <Drawer size='sm'
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Carrito: {cartProducts.length}</DrawerHeader>

                    <DrawerBody>
                        <VStack>
                            {
                                cartProducts.map(product => (
                                    <HStack w='100%' border='1px solid #eee' p='1em' borderRadius='10px'>
                                        <Image src={product.thumbnail} w='50px' mr='10px' />
                                        <HStack justifyContent='space-between' w='100%'>
                                            <VStack align='start'>
                                                <Text>{product.title}</Text>
                                                <QuantityButton product={product} />
                                            </VStack>

                                            <Button bgColor='red.200' onClick={() => removeProduct(product.id)}>
                                                <MdDelete color='darkred' />
                                            </Button>
                                        </HStack>

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
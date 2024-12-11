import { ReactElement, useRef } from 'react'
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Image, Input, Link, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import { RiHomeLine } from "react-icons/ri"
import { FaUsers } from "react-icons/fa"
import { LuCircleUserRound, LuShoppingCart } from "react-icons/lu"

import logo from '/my-logo.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const NavLink = ({ icon, text, reference, onClick }: {
    icon: ReactElement,
    text: string,
    onClick: () => void
}) => {
    return (
        <Link ref={reference} onClick={onClick} display='flex' gap='10px' alignItems='center'> {icon} {text}</Link>
    )
}

const ProfileMenu = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        toast.success('Has cerrado sesión')
        navigate('/')

    }

    return (
        <Menu>
            <MenuButton>
                <Box display='flex' gap='10px' alignItems='center'> <LuCircleUserRound /> Cuenta</Box>
            </MenuButton>
            <MenuList color='#1a1a1a'>
                <MenuItem>Ver Perfil</MenuItem>
                <MenuItem>Vaciar carrito</MenuItem>
                <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
            </MenuList>
        </Menu>
    )
}

const Navbar = () => {
    const btnRef = useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <HStack minH='40px' bgColor='#1a1a1a' mb='2em' sx={{
                '&:hover': {
                    backgroundColor: 'red'
                }
            }}>
                <HStack w='70%' m='0 auto' p='1em 0' color='#eee' justifyContent='space-between'>
                    <HStack gap='1em'>
                        <Image w='40px' src={logo} alt='logo tienda' />
                        <Text fontSize='2xl'>Mi tienda</Text>
                    </HStack>

                    <HStack gap='2em'>
                        <NavLink icon={<RiHomeLine />} text='Inicio' />
                        <NavLink icon={<FaUsers />} text='Nosotros' />
                        <ProfileMenu />

                        {/* Icono del carrito */}
                        <NavLink ref={btnRef} onClick={onOpen} icon={<LuShoppingCart />} text='' />
                    </HStack>
                </HStack>
            </HStack>

            <Drawer
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
                        <Input placeholder='Type here...' />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Navbar
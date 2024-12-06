import { ReactElement } from 'react'
import { Box, HStack, Image, Link, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { RiHomeLine } from "react-icons/ri"
import { FaUsers } from "react-icons/fa"
import { LuCircleUserRound, LuShoppingCart } from "react-icons/lu"

import logo from '/my-logo.png'

const NavLink = ({ icon, text }: {
    icon: ReactElement,
    text: string
}) => {
    return (
        <Link display='flex' gap='10px' alignItems='center'> {icon} {text}</Link>
    )
}

const ProfileMenu = () => {
    return (
        <Menu>
            <MenuButton>
                <Box display='flex' gap='10px' alignItems='center'> <LuCircleUserRound /> Cuenta</Box>
            </MenuButton>
            <MenuList color='#1a1a1a'>
                <MenuItem>Ver Perfil</MenuItem>
                <MenuItem>Vaciar carrito</MenuItem>
                <MenuItem>Cerrar Sesión</MenuItem>
            </MenuList>
        </Menu>
    )
}

const Navbar = () => {
    return (
        <HStack minH='40px' bgColor='#1a1a1a' mb='2em'>
            <HStack w='70%' m='0 auto' p='1em 0' color='#eee' justifyContent='space-between'>
                <HStack gap='1em'>
                    <Image w='40px' src={logo} alt='logo tienda' />
                    <Text fontSize='2xl'>Mi tienda</Text>
                </HStack>

                <HStack gap='2em'>
                    <NavLink icon={<RiHomeLine />} text='Inicio' />
                    <NavLink icon={<FaUsers />} text='Nosotros' />
                    <ProfileMenu />
                    <NavLink icon={<LuShoppingCart />} text='' />
                </HStack>
            </HStack>
        </HStack>
    )
}

export default Navbar
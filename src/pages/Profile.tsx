import { Box, Button, FormLabel, Image, Input, Text } from '@chakra-ui/react'
import BaseLayout from '@layouts/BaseLayout'
import { useContext } from 'react'
import { UserContext } from '../shared/context/UserContext'
import MyProducts from '@components/MyProducts'

const Profile = () => {
    const context = useContext(UserContext)

    return (
        <BaseLayout>
            <Box width='70%' m='2em auto' bgColor='gray'>
                {
                    context?.profile && <Image src={context.profile.bannerUrl} alt='profile banner' />
                }

                {
                    context?.products ? <MyProducts products={context?.products} onRefresh={context?.getProfileProducts} /> :
                        <Text>Cargando...</Text>
                }


                {
                    context?.profile?.nickname ? <Text fontSize='30px'> {context?.profile?.nickname} </Text> : <Text>'No tiene apodo'</Text>
                }
            </Box>

            <Box as='form' display='flex' flexDir='column' gap='1em' width='500px' m='0 auto'>
                <Box>
                    <FormLabel htmlFor="nickname">Apodo</FormLabel>
                    <Input type="text" name='nickname' id='nickname' />
                </Box>

                <Box>
                    <FormLabel htmlFor="age">Edad</FormLabel>
                    <Input type="number" name='age' id='age' />
                </Box>

                <Box>
                    <FormLabel htmlFor="photo">Foto de perfil</FormLabel>
                    <Input type="file" name='photo' id='photo' />
                </Box>

                <Box>
                    <FormLabel htmlFor="banner">Banner</FormLabel>
                    <Input type="file" name='banner' id='banner' />
                </Box>

                <Button>Actualizar</Button>
            </Box>
        </BaseLayout>
    )
}

export default Profile
import { Box, Button, FormLabel, Input, Text } from '@chakra-ui/react'
import BaseLayout from '@layouts/BaseLayout'
import { useContext, useEffect } from 'react'
import { UserContext } from '../shared/context/UserContext'

const Profile = () => {
    const context = useContext(UserContext)

    return (
        <BaseLayout>
            <Box as='form' display='flex' flexDir='column' gap='1em' width='500px' m='0 auto'>
                {
                    context?.profile.nickname ? <Text>'Tiene apodo' </Text> : <Text>'No tiene apodo'</Text>
                }
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
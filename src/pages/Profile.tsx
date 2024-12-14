import { Box, Button, FormLabel, Input } from '@chakra-ui/react'
import BaseLayout from '@layouts/BaseLayout'
import { useEffect } from 'react'
import { account, database } from '../shared/lib/appwrite'
import { Appwrite } from '../shared/lib/env'
import { Query } from 'appwrite'

const Profile = () => {
    async function getProfile() {
        const cuenta = await account.get()

        const { documents } = await database.listDocuments(Appwrite.databaseId, Appwrite.collections.profiles, [
            Query.equal('userId', cuenta.$id)
        ])

        console.log(documents[0])
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <BaseLayout>
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
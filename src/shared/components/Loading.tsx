import { Box } from '@chakra-ui/react'
import { ScaleLoader } from 'react-spinners'

const Loading = () => {
    return (
        <Box w='100vw' h='100vh' display='flex' alignItems='center' justifyContent='center'>
            <ScaleLoader />
        </Box>
    )
}

export default Loading
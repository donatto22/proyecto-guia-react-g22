import { useRef } from 'react'
import { Button, Tooltip, useDisclosure } from '@chakra-ui/react'
import Dialog from './Dialog'
import { MdDelete } from 'react-icons/md'

const DeleteButton = ({ action, confirmTitle }: {
    action: () => void
    confirmTitle?: string
}
) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    return (
        <>
            <Tooltip hasArrow label='Delete'>
                <Button bgColor='#ddd' sx={{
                    '&:hover': {
                        bgColor: '#ffd3d3',
                        color: '#af0000'
                    }
                }} onClick={onOpen}><MdDelete size='20px' /></Button>
            </Tooltip>

            <Dialog action={action}
                isOpen={isOpen} onClose={onClose} cancelRef={cancelRef}
                title={confirmTitle || 'Eliminar'} bodyContent='Estás seguro que deseas eliminar el producto?' />
        </>
    )
}

export default DeleteButton
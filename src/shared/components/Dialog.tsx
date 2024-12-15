import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'
import { ReactElement } from 'react'

const Dialog = ({ onClose, isOpen, cancelRef, title, bodyContent, action }: {
    onClose: () => void
    action: () => void
    isOpen: boolean
    title: string
    bodyContent: string | ReactElement
}) => {
    return (
        <AlertDialog motionPreset='slideInBottom' isCentered
            leastDestructiveRef={cancelRef}
            onClose={onClose} isOpen={isOpen}
            closeOnEsc={false}
            closeOnOverlayClick={false}>
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader>{title} </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody> {bodyContent} </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        No
                    </Button>
                    <Button colorScheme='red' ml={3} onClick={action}>
                        Si
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Dialog
import { Box, Button, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'

const AppwriteProduct = ({ product, deleteAppwriteProduct }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box key={product.name}>
            <Image src={product.thumbnail} width='100px' />
            <Text>{product.name}</Text>
            <Button onClick={() => deleteAppwriteProduct(product.$id)}>Eliminar</Button>
            <Button onClick={onOpen}>Editar</Button>

            <Modal

                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar {product.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Image src='' />
                            <input type="file" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Descripcion</FormLabel>
                            <Input />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Precio</FormLabel>
                            <Input />
                        </FormControl>

                        <FormControl mt={4} display='flex' alignItems='center'>
                            <FormLabel m='0' mr='4'>Activo</FormLabel>
                            <input type="checkbox" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default AppwriteProduct
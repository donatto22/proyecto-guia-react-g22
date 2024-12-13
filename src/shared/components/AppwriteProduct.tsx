import { Box, Button, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { database, ID, storage } from '../lib/appwrite'
import { Appwrite } from '../lib/env'
import { toast } from 'sonner'

const AppwriteProduct = ({ product, deleteAppwriteProduct }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [imageUrl, setImageUrl] = useState<string>()
    const modalForm = useRef(null)

    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [active, setActive] = useState<boolean>(product.active)

    const edit = async () => {
        // eliminar la foto anterior
        await storage.deleteFile(Appwrite.buckets.pictures, product.imageId)

        // subir la nueva foto
        const formulario = modalForm.current

        if (formulario) {
            const form = new FormData(formulario)
            const { nuevaImagen } = Object.fromEntries(form.entries())

            const idUnique = ID.unique()
            await storage.createFile(Appwrite.buckets.pictures, idUnique, nuevaImagen)

            // guardar el ID de la nueva imagen
            const newProduct = {
                name: name,
                description: description,
                imageId: idUnique,
                price: Number(price),
                active: active
            }

            await database.updateDocument(Appwrite.databaseId, Appwrite.collections.products, product.$id, newProduct)
                .then(() => {
                    toast.success('Producto editado')
                }).catch(() => {
                    toast.error('no se logró editar el producto')
                })
        }
    }

    const getImage = () => {
        const url = storage.getFilePreview(Appwrite.buckets.pictures, product.imageId)
        setImageUrl(url)
    }

    useEffect(() => {
        getImage()
    }, [])

    return (
        <Box key={product.name}>
            <Image src={imageUrl} width='100px' />
            <Text>{product.name}</Text>
            <Button onClick={() => deleteAppwriteProduct(product.$id)}>Eliminar</Button>
            <Button onClick={onOpen}>Editar</Button>

            <Modal
                isCentered
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Producto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} as='form' ref={modalForm}>
                        <FormControl display='flex' alignItems='center' flexDir='column' gap={4}>
                            <Image src={imageUrl} width='160px' borderRadius='10px' />
                            <input name='nuevaImagen' type="file" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Nombre</FormLabel>
                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Descripcion</FormLabel>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Precio</FormLabel>
                            <Input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4} display='flex' alignItems='center'>
                            <FormLabel m='0' mr='4'>Activo</FormLabel>
                            <input type="checkbox" checked={active} onChange={() => setActive(prev => !prev)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={edit}>
                            Guardar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default AppwriteProduct
import { useEffect, useRef, useState } from 'react'
import { Box, Button, ButtonGroup, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { toast } from 'sonner'
import { PersonalProduct } from '../declarations/Database'
import { database, ID, storage } from '../lib/appwrite'
import { Appwrite } from '../lib/env'

import { MdModeEdit } from "react-icons/md"
import DeleteButton from './DeleteButton'

const AppwriteProduct = ({ product, deleteAppwriteProduct }: {
    product: PersonalProduct
    deleteAppwriteProduct: (id: string) => void
}) => {
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
            const { nuevaImagen } = Object.fromEntries(form.entries()) as { [k: string]: File }

            const idUnique = ID.unique()
            await storage.createFile(Appwrite.buckets.pictures, idUnique, nuevaImagen)

            // guardar el ID de la nueva imagen
            const newProduct = {
                name: name,
                description: description,
                imageId: idUnique,
                price: price,
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
        <Box key={product.name} bgColor='#eee' borderRadius='20px' w='300px' display='flex' gap='1em'>
            <Image src={imageUrl} width='100px' borderRadius='20px' p={2} />
            <Box display='flex' flexDir='column' justifyContent='space-around'>
                <Text fontSize='20px'>{product.name}</Text>
                <ButtonGroup>
                    <Tooltip hasArrow label='Edit'>
                        <Button bgColor='#ddd' sx={{
                            '&:hover': {
                                bgColor: '#feddba',
                                color: '#da7105'
                            }
                        }} onClick={onOpen}><MdModeEdit size='20px' /></Button>
                    </Tooltip>

                    <DeleteButton action={() => { deleteAppwriteProduct(product.$id) }} />
                </ButtonGroup>
            </Box>

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
                            <Input type='number' value={price} onChange={(e) => setPrice(Number(e.target.value))} />
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
        </Box >
    )
}

export default AppwriteProduct
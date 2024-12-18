import { useRef } from 'react'
import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import AppwriteProduct from './AppwriteProduct'
import { PersonalProduct } from '../declarations/Database'
import { toast } from 'sonner'
import useAppwrite from '@hooks/useAppwrite'
import { Appwrite } from '../lib/env'
import { ID } from '../lib/appwrite'
import { getFormEntries } from '../util/getFormEntries'

const MyProducts = ({ products, onRefresh }: {
    products: PersonalProduct[]
    onRefresh?: () => void
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const modalForm = useRef(null)

    const { fromDatabase, fromStorage } = useAppwrite()
    const productsCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.products)
    const photoBucket = fromStorage().bucket(Appwrite.buckets.pictures)

    const deleteAppwriteProduct = async (id: string) => {
        await productsCollection.deleteDocument(id).then(() => {
            toast.success('Gatito eliminado')

            if (onRefresh) {
                onRefresh()
            }
        }).catch(() => {
            toast.error('No se eliminó el producto')
        })
    }

    const createProduct = async (e) => {
        e.preventDefault()

        if (modalForm.current) {
            const formObject = getFormEntries(modalForm.current)

            // se sube la imagen
            const imageId = ID.unique()
            await photoBucket.createFile(imageId, formObject.image)

            const product = {
                name: formObject.name,
                imageId: imageId,
                description: formObject.description,
                price: Number(formObject.price),
                active: formObject.active ? true : false
            }

            await productsCollection.createDocument(product).then(() => {
                toast.success('Producto creado')
                modalForm.current.reset()

                if (onRefresh) {
                    onRefresh()
                }

                onClose()
            }).catch(async () => {
                toast.error('Producto no se llegó a subir')

                await photoBucket.deleteFile(imageId)
            })
        }
    }

    return (
        <Box w='65%' m='2em auto'>
            <HStack justifyContent='space-between' mb={4}>
                <Heading size='lg'>Mis productos</Heading>
                <Button onClick={onOpen}>Agregar</Button>
            </HStack>
            <hr />

            <Box gap='1em' display='flex' overflowX='scroll' mt={4} pb={4}>
                {
                    products?.map(product => (
                        <AppwriteProduct key={product.name} onRefresh={onRefresh}
                            product={product} deleteAppwriteProduct={deleteAppwriteProduct} />
                    ))
                }
            </Box>

            <Modal
                isCentered
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar Producto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} as='form' ref={modalForm}>
                        <FormControl mt={4}>
                            <FormLabel htmlFor='image'>Imagen</FormLabel>
                            <Input id='image' name='image' type="file" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel htmlFor='name'>Name</FormLabel>
                            <Input id='name' name='name' type="text" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel htmlFor='price'>Price</FormLabel>
                            <Input id='price' name='price' type="number" />
                        </FormControl>

                        <FormControl mt={4} alignItems='center'>
                            <FormLabel htmlFor='description'>description</FormLabel>
                            <Input id='description' name='description' type="text" />
                        </FormControl>

                        <FormControl mt={4} display='flex' alignItems='center'>
                            <FormLabel htmlFor='active'>Active</FormLabel>
                            <input type="checkbox" name="active" id="active" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={createProduct}>
                            Agregar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default MyProducts
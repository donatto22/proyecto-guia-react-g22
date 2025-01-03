import BaseLayout from '@layouts/BaseLayout'
import { useCartStore } from '../shared/store/useCartStore'
import { Button, HStack, Image, Table, TableContainer, Tag, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import DemoPdf from '@components/DemoPdf'
import SignatureCanvas from 'react-signature-canvas'

import { IoMdAdd } from "react-icons/io"
import { FiMinus } from "react-icons/fi"

const Receipt = () => {
    const { cartProducts, removeProduct, addOneProduct, removeOneProduct } = useCartStore()

    return (
        <BaseLayout>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Foto</Th>
                            <Th>Producto</Th>
                            <Th>Categoria</Th>
                            <Th isNumeric>Cantidad</Th>
                            <Th isNumeric>Precio</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            cartProducts.map(product => (
                                <Tr>
                                    <Td><Image w='100px' src={product.thumbnail} /></Td>
                                    <Td>{product.title}</Td>
                                    <Td><Tag>{product.category}</Tag></Td>
                                    <Td isNumeric>
                                        <HStack justifyContent='end'>
                                            <Button onClick={() => addOneProduct(product.id)}>
                                                <IoMdAdd />
                                            </Button>
                                            <Text>{product.quantity}</Text>
                                            <Button onClick={() => removeOneProduct(product.id)}>
                                                <FiMinus />
                                            </Button>
                                        </HStack>
                                    </Td>
                                    <Td isNumeric>S/. {(product.price * product.quantity).toFixed(2)}</Td>
                                    <Td>
                                        <Button onClick={() => {
                                            removeProduct(product.id)
                                        }}>Eliminar</Button>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Foto</Th>
                            <Th>Producto</Th>
                            <Th>Categoria</Th>
                            <Th isNumeric>Cantidad</Th>
                            <Th isNumeric>Precio</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>

            <SignatureCanvas penColor='green'
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />

            <DemoPdf />
        </BaseLayout>
    )
}

export default Receipt
import BaseLayout from '@layouts/BaseLayout'
import { useCartStore } from '../shared/store/useCartStore'
import { Image, Table, TableCaption, TableContainer, Tag, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'

const Receipt = () => {
    const { cartProducts } = useCartStore()

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
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            cartProducts.map(product => (
                                <Tr>
                                    <Td><Image w='100px' src={product.thumbnail} /></Td>
                                    <Td>{product.title}</Td>
                                    <Td><Tag>{product.category}</Tag></Td>
                                    <Td isNumeric>1</Td>
                                    <Td isNumeric>S/. {product.price}</Td>
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
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </BaseLayout>
    )
}

export default Receipt
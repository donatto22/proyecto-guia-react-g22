import BaseLayout from '@layouts/BaseLayout'
import { useCartStore } from '../shared/store/useCartStore'
import { Button, Image, Table, TableContainer, Tag, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import SignatureCanvas from 'react-signature-canvas'

import { useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import QuantityButton from '@components/QuantityButton'
import ReceiptPdf from '@components/ReceiptPdf'
import useAppwrite from '@hooks/useAppwrite'
import { Models } from 'appwrite'

const Receipt = () => {
    const { cartProducts, removeProduct } = useCartStore()
    const [sign, setSign] = useState<SignatureCanvas>()
    const [signUrl, setSignUrl] = useState<string>()
    const { account } = useAppwrite()
    const [name, setName] = useState<string>()

    const [totalPrice, setTotalPrice] = useState<number>()

    const getTotalPrice = () => {
        let suma = 0

        cartProducts.forEach(p => {
            suma += (p.price * p.quantity)
        })

        setTotalPrice(suma)
        console.log(suma)
    }

    const tomarFoto = () => {
        const url = sign?.getTrimmedCanvas().toDataURL()
        setSignUrl(url)
    }

    const getName = async () => {
        const profile: Models.User<Models.Preferences> = await account.get()
        setName(profile.name)
    }

    useEffect(() => {
        getName()
        getTotalPrice()
    }, [])

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
                                        <QuantityButton product={product} />
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

            <SignatureCanvas penColor='green' backgroundColor='#eee'
                ref={data => setSign(data)}
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />

            <Button onClick={() => {
                sign?.clear()
            }}>Limpiar firma</Button>

            <Button onClick={tomarFoto}>Tomar foto</Button>

            {
                signUrl && <Image src={signUrl} />
            }

            {
                signUrl && (
                    <PDFDownloadLink document={
                        <ReceiptPdf totalPrice={totalPrice!}
                            profileName={name!} signUrl={signUrl} cartProducts={cartProducts} />
                    } >
                        hola
                    </PDFDownloadLink>
                )
            }
        </BaseLayout>
    )
}

export default Receipt
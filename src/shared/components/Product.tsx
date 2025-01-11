import { Box, Button, Heading, Image, Text, useEditable } from '@chakra-ui/react'
import { DummyProduct } from '../declarations/Dummyjson'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { useEffect } from 'react'

const Product = ({ product }: { product: DummyProduct }) => {
    const { addProduct } = useCartStore()


    const showProduct = (product) => {
        addProduct(product)
    }

    return (
        <>
            <Box w='300px' bgColor='#eee' borderRadius='20px' p='2em' display='flex' justifyContent='space-between' flexDir='column'>
                <Image alignSelf='center' src={product.thumbnail} alt={product.description} loading='lazy' width={{
                    base: 100, sm: 300
                }} />
                <Heading size={['sm', 'md']}>
                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                </Heading>
                <Text>$ {product.price}</Text>
                <Button onClick={() => showProduct(product)} >Agregar al carrito</Button>
            </Box>
        </>
    )
}

export default Product
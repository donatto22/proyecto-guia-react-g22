import { Box, Button, Heading, Image, Text } from '@chakra-ui/react'
import { DummyProduct } from '../declarations/Dummyjson'

const Product = ({ product }: { product: DummyProduct }) => {
    return (
        <Box w='300px' bgColor='#eee' borderRadius='20px' p='2em' display='flex' justifyContent='space-between' flexDir='column' gap='1em'>
            <Image src={product.thumbnail} alt={product.description} loading='lazy' />
            <Heading size='md'>{product.title}</Heading>
            <Text>$ {product.price}</Text>
            <Button>Agregar al carrito</Button>
        </Box>
    )
}

export default Product
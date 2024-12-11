import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import useFetch from '@hooks/useFetch'
import { DummyEndpoints, DummyProduct } from '../shared/declarations/Dummyjson'
import { Box, Heading, Image } from '@chakra-ui/react'

const SingleProduct = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<DummyProduct>()

    const { get } = useFetch(`${DummyEndpoints.PRODUCTS}/${id}`)

    async function getProduct() {
        const producto = await get()

        setProduct(producto)
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <Box>
            <Image src={product?.thumbnail} height='300px' />
            <Heading size='2xl'>{product?.title}</Heading>

            <br />
            <Link to='/products'>Volver a los productos</Link>
        </Box>
    )
}

export default SingleProduct
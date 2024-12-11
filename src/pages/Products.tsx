import { useEffect, useState } from 'react'
import useFetch from '../shared/hooks/useFetch'
import { DummyEndpoints, DummyProduct, DummyProducts } from '../shared/declarations/Dummyjson'
import Product from '../shared/components/Product'
import { Box, Heading, Image } from '@chakra-ui/react'
import BaseLayout from '@layouts/BaseLayout'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination } from 'swiper/modules'

import sale1 from '@images/sales/sale1.jpg'
import sale2 from '@images/sales/sale2.jpg'
import sale3 from '@images/sales/sale3.jpg'
import sale4 from '@images/sales/sale4.jpg'

import { database } from '../shared/lib/appwrite'
import { Appwrite } from '../shared/lib/env'

const SwiperImages = [sale1, sale2, sale3, sale4]

const Products = () => {
    const [products, setProducts] = useState<Array<DummyProduct>>()

    const { get } = useFetch(DummyEndpoints.PRODUCTS)

    const getProducts = async () => {
        const { products }: DummyProducts = await get()

        setProducts(products)
        console.log(products)
    }

    const getProductsFromAppwrite = () => {
        const appwriteProducts = database.listDocuments(Appwrite.databaseId, Appwrite.collections.products)

        console.log(appwriteProducts, 'appwriteProducts')
    }

    useEffect(() => {
        getProducts()
        getProductsFromAppwrite()
    }, [])

    return (
        <BaseLayout>
            <>
                <Box width='1000px' m='0 auto'>
                    <Swiper pagination={true} navigation={true}
                        modules={[Navigation, Pagination]}>
                        {
                            SwiperImages.map(image => (
                                <SwiperSlide key={image}>
                                    <Image pointerEvents='none' p='4em' src={image} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </Box>

                <Box w='65%' m='2em auto'>
                    <Heading size='lg'>Mis productos</Heading>
                    <hr />


                </Box>

                <Box display='flex' flexWrap='wrap' w='65%' m='0 auto' justifyContent='space-between' gap='3em'>
                    {
                        products && products.map(p => (
                            <Product key={p.id} product={p} />
                        ))
                    }
                </Box>
            </>
        </BaseLayout>
    )
}

export default Products
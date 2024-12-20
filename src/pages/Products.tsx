import { useContext, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import BaseLayout from '@layouts/BaseLayout'

import { Appwrite } from '../shared/lib/env'
import { PersonalProduct } from '../shared/declarations/Database'
import useAppwrite from '@hooks/useAppwrite'
import MyProducts from '@components/MyProducts'
import Carousel from '@components/Carousel'
import DummyProducts from '@components/DummyProducts'
import { UserContext } from '../shared/context/UserContext'

const Products = () => {
    const [appwriteProducts, setAppwriteProducts] = useState<Array<PersonalProduct>>([])
    const context = useContext(UserContext)

    // separando en trocitos
    const { fromDatabase } = useAppwrite()
    const productsCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.products)

    const getProductsFromAppwrite = async () => {
        const { documents } = await productsCollection.getDocuments()
        setAppwriteProducts(documents)
    }

    useEffect(() => {
        getProductsFromAppwrite()

        console.log(context.session)
    }, [])

    return (
        <BaseLayout>
            <>
                <Box id='fresa' width='1000px' m='0 auto'>
                    <Carousel />
                </Box>

                <MyProducts products={appwriteProducts} onRefresh={getProductsFromAppwrite} />

                <br />

                <Box display='flex' flexWrap='wrap' w='65%' m='0 auto' justifyContent='space-between' gap='3em'>
                    <DummyProducts />
                </Box>
            </>
        </BaseLayout>
    )
}

export default Products
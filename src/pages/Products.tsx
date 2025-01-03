import { useContext, useEffect, useState } from 'react'
import { Box, Button } from '@chakra-ui/react'
import BaseLayout from '@layouts/BaseLayout'

import { Appwrite } from '../shared/lib/env'
import { PersonalProduct } from '../shared/declarations/Database'
import useAppwrite from '@hooks/useAppwrite'
import Carousel from '@components/Carousel'
import DummyProducts from '@components/DummyProducts'
import { UserContext } from '../shared/context/UserContext'
import { Query } from 'appwrite'
import { useUserStore } from '../shared/store/useUserStore'
import { useCartStore } from '../shared/store/useCartStore'

const Products = () => {
    const [appwriteProducts, setAppwriteProducts] = useState<Array<PersonalProduct>>([])
    const context = useContext(UserContext)
    const { abc, newNumber } = useUserStore()

    const { cartProducts } = useCartStore()

    // separando en trocitos
    const { fromDatabase } = useAppwrite()
    const productsCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.products)

    const getProductsFromAppwrite = async () => {
        const { documents } = await productsCollection.getDocuments([
            Query.equal('ownerId', context?.session.userId)
        ])
        setAppwriteProducts(documents)
    }

    useEffect(() => {
        getProductsFromAppwrite()
    }, [])

    useEffect(() => {
        console.log(cartProducts)
    }, [cartProducts])

    return (
        <BaseLayout>
            <>
                {abc}
                <Button onClick={newNumber}>sumar 123</Button>
                <Box id='fresa' width='1000px' m='0 auto'>
                    <Carousel />
                </Box>

                {/* <MyProducts products={appwriteProducts} onRefresh={getProductsFromAppwrite} /> */}

                <br />

                <Box display='flex' flexWrap='wrap' w='65%' m='0 auto' justifyContent='space-between' gap='3em'>
                    <DummyProducts />
                </Box>
            </>
        </BaseLayout>
    )
}

export default Products
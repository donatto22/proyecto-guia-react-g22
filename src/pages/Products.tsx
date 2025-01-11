import { useEffect } from 'react'
import { Box, Button } from '@chakra-ui/react'
import BaseLayout from '@layouts/BaseLayout'

import Carousel from '@components/Carousel'
import DummyProducts from '@components/DummyProducts'
import { useUserStore } from '../shared/store/useUserStore'
import { useCartStore } from '../shared/store/useCartStore'

const Products = () => {
    const { abc, newNumber } = useUserStore()

    const { cartProducts } = useCartStore()

    useEffect(() => {
        console.log(cartProducts)
    }, [cartProducts])

    return (
        <BaseLayout>
            <>
                {abc}
                <Button onClick={newNumber}>sumar 123</Button>
                <Box id='fresa' width={[300, 450, 700, 900]} m={['0 auto', '0 auto', '0 auto']}>
                    <Carousel />
                </Box>

                <br />

                <Box justifyContent='center' display='flex' flexWrap='wrap' w={['80%', '90%']} m='0 auto' gap='2em'>
                    <DummyProducts />
                </Box>
            </>
        </BaseLayout>
    )
}

export default Products
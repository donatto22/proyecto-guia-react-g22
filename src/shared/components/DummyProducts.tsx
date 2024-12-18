import { useEffect, useState } from 'react'
import Product from './Product'
import { DummyEndpoints, DummyProduct, DummyProducts as DP } from '../declarations/Dummyjson'
import useFetch from '@hooks/useFetch'

const DummyProducts = () => {
    const [products, setProducts] = useState<Array<DummyProduct>>()
    const { get } = useFetch(DummyEndpoints.PRODUCTS)

    const getProducts = async () => {
        const { products }: DP = await get()

        setProducts(products)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            {
                products && products.map(p => (
                    <Product key={p.id} product={p} />
                ))
            }
        </>
    )
}

export default DummyProducts
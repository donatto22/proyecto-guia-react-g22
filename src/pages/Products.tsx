import { useEffect, useState } from 'react'
import useFetch from '../shared/hooks/useFetch'
import { DummyEndpoints, DummyProduct, DummyProducts } from '../shared/declarations/Dummyjson'

const Products = () => {
    const [products, setProducts] = useState<Array<DummyProduct>>()

    const { get } = useFetch(DummyEndpoints.PRODUCTS)

    const getProducts = async () => {
        const { products }: DummyProducts = await get()

        setProducts(products)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            {
                products && products.map(p => (
                    <div key={p.id}> {p.title} </div>
                ))
            }
        </div>
    )
}

export default Products
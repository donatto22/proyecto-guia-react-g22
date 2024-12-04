import { DummyProduct } from '../declarations/Dummyjson'

const Product = ({ product }: { product: DummyProduct }) => {
    return (
        <div>
            <img src={product.thumbnail} alt={product.description} loading='lazy' />
            <h3>{product.title}</h3>
            <b>$ {product.price}</b>
            <hr />
        </div>
    )
}

export default Product
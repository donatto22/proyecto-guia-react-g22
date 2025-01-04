import { Button, HStack, Text } from '@chakra-ui/react'
import { FiMinus } from 'react-icons/fi'
import { IoMdAdd } from 'react-icons/io'
import { useCartStore } from '../store/useCartStore'
import { DummyProduct } from '../declarations/Dummyjson'

const QuantityButton = ({ product }: {
    product: DummyProduct
}) => {
    const { addOneProduct, removeOneProduct } = useCartStore()

    return (
        <HStack justifyContent='end'>
            <Button onClick={() => addOneProduct(product.id)} p={0} m={0}>
                <IoMdAdd />
            </Button>
            <Text>{product.quantity}</Text>
            <Button p={0} m={0} onClick={() => removeOneProduct(product.id)}>
                <FiMinus />
            </Button>
        </HStack>
    )
}

export default QuantityButton
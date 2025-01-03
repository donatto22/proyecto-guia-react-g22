import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DummyProduct } from '../declarations/Dummyjson'

type CartProducts = {
    cartProducts: DummyProduct[]
    addProduct: (product: DummyProduct) => void
}

export const useCartStore = create(persist<CartProducts>((set) => ({
    cartProducts: [],
    addProduct: (product) => {
        set((state) => ({
            cartProducts: [...state.cartProducts, {
                ...product, quantity: 1
            }]
        }))
    },

    removeProduct: (productId) => {
        set((state) => ({
            cartProducts
        }))
    }
}), {
    name: 'cartProducts'
}))
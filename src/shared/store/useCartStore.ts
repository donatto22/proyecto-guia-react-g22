import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DummyProduct } from '../declarations/Dummyjson'

type CartProducts = {
    cartProducts: DummyProduct[]
    addProduct: (product: DummyProduct) => void
    removeProduct: (productId: number) => void
    addOneProduct: (productId: number) => void
    removeOneProduct: (productId: number) => void
}

export const useCartStore = create(persist<CartProducts>((set) => ({
    cartProducts: [],
    addProduct: (product) => {
        set((state) => {
            const productoExistente = state.cartProducts.find((cartP) => cartP.id == product.id)

            if (productoExistente) {
                return {
                    cartProducts: state.cartProducts.map((cartP) =>
                        cartP.id == product.id ? { ...cartP, quantity: cartP.quantity + 1 } : cartP
                    )
                }
            } else {
                return {
                    cartProducts: [...state.cartProducts, {
                        ...product, quantity: 1
                    }]
                }
            }
        })
    },

    removeProduct: (productId) => {
        set((state) => ({
            cartProducts: state.cartProducts.filter((product) => product.id !== productId)
        }))
    },

    addOneProduct: (productId) => {
        set((state) => ({
            cartProducts: state.cartProducts.map((cartP) =>
                cartP.id == productId ? { ...cartP, quantity: cartP.quantity + 1 } : cartP
            )
        }))
    },

    removeOneProduct: (productId) => {
        set((state) => ({
            cartProducts: state.cartProducts.map((cartP) =>
                cartP.id == productId ? { ...cartP, quantity: cartP.quantity - 1 } : cartP
            )
        }))
    }
}), {
    name: 'cartProducts'
}))
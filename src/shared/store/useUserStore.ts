import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type bears = {
    abc: number
    newNumber: () => void
}

export const useUserStore = create(persist<bears>((set) => ({
    abc: 123,
    newNumber: () => {
        set((state) => ({
            abc: state.abc + 123
        }))
    }
}), {
    name: 'abc'
}))
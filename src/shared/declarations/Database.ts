import { Models } from 'appwrite'

export interface PersonalProduct extends Models.Document {
    name: string
    description: string
    price: number
    active: boolean
    imageId: string
}

export type MyProducts = {
    total: number
    documents: [PersonalProduct]
}
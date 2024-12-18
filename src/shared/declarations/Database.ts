export type PersonalProduct = {
    $id: string
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
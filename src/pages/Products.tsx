import { useEffect, useRef, useState } from 'react'
import useFetch from '../shared/hooks/useFetch'
import { DummyEndpoints, DummyProduct, DummyProducts } from '../shared/declarations/Dummyjson'
import Product from '../shared/components/Product'
import { Box, Button, FormLabel, Heading, HStack, Image, Input } from '@chakra-ui/react'
import BaseLayout from '@layouts/BaseLayout'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination } from 'swiper/modules'

import sale1 from '@images/sales/sale1.jpg'
import sale2 from '@images/sales/sale2.jpg'
import sale3 from '@images/sales/sale3.jpg'
import sale4 from '@images/sales/sale4.jpg'

import { ID } from '../shared/lib/appwrite'
import { Appwrite } from '../shared/lib/env'
import { toast } from 'sonner'
import AppwriteProduct from '@components/AppwriteProduct'
import { PersonalProduct } from 'src/shared/declarations/Database'
import useAppwrite from '@hooks/useAppwrite'
import { getFormEntries } from '../shared/util/getFormEntries'

const SwiperImages = [sale1, sale2, sale3, sale4]

const Products = () => {
    const [products, setProducts] = useState<Array<DummyProduct>>()
    const [appwriteProducts, setAppwriteProducts] = useState<Array<PersonalProduct>>()

    const formulario = useRef(null)
    const { get } = useFetch(DummyEndpoints.PRODUCTS)

    // separando en trocitos
    const { fromDatabase, fromStorage } = useAppwrite()
    const productsCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.products)
    const photoBucket = fromStorage().bucket(Appwrite.buckets.pictures)

    const getProducts = async () => {
        const { products }: DummyProducts = await get()

        setProducts(products)
    }

    const getProductsFromAppwrite = async () => {
        const { documents } = await productsCollection.getDocuments()
        setAppwriteProducts(documents)
    }

    const uploadPhoto = async (e) => {
        e.preventDefault()

        if (formulario.current) {
            const formObject = getFormEntries(formulario.current)

            // se sube la imagen
            const imageId = ID.unique()
            await photoBucket.createFile(imageId, formObject.image)

            // obtengo el url que va en el thumbnail
            const { previewUrl } = await photoBucket.getFile(imageId)

            const product = {
                name: formObject.name,
                thumbnail: previewUrl,
                description: formObject.description,
                price: Number(formObject.price),
                active: formObject.active ? true : false
            }

            await productsCollection.createDocument(product).then(() => {
                toast.success('Producto creado')
                formulario.current.reset()
                getProductsFromAppwrite()
            }).catch(() => {
                toast.error('Producto no se llegó a subir')
            })
        }

    }

    const deleteAppwriteProduct = async (id: string) => {
        await productsCollection.deleteDocument(id).then(() => {
            toast.success('Gatito eliminado')
            getProductsFromAppwrite()
        }).catch(() => {
            toast.error('No se eliminó el producto')
        })
    }

    useEffect(() => {
        getProducts()
        getProductsFromAppwrite()
    }, [])

    return (
        <BaseLayout>
            <>
                <Box id='fresa' width='1000px' m='0 auto'>
                    <Swiper pagination={true} navigation={true}
                        modules={[Navigation, Pagination]}>
                        {
                            SwiperImages.map(image => (
                                <SwiperSlide key={image}>
                                    <Image pointerEvents='none' p='4em' src={image} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </Box>

                <Box w='65%' m='2em auto'>
                    <HStack justifyContent='space-between' mb={4}>
                        <Heading size='lg'>Mis productos</Heading>
                        <Button>Agregar</Button>
                    </HStack>
                    <hr />

                    <Box gap='1em' display='flex' overflowX='scroll' mt={4} pb={4}>
                        {
                            appwriteProducts?.map(product => (
                                <AppwriteProduct key={product.name} product={product} deleteAppwriteProduct={deleteAppwriteProduct} />
                            ))
                        }
                    </Box>
                </Box>

                <br />

                <Box as='form' w='65%' m='2em auto' ref={formulario}>
                    <div>
                        <FormLabel htmlFor='image'>Imagen</FormLabel>
                        <Input w='260px' id='image' name='image' type="file" />
                    </div>

                    <div>
                        <FormLabel htmlFor='name'>namen</FormLabel>
                        <Input w='260px' id='name' name='name' type="text" />
                    </div>

                    <div>
                        <FormLabel htmlFor='price'>pricen</FormLabel>
                        <Input w='260px' id='price' name='price' type="number" />
                    </div>

                    <div>
                        <FormLabel htmlFor='description'>descriptionn</FormLabel>
                        <Input w='260px' id='description' name='description' type="text" />
                    </div>

                    <div>
                        <label htmlFor="active">active</label>
                        <input type="checkbox" name="active" id="active" />
                    </div>

                    <button onClick={uploadPhoto}> Subir imagen </button>
                </Box>

                <Box display='flex' flexWrap='wrap' w='65%' m='0 auto' justifyContent='space-between' gap='3em'>
                    {
                        products && products.map(p => (
                            <Product key={p.id} product={p} />
                        ))
                    }
                </Box>
            </>
        </BaseLayout>
    )
}

export default Products
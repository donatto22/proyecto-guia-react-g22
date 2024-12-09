import { useEffect, useRef, useState } from 'react'
import useFetch from '../shared/hooks/useFetch'
import { DummyEndpoints, DummyProduct, DummyProducts } from '../shared/declarations/Dummyjson'
import Product from '../shared/components/Product'
import { Box, Button, FormLabel, Heading, Image, Input, Text } from '@chakra-ui/react'
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

import { database, ID, storage } from '../shared/lib/appwrite'
import { Appwrite } from '../shared/lib/env'
import { toast } from 'sonner'

const SwiperImages = [sale1, sale2, sale3, sale4]

const Products = () => {
    const [products, setProducts] = useState<Array<DummyProduct>>()
    const [catPhotoUrl, setCatPhotoUrl] = useState<string>()
    const [appwriteProducts, setAppwriteProducts] = useState<Array<object>>()

    const formulario = useRef(null)

    const { get } = useFetch(DummyEndpoints.PRODUCTS)

    const getProducts = async () => {
        const { products }: DummyProducts = await get()

        setProducts(products)
    }

    const getProductsFromAppwrite = async () => {
        const { documents } = await database.listDocuments(Appwrite.databaseId, Appwrite.collections.products)
        setAppwriteProducts(documents)
    }

    const getCatPhoto = () => {
        // getFile retorna un objeto con todos los datos del archivo
        // getFileDownload retorna el url del archivo y además lo descarga
        // getFilePreview retorna la url del archivo para visualizarlo, no lo descarga
        // getFileView retorna la url del archivo para visualizarlo, no lo descarga
        const url = storage.getFileView(Appwrite.buckets.pictures, '675a2d2b0031abed8498')
        setCatPhotoUrl(url)

        console.log(catPhotoUrl, 'getCatPhoto')
    }

    const deletePhoto = () => {
        storage.deleteFile(Appwrite.buckets.pictures, '675a2d2b0031abed8498')
        setCatPhotoUrl('')
    }

    const uploadPhoto = async (e) => {
        e.preventDefault()

        if (formulario.current) {
            const form = new FormData(formulario.current)
            const formObject = Object.fromEntries(form.entries())

            console.log(formObject)

            // se sube la imagen
            const imageId = ID.unique()
            await storage.createFile(Appwrite.buckets.pictures, imageId, formObject.image)

            // obtengo el url que va en el thumbnail
            const url: string = storage.getFilePreview(Appwrite.buckets.pictures, imageId)

            const product = {
                name: formObject.name,
                thumbnail: url,
                description: formObject.description,
                price: Number(formObject.price),
                active: formObject.active ? true : false
            }

            database.createDocument(Appwrite.databaseId, Appwrite.collections.products, ID.unique(), product)
                .then(() => {
                    toast.success('Producto creado')
                    formulario.current.reset()
                    getProductsFromAppwrite()
                }).catch(() => {
                    toast.error('Producto no se llegó a subir')
                })
        }

    }

    const deleteAppwriteProduct = async (id) => {
        await database.deleteDocument(Appwrite.databaseId, Appwrite.collections.products, id).then(() => {
            toast.success('Gatito eliminado')
            getProductsFromAppwrite()
        }).catch(() => {
            toast.error('No se eliminó el producto')
        })
    }

    useEffect(() => {
        getProducts()
        getProductsFromAppwrite()
        getCatPhoto()
    }, [])

    return (
        <BaseLayout>
            <>
                <Box width='1000px' m='0 auto'>
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
                    <Heading size='lg'>Mis productos</Heading>
                    <hr />

                    {
                        appwriteProducts?.map(product => (
                            <Box key={product.name}>
                                <Image src={product.thumbnail} width='100px' />
                                <Text>{product.name}</Text>
                                <Button onClick={() => deleteAppwriteProduct(product.$id)}>Eliminar</Button>
                            </Box>
                        ))
                    }
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

                {
                    catPhotoUrl != undefined &&
                    (
                        <>
                            <Image src={catPhotoUrl} alt='imagen' w='500px' m='0 auto' borderRadius='20px' />
                            <Button onClick={deletePhoto}>Eliminar gatito</Button>
                        </>
                    )
                }

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
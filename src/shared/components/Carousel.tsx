import { Image } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination } from 'swiper/modules'

import sale1 from '@images/sales/sale1.jpg'
import sale2 from '@images/sales/sale2.jpg'
import sale3 from '@images/sales/sale3.jpg'
import sale4 from '@images/sales/sale4.jpg'


const SwiperImages = [sale1, sale2, sale3, sale4]

const Carousel = () => {
    return (
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
    )
}

export default Carousel
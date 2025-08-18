import { useState } from 'react';

import BannerInfo from './BannerInfo';
import BannerButtons from './BannerButtons';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination } from 'swiper/modules';

import type { Movie } from '@/types/Movie';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface BannerImageProps {
    listMovie: Movie[];
}

function BannerImage({ listMovie }: BannerImageProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper relative !pb-5 overflow-visible 712:!pb-10 "
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {listMovie.map((item) => (
                    <SwiperSlide key={item.id} className="relative">
                        <div>
                            <div className="absolute inset-0 -bottom-10 bg-gradient-to-t from-[#171A21] via-[#171A21]/70 to-transparent"></div>

                            <LazyLoadImage
                                alt={`Filme ${item.title}`}
                                src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                                placeholderSrc={`https://image.tmdb.org/t/p/w92/${item?.backdrop_path}`}
                                effect="blur"
                                visibleByDefault={true}
                                threshold={300}
                                className="375:rounded-2xl"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <BannerInfo listMovie={listMovie} index={activeIndex} />
            <BannerButtons />
        </>
    );
}

export default BannerImage;

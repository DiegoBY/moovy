import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { api_tmdb } from '../../services/api';
import type { Movie } from '@/types/Movie';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

type TrendingListProps = {
    type: 'movie' | 'tv';
    titleSection: string;
};

function TrendingList({ type, titleSection }: TrendingListProps) {
    const [listTrending, setListTrending] = useState<Movie[]>([]);
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const [slidesPerView, setSlidesPerView] = useState(2);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const response = await api_tmdb.get(`trending/${type}/day`, {
                    params: { api_key: apiKey, language: 'pt-BR', page: 1 },
                });
                setListTrending(response.data.results);
            } catch (error) {
                console.error('Erro ao carregar os filmes:', error);
            }
        };
        loadMovies();
    }, [type]);

    // Ajusta slidesPerView conforme tamanho da tela
    const handleResize = () => {
        const width = window.innerWidth;
        if (width >= 1024) setSlidesPerView(3);
        else if (width >= 768) setSlidesPerView(2);
        else setSlidesPerView(2);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="my-10 px-3">
            <p className="text-[#4743E0] text-xl font-bold tracking-widest">
                {titleSection} <span className="text-[#fff]">em alta</span>
            </p>

            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                slidesPerView={slidesPerView}
                spaceBetween={20}
                className="mt-10"
            >
                {listTrending.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="w-40 h-auto">
                            <img
                                src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                                alt={`Filme ${item.title}`}
                                className="rounded-2xl"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex gap-2 mt-5 justify-end">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className={` text-white rounded-lg w-12 h-12 flex justify-center items-center transition ${
                        activeIndex === 0
                            ? 'bg-[#464569] cursor-default'
                            : 'bg-[#4743E0] cursor-pointer'
                    }`}
                >
                    <Icon icon="tabler:chevron-left" className="w-7 h-7" />
                </button>

                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className={`text-white rounded-lg w-12 h-12 flex justify-center items-center transition ${
                        activeIndex >= listTrending.length - slidesPerView
                            ? 'bg-[#464569] cursor-default'
                            : 'bg-[#4743E0] cursor-pointer'
                    }`}
                >
                    <Icon
                        icon="tabler:chevron-left"
                        className="w-7 h-7 rotate-180"
                    />
                </button>
            </div>
        </section>
    );
}

export default TrendingList;

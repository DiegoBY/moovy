import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import SectionLoader from '../SectionLoader/SectionLoader';

import { api_tmdb } from '../../services/api';
import type { Movie } from '@/types/Movie';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

type TrendingListProps = {
    type?: 'movie' | 'tv';
    titleSection: string;
};

function TrendingList({ type, titleSection }: TrendingListProps) {
    const [listTrending, setListTrending] = useState<Movie[]>([]);
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const [slidesPerView, setSlidesPerView] = useState(2);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const response = await api_tmdb.get(`trending/${type}/day`, {
                    params: { api_key: apiKey, language: 'pt-BR', page: 1 },
                });
                let results: Movie[] = Array.from(response.data.results).map(
                    (item: any) => ({
                        id: item.id,
                        title: item.title || item.name,
                        overview: item.overview,
                        backdrop_path: item.backdrop_path,
                        poster_path: item.poster_path,
                        genre_ids: item.genre_ids,
                        release_date: item.release_date,
                    })
                );

                setListTrending(results);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        loadMovies();
    }, [type]);

    // Ajusta slidesPerView conforme tamanho da tela
    const handleResize = () => {
        const width = window.innerWidth;

        if (width >= 712 && width <= 1023) {
            setSlidesPerView(3);
        } else if (width >= 1024 && width <= 1439) {
            setSlidesPerView(4);
        } else if (width >= 1440 && width <= 1919) {
            setSlidesPerView(5);
        } else if (width >= 1920) {
            setSlidesPerView(6);
        } else {
            setSlidesPerView(2);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Local Storage
    const [myFavorites, setMyFavorites] = useState<Number[]>([]);

    useEffect(() => {
        const myList = localStorage.getItem('@moovy');
        let savedMoviesOrTv = myList ? JSON.parse(myList) : [];

        if (savedMoviesOrTv) {
            savedMoviesOrTv.map((item: Movie) => {
                setMyFavorites((prev) => [...prev, item.id]);
            });
        }
    }, []);

    const saveMovieTv = (item: Movie) => {
        console.log(item);

        const myList = localStorage.getItem('@moovy');
        let savedMoviesOrTv = myList ? JSON.parse(myList) : [];

        const hasMovieOrTv = savedMoviesOrTv.some(
            (movieTv: any) => movieTv.id === item.id
        );

        if (hasMovieOrTv) {
            alert('JA TEM ESSE FILME');
            return;
        }

        setMyFavorites((prev) => [...prev, item.id]);

        console.log(savedMoviesOrTv);

        savedMoviesOrTv.push(item);
        localStorage.setItem('@moovy', JSON.stringify(savedMoviesOrTv));
        alert('FILME SALVO');
    };

    return (
        <>
            {loading ? (
                <SectionLoader />
            ) : (
                <section className="my-10 px-3 712:px-10 lg:px-20 xl:px-50 2xl:px-70 1920:px-100">
                    <p className="text-[#4743E0] text-xl font-bold tracking-widest 712:text-2xl">
                        {titleSection}{' '}
                        <span className="text-[#fff]">em alta</span>
                    </p>

                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) =>
                            setActiveIndex(swiper.activeIndex)
                        }
                        slidesPerView={slidesPerView}
                        spaceBetween={20}
                        className="mt-10"
                    >
                        {listTrending.map((item) => (
                            <SwiperSlide
                                key={item.id}
                                className="relative group bg-[#1a1e27] rounded-2xl"
                            >
                                <div
                                    className="w-10 h-10 flex justify-center items-center absolute right-2 top-2 bg-[#171A21] z-[220] rounded-xl"
                                    onClick={() => saveMovieTv(item)}
                                >
                                    <Icon
                                        icon="iconamoon:heart-thin"
                                        className={`${
                                            myFavorites.includes(item.id)
                                                ? 'text-[#f00]'
                                                : 'text-[#fff]'
                                        }  cursor-pointer w-8 h-8 712:w-12 712:h-12 `}
                                    />
                                </div>

                                <Link to={`/${type}/${item.id}`}>
                                    <div className="absolute inset-0  bg-[#171A21]/70 z-[200] 375:rounded-2xl opacity-0 transition-all duration-200 ease-in group-hover:opacity-100">
                                        <Icon
                                            icon="gravity-ui:play-fill"
                                            className="w-10 h-10 absolute left-[50%] top-[50%] -translate-[50%] z-[200] text-[#fff]"
                                        />
                                    </div>
                                    <LazyLoadImage
                                        alt={`${titleSection} ${item.title}`}
                                        src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                                        effect="blur"
                                        threshold={300}
                                        className="375:rounded-2xl"
                                    />
                                </Link>
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
                            <Icon
                                icon="tabler:chevron-left"
                                className="w-7 h-7"
                            />
                        </button>

                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className={`text-white rounded-lg w-12 h-12 flex justify-center items-center transition ${
                                activeIndex >=
                                listTrending.length - slidesPerView
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
            )}
        </>
    );
}

export default TrendingList;

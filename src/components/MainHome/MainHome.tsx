import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { api_tmdb } from '../../services/api';
import { useNavigate } from 'react-router-dom';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { genreMap } from '../../utils/genreMap';
import WaveLoad from '../WaveLoad/WaveLoad';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

interface Movie {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    genre_ids: number[];
}

function MainHome() {
    const navigate = useNavigate();

    const options = {
        containScroll: false,
        loop: true,
        align: 'start',
    } satisfies Parameters<typeof useEmblaCarousel>[0];

    const autoplayOptions = { delay: 5000, stopOnInteraction: false };
    const autoplay = Autoplay(autoplayOptions);
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay]);

    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadMovies = async () => {
            setIsLoading(true);

            try {
                const response = await api_tmdb.get('movie/now_playing', {
                    params: {
                        api_key: apiKey,
                        language: 'pt-BR',
                        page: 1,
                    },
                });

                const top5 = response.data.results.slice(0, 5);
                setMovies(top5);
            } catch (error) {
                console.error('Erro ao carregar os filmes:', error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        };

        loadMovies();
    }, []);

    useEffect((): (() => void) | undefined => {
        if (!emblaApi) return;

        const onSelect = () => {
            const indexAtivo = emblaApi.selectedScrollSnap();
            setSelectedIndex(indexAtivo);

            const movie = movies[indexAtivo];

            if (movie) {
                setSelectedMovie(movie);
            }
        };

        emblaApi.on('select', onSelect);
        onSelect();

        return () => emblaApi.off('select', onSelect);
    }, [emblaApi, movies]);

    const handleMovie = () => {
        if (movies.length > 0) {
            navigate(`/movie/${selectedMovie?.id}`);
        }
    };

    return (
        <>
            <section className="mt-20 lg:px-28 xl:px-42 2xl:px-72">
                {isLoading && <WaveLoad text="Carregando... " />}

                <div
                    className={`${
                        isLoading ? 'hidden pointer-events-none' : 'flex'
                    } w-full h-fit pb-8 flex-col relative transition-opacity duration-300`}
                >
                    {/* Banner Principal */}
                    <div className="embla max-w-3xl mx-auto h-fit w-full space-x-4 lg:max-w-[100%]">
                        <div className="absolute top-0 left-0 right-0 w-full h-5 bg-[#228EE5] blur-lg pointer-events-none lg:hidden"></div>
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className=" flex touch-pan-y touch-pinch-zoom -ml-4">
                                {movies.map((item) => (
                                    <div
                                        key={item.id}
                                        className="translate-z-0 flex-[0_0_100%] min-w-0 pl-4 relative "
                                    >
                                        <div className="relative ">
                                            <img
                                                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                                                alt={`Filme ${item.title}`}
                                                loading="lazy"
                                                className="object-cover brightness-110 w-auto lg:w-full lg:h-[25rem] lg:rounded-b-2xl 1260:h-[30rem] 2xl:h-[35rem]"
                                            />

                                            <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-[#030A1B]/10 via-[#030A1B]/20 to-[#030A1B] lg:bg-[#030A1B]/10"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="px-4 w-full mt-5 flex flex-col gap-y-4 712:absolute 712:top-50 712:-translate-y-[50] lg:top-40 1260:top-50 2xl:top-65">
                        <p className="text-2xl font-bold line-clamp-1 w-fit 712:text-4xl">
                            {selectedMovie?.title}
                        </p>

                        <div className="flex items-center gap-x-4 w-fit">
                            {selectedMovie?.genre_ids.map((id) => (
                                <p
                                    key={id}
                                    className="text-sm/relaxed font-light opacity-70 712:text-base/relaxed"
                                >
                                    {genreMap[id]}
                                </p>
                            ))}
                        </div>

                        <p className="text-sm/relaxed font-light opacity-70 line-clamp-3 w-full lg:w-[60%]">
                            {selectedMovie?.overview}
                        </p>
                        <div className="flex gap-x-6 w-fit">
                            <button
                                className="cursor-pointer transition-all duration-400 ease-linear flex items-center gap-x-2 bg-transparent border border-[#228ee5] px-4 py-2 rounded-2xl text-sm tracking-wider 390:text-base hover:bg-[#fff] hover:text-[#228ee5] hover:font-bold hover:border-[#fff]"
                                onClick={() => handleMovie()}
                            >
                                Assitir Filme
                                <Icon
                                    icon="ph:arrow-right-light"
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MainHome;

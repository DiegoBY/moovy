import { useState, useEffect } from 'react';

import { useCallback } from 'react';
import { api_tmdb } from '../../services/api';
import { genreMap } from '../../utils/genreMap';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '@/types/Movie';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import WaveLoad from '../WaveLoad/WaveLoad';
import MovieCarousel from '../MainHome/MovieCarousel';
import MovieCardInfos from '../MainHome/MovieCardInfos';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

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

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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
                setIsLoading(false);
            }
        };

        loadMovies();
    }, []);

    useEffect((): (() => void) | undefined => {
        if (!emblaApi) return;

        const onSelect = () => {
            const indexAtivo = emblaApi.selectedScrollSnap();

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
            <section
                className=" mt-20 712:mt-0 " // mt-20 lg:px-28 xl:px-42 2xl:px-72
                role="region"
                aria-label="Filmes recomendados"
            >
                {isLoading && <WaveLoad text="Carregando... " />}

                <div
                    className={`${
                        isLoading ? 'hidden pointer-events-none' : 'flex'
                    } w-full h-fit pb-8 flex-col relative transition-opacity duration-300`}
                >
                    {/* Banner Principal */}

                    <div className="hidden 1164:flex justify-center items-center absolute bottom-0 left-[50%] -translate-x-[50%]">
                        <div className="w-6 h-10 border-2 border-[#228EE5] rounded-full flex justify-center items-start relative">
                            <div className="w-1 h-1 bg-[#228EE5] rounded-full animate-scroll-bounce absolute top-2" />
                        </div>
                    </div>

                    <MovieCarousel
                        movies={movies}
                        emblaRef={emblaRef}
                        scrollPrev={scrollPrev}
                        scrollNext={scrollNext}
                    />
                    <MovieCardInfos
                        selectedMovie={selectedMovie}
                        genreMap={genreMap}
                        handleMovie={handleMovie}
                        scrollNext={scrollNext}
                        scrollPrev={scrollPrev}
                    />
                </div>
            </section>
        </>
    );
}

export default MainHome;

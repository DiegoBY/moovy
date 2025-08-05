import { useState, useEffect } from 'react';
import type { Movie } from '@/types/Movie';
import { api_tmdb } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import RecommendationCard from './../Recommendations/RecommendationCard';
import NextOrPrevCarousel from './../MainHome/NextOrPrevCarousel';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

function Recommendations() {
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const options = {
        containScroll: false,
        loop: false,
        align: 'start',
    } satisfies Parameters<typeof useEmblaCarousel>[0];

    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    void emblaApi;

    const [movies, setMovies] = useState<Movie[]>([]);

    const navigate = useNavigate();

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const updateScrollButtons = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        const loadMovies = async () => {
            const response = await api_tmdb.get('movie/popular', {
                params: {
                    api_key: apiKey,
                    language: 'pt-BR',
                    page: 1,
                },
            });

            const top5 = response.data.results;
            setMovies(top5);
        };

        loadMovies();
    }, []);

    const handleMovie = (index: number) => {
        if (movies.length > 0) {
            navigate(`/movie/${movies[index].id}`);
        }
    };

    useEffect(() => {
        if (!emblaApi) return;

        updateScrollButtons();
        emblaApi.on('select', updateScrollButtons);
        emblaApi.on('reInit', updateScrollButtons);

        return () => {
            emblaApi.off('select', updateScrollButtons);
            emblaApi.off('reInit', updateScrollButtons);
        };
    }, [emblaApi, updateScrollButtons]);

    return (
        <>
            <section
                className="px-4 712:mt-10 lg:px-28 xl:px-42 1164:mt-20 2xl:px-72"
                role="region"
                aria-label="Filmes recomendados"
            >
                <div>
                    <p className="text-xl font-bold">Filmes recomendados</p>
                </div>

                <div className="mt-5">
                    <div className="embla max-w-3xl mx-auto h-fit w-full space-x-4 lg:mx-0 lg:max-w-full">
                        <div
                            className="embla_viewport overflow-hidden"
                            ref={emblaRef}
                        >
                            <div className="embla_container flex touch-pan-y touch-pinch-zoom -ml-4">
                                {movies.map((item, index) => (
                                    <RecommendationCard
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        handleMovie={handleMovie}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="mb-10">
                <NextOrPrevCarousel
                    scrollPrev={scrollPrev}
                    scrollNext={scrollNext}
                    canScrollPrev={canScrollPrev}
                    canScrollNext={canScrollNext}
                />
            </div>
        </>
    );
}

export default Recommendations;

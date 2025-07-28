import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { api_tmdb } from '../../services/api';
import useEmblaCarousel from 'embla-carousel-react';

import { useNavigate } from 'react-router-dom';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

function Recommendations() {
    const options = {
        containScroll: false,
        loop: false,
        align: 'start',
    } satisfies Parameters<typeof useEmblaCarousel>[0];

    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    void emblaApi;

    const [movies, setMovies] = useState<Movie[]>([]);

    const navigate = useNavigate();

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
            console.log(`/movie/${movies[index].id}`);

            navigate(`/movie/${movies[index].id}`);
        }
    };

    return (
        <>
            <section className="px-4 mb-40 712:mt-20 lg:px-28 xl:px-42 2xl:px-72">
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
                                    <div
                                        key={item.id}
                                        className="cursor-pointer group transition-all duration-300 ease-linear translate-z-0 flex-[0_0_55%] min-w-0 pl-4 relative 712:flex-[0_0_30%] lg:flex-[0_0_25%] 1164:flex-[0_0_15%] xl:flex-[0_0_20%] 2xl:flex-[0_0_15%] "
                                        onClick={() => handleMovie(index)}
                                    >
                                        <div className="relative">
                                            <img
                                                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                                                alt={`Filme ${item.title}`}
                                                className="transition-all duration-300 ease-linear object-cover brightness-110 rounded-2xl group-hover:scale-90"
                                            />

                                            <div className="w-10 h-10 flex justify-center items-center rounded-lg bg-[#030A1B] absolute left-2 top-2 z-20">
                                                <Icon
                                                    icon="material-symbols-light:favorite"
                                                    className="w-6 h-6 text-[#228EE5]"
                                                />
                                            </div>

                                            <div className="transition-all duration-300 ease-linear hidden lg:flex opacity-0 justify-center items-center absolute inset-0 bg-transparent bg-clip-padding backdrop-filter backdrop-blur-xs group-hover:opacity-100">
                                                <div className=" w-14 h-14 bg-[#228EE5] rounded-full flex justify-center items-center">
                                                    <Icon
                                                        icon="si:play-fill"
                                                        className="w-6 h-6 text-[#fff]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Recommendations;

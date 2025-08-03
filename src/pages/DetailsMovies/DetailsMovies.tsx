import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { api_tmdb } from '../../services/api';

import { Icon } from '@iconify/react';
import ReactPlayer from 'react-player';
import NowPlaying from '../../components/NowPlaying/NowPlaying';
import WaveLoad from '../../components/WaveLoad/WaveLoad';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

interface MovieTrailers {
    id: number;
    name: string;
    key: string;
    type: string;
}

interface GenreMovie {
    id: number;
    name: string;
}

function DetailsMovies() {
    const { id } = useParams();

    // API data movies
    const [imgMovie, setImgMovie] = useState<string>('');
    const [isLoadingMovieData, setIsLoadingMovieData] = useState<boolean>(true);

    const [titleMovie, setTitleMovie] = useState<string>('');
    const [overviewMovie, setOverviewMovie] = useState<string>('');
    const [voteAverageMovie, setVoteAverageMovie] = useState<string>('');
    const [dateMovie, setDateMovie] = useState<string>('');
    const [timeMovie, setTimeMovie] = useState<string>('');

    const [genreMovie, setGenreMovie] = useState<GenreMovie[]>([]);

    useEffect(() => {
        const loadMovies = async () => {
            setIsLoadingMovieData(true);

            try {
                const response = await api_tmdb.get(`movie/${id}`, {
                    params: {
                        api_key: apiKey,
                        language: 'pt-BR',
                        page: 1,
                    },
                });

                console.log(response.data);

                // Pegando os dados da API para renderizar
                setImgMovie(response.data.backdrop_path);
                setTitleMovie(response.data.title);
                setOverviewMovie(response.data.overview);
                setVoteAverageMovie(response.data.vote_average.toFixed(1));
                setDateMovie(response.data.release_date.slice(0, 4));

                // Formatando os Minutos do Filme
                const hoursMovie = Math.floor(response.data.runtime / 60);
                const minutesMovie = response.data.runtime % 60;
                setTimeMovie(`${hoursMovie}h ${minutesMovie}min`);

                // Pegando os generos do filme
                if (response.data.genres.length >= 3) {
                    const limitedGenres = response.data.genres.slice(0, 3);
                    setGenreMovie(limitedGenres);
                } else {
                    setGenreMovie(response.data.genres);
                }
            } catch (error) {
                console.log('Obteve um erro da imagem: ', error);
            } finally {
                console.log('Imagem finalizada');
                setIsLoadingMovieData(false);
            }
        };

        loadMovies();
    }, [id]);

    // API data movies trailers
    const [movieTrailers, setMovieTrailers] = useState<MovieTrailers[]>([]);
    const [keyTrailers, setKeyTrailers] = useState<string>('');
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [haveTrailer, setHaveTrailer] = useState<boolean>(true);

    useEffect(() => {
        setIsPlay(false);

        const loadMoviesTrailers = async () => {
            try {
                const response = await api_tmdb.get(`movie/${id}/videos`, {
                    params: {
                        api_key: apiKey,
                        language: 'pt-BR',
                        page: 1,
                    },
                });

                setMovieTrailers(response.data.results);
            } catch (error) {
                console.log('Obteve um erro do trailer: ', error);
            } finally {
                console.log('Trailer finalizado');
            }
        };

        loadMoviesTrailers();
    }, [id]);

    useEffect(() => {
        console.log(movieTrailers);

        if (movieTrailers.length <= 0) {
            setHaveTrailer(false);
        }

        if (movieTrailers.length > 0) {
            setHaveTrailer(true);

            const dublado = movieTrailers.filter((item) => {
                return item.name.toLowerCase().includes('dublado');
            });

            const trailer = movieTrailers.filter((item) => {
                return item.name.toLowerCase().includes('trailer');
            });

            if (dublado.length > 0) {
                const keys = dublado.map((item) => item.key);

                const keyRandom = Math.floor(Math.random() * keys.length);

                setKeyTrailers(keys[keyRandom]);

                console.log('Verdadeiro DUBLADO');
            } else if (trailer.length > 0 && dublado.length <= 0) {
                const keys = trailer.map((item) => item.key);

                const keyRandom = Math.floor(Math.random() * trailer.length);

                setKeyTrailers(keys[keyRandom]);

                console.log('Verdadeiro TRAILER');
            }
        }
    }, [movieTrailers]);

    return (
        <>
            <section className="mt-20 lg:px-28 xl:px-42 2xl:px-72">
                {isLoadingMovieData && <WaveLoad text="Buscando..." />}

                <div className="w-full relative h-fit bg-[#030A1B] lg:max-w-[100%]">
                    <div className="absolute top-0 left-0 right-0 w-full h-5 bg-[#228EE5] blur-lg pointer-events-none"></div>
                    <div className="relative">
                        <div
                            className={
                                isLoadingMovieData || isPlay
                                    ? 'hidden'
                                    : 'w-full bg-[#030A1B] h-fit'
                            }
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original/${imgMovie}`}
                                alt={`Filme `}
                                loading="lazy"
                                className="flex object-cover brightness-110 w-full lg:w-full lg:h-[25rem] lg:rounded-b-2xl 1260:h-[30rem] 2xl:h-[35rem]"
                            />
                        </div>

                        <div
                            className={
                                isPlay || !haveTrailer
                                    ? 'hidden'
                                    : 'z-30 flex justify-center items-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#228EE5] rounded-full cursor-pointer'
                            }
                            onClick={() => setIsPlay(!isPlay)}
                        >
                            <Icon
                                icon="line-md:play-filled"
                                className="w-8 h-8 text-white"
                            />
                        </div>
                    </div>
                    <div className={isPlay ? 'flex relative' : 'hidden'}>
                        <ReactPlayer
                            src={`https://www.youtube.com/watch?v=${keyTrailers}`}
                            width={'100%'}
                            height={'auto'}
                            muted={isMuted}
                            playing={isPlay}
                            className="aspect-video"
                            onEnded={() => setIsPlay(false)}
                        />

                        <div
                            className="cursor-pointer z-30 flex justify-center items-center absolute top-4 right-4 w-10 h-10 bg-[#228EE5] rounded-full"
                            onClick={() => setIsMuted(!isMuted)}
                        >
                            <Icon
                                icon={
                                    isMuted
                                        ? 'lucide:volume-x'
                                        : 'lucide:volume-2'
                                }
                                className="w-6 h-6"
                            />
                        </div>
                    </div>

                    <div
                        className={`w-full h-full absolute inset-0 bg-gradient-to-b from-[#030A1B]/10 via-[#030A1B]/20 to-[#030A1B]`}
                    ></div>
                </div>
                <div className="px-4 mt-5 flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-4">
                        <p className="text-2xl font-bold line-clamp-1">
                            {titleMovie}
                        </p>
                        <div className="flex gap-x-5 font-bold opacity-50">
                            <p>IMDb {voteAverageMovie}</p>
                            <p>{timeMovie}</p>
                            <p>{dateMovie}</p>
                        </div>

                        <div className="flex gap-x-5 font-bold opacity-50">
                            {genreMovie.map((item, index) => (
                                <p key={index}>
                                    {item.name === 'Thriller'
                                        ? 'Suspense'
                                        : `${item.name}`}
                                </p>
                            ))}
                        </div>
                        <p className="text-sm/relaxed font-light opacity-70 line-clamp-6">
                            {overviewMovie}
                        </p>

                        <p className="text-xs tracking-wider text-[#228EE5]/50 font-bold italic">
                            ATENÇÃO: Alguns Trailer não irão rodar no Celular,
                            Por Favor Atualize a página .
                        </p>
                    </div>

                    <div className="flex gap-x-6">
                        <button className="flex items-center gap-x-2 bg-[#228EE5] px-4 py-2 rounded-2xl text-base tracking-wider">
                            <Icon
                                icon="line-md:play-filled"
                                className="w-6 h-6"
                            />
                            Assistir ao trailer
                        </button>
                    </div>
                </div>
            </section>

            <NowPlaying />
        </>
    );
}

export default DetailsMovies;

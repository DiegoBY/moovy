import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { api_tmdb } from '../../services/api';
import type { Movie } from '@/types/Movie';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

import TrendingList from '@/components/TrendingList/TrendingList';
import MovieDetailsImagem from './MovieDetailsImage';
import MovieDetailsInfo from './MovieDetailsInfo';
import SectionLoader from '@/components/SectionLoader/SectionLoader';

function MovieDetails() {
    const { type, id } = useParams<{ type: 'movie' | 'tv'; id: string }>();
    const location = useLocation();

    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPlay, setIsPlay] = useState<boolean>(false);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const response = await api_tmdb.get(`${type}/${id}`, {
                    params: {
                        api_key: apiKey,
                        language: 'pt-BR',
                    },
                });

                setMovie(response.data);
                setIsPlay(false);
            } catch (error) {
                console.error('Erro ao carregar os filmes:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [location]);

    // console.log(movie);

    return (
        <>
            {loading ? <SectionLoader /> : ''}
            {movie ? (
                <section className="mt-30 ">
                    <div className="712:px-10 lg:px-20 xl:px-50 2xl:px-70 1920:px-100">
                        <MovieDetailsImagem
                            isPlay={isPlay}
                            setIsPlay={setIsPlay}
                            movie={movie}
                        />
                        <MovieDetailsInfo movie={movie} />
                    </div>

                    {type === 'movie' ? (
                        <TrendingList type={type} titleSection="Filmes" />
                    ) : (
                        <TrendingList type={type} titleSection="Séries" />
                    )}
                </section>
            ) : (
                ''
            )}
        </>
    );
}

export default MovieDetails;

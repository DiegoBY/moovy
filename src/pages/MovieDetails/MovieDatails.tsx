import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { api_tmdb } from '../../services/api';
import type { Movie } from '@/types/Movie';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

import TrendingList from '@/components/TrendingList/TrendingList';
import MovieDetailsImagem from './MovieDetailsImage';
import MovieDetailsInfo from './MovieDetailsInfo';
import SectionLoader from '@/components/SectionLoader/SectionLoader';
import NotFound from '@/components/NotFound/NotFound';

function MovieDetails() {
    const { type, id } = useParams<{ type: 'movie' | 'tv'; id: string }>();
    const location = useLocation();

    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPlay, setIsPlay] = useState<boolean>(false);

    const [error, setError] = useState<number>();

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
                const err = error as { status?: number; message?: string };
                setError(err.status ?? 500);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [location]);

    return (
        <>
            {loading ? <SectionLoader /> : ''}

            {error ? <NotFound code={error} /> : ''}

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

                    <TrendingList
                        category="popular"
                        type={'movie'}
                        titleSection="Filmes em alta"
                    />

                    <TrendingList
                        category="popular"
                        type={'tv'}
                        titleSection="Séries em alta"
                    />
                </section>
            ) : (
                ''
            )}
        </>
    );
}

export default MovieDetails;

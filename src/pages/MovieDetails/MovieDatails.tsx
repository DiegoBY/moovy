import { useState, useEffect } from 'react';
import { api_tmdb } from '../../services/api';
import type { Movie } from '@/types/Movie';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

import TrendingList from '@/components/TrendingList/TrendingList';
import MovieDetailsImagem from './MovieDetailsImage';
import MovieDetailsInfo from './MovieDetailsInfo';
import SectionLoader from '@/components/SectionLoader/SectionLoader';

function MovieDetails() {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const response = await api_tmdb.get(`movie/${1151334}`, {
                    params: {
                        api_key: apiKey,
                        language: 'pt-BR',
                    },
                });

                setMovie(response.data);
            } catch (error) {
                console.error('Erro ao carregar os filmes:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    return (
        <>
            {loading ? <SectionLoader /> : ''}
            {movie ? (
                <section className="mt-30 ">
                    <div className="712:px-10 lg:px-20 xl:px-50 2xl:px-70 1920:px-100">
                        <MovieDetailsImagem movie={movie} />
                        <MovieDetailsInfo movie={movie} />
                    </div>

                    <TrendingList type="movie" titleSection="Filmes" />
                </section>
            ) : (
                ''
            )}
        </>
    );
}

export default MovieDetails;

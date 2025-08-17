import { useState, useEffect } from 'react';
import { api_tmdb } from '../../services/api';
import type { Movie } from '@/types/Movie';
import BannerImage from './BannerImage';
import LottieLoader from '../LottieLoader/LottieLoader';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

function Banner() {
    const [listMovies, setListMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const response = await api_tmdb.get('movie/now_playing', {
                    params: {
                        api_key: apiKey,
                        language: 'pt-BR',
                        page: 1,
                    },
                });

                const top5 = response.data.results.slice(0, 5);
                setListMovies(top5);
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
            {loading ? (
                <LottieLoader />
            ) : (
                <div className="relative mt-30">
                    <BannerImage listMovie={listMovies} />
                </div>
            )}
        </>
    );
}

export default Banner;

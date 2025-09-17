import { useState, useEffect } from 'react';
import { api_tmdb } from '../../services/api';
import type { Movie } from '@/types/Movie';
import BannerImage from './BannerImage';
import SectionLoader from '../SectionLoader/SectionLoader';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

type BannerProps = {
    type: 'movie' | 'tv';
    category: string;
};

function Banner({ type, category }: BannerProps) {
    const [listMovies, setListMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    console.log(type);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const response = await api_tmdb.get(`${type}/${category}`, {
                    params: {
                        api_key: apiKey,
                        language: 'pt-BR',
                        page: 1,
                    },
                });

                let results: Movie[] = Array.from(response.data.results)
                    .slice(0, 5)
                    .map((item: any) => ({
                        id: item.id,
                        title: item.title || item.name,
                        overview: item.overview,
                        backdrop_path: item.backdrop_path,
                        poster_path: item.poster_path,
                        genre_ids: item.genre_ids,
                        release_date: item.release_date,
                    }));

                setListMovies(results);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    return (
        <>
            {loading ? (
                <SectionLoader />
            ) : (
                <div className="relative mt-30 712:px-10 lg:px-20 xl:px-50 2xl:px-70 1920:px-100">
                    <BannerImage listMovie={listMovies} type={type} />
                </div>
            )}
        </>
    );
}

export default Banner;

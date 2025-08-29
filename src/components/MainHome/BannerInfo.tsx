import { genreMap } from '@/utils/genreMap';

import type { Movie } from '@/types/Movie';

interface BannerInfoProps {
    listMovie: Movie[];
    index: number;
}

function BannerInfo({ listMovie, index }: BannerInfoProps) {
    const movie = listMovie[index];

    if (!movie || !movie.genre_ids) return null;

    const genres = movie.genre_ids
        .map((id) => genreMap[id])
        .filter(Boolean)
        .slice(0, 3);

    return (
        <>
            <div className="absolute top-10 left-3 z-[20] 375:top-22 425:top-27 712:top-40 712:left-15 lg:left-25 lg:top-70 xl:left-60 2xl:left-80 1920:left-110 1920:top-90">
                <p className="text-xl font-semibold text-[#fff] 712:text-2xl">
                    {listMovie[index]?.title}
                </p>

                {genres.length > 0 && (
                    <p className="text-xs text-[#fff]/80 mt-1 712:text-base">
                        {genres.map((genre, i) => (
                            <span key={i}>
                                {genre}
                                {i !== genres.length - 1 && (
                                    <span className="mx-1">•</span>
                                )}
                            </span>
                        ))}
                    </p>
                )}
            </div>
        </>
    );
}

export default BannerInfo;

import { genreMap } from '@/utils/genreMap';

import type { Movie } from '@/types/Movie';

interface BannerInfoProps {
    listMovie: Movie[];
    index: number;
}

function BannerInfo({ listMovie, index }: BannerInfoProps) {
    const movie = listMovie[index];

    const genres = movie?.genre_ids
        .map((id) => genreMap[id])
        .filter(Boolean)
        .slice(0, 3);

    return (
        <>
            <div className="absolute top-22 left-3 z-[20]">
                <p className="text-xl font-semibold text-[#fff]">
                    {listMovie[index]?.title}
                </p>

                {genres && genres.length > 0 && (
                    <p className="text-xs text-[#fff]/80 mt-1 ">
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

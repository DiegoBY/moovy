import type { Movie } from '@/types/Movie';
import { genreMap } from '@/utils/genreMap';

interface MovieDetailsInfoProps {
    movie: Movie;
}

function MovieDetailsInfo({ movie }: MovieDetailsInfoProps) {
    const title = movie.title || movie.name;
    const year =
        movie.release_date?.slice(0, 4) ||
        movie.first_air_date?.slice(0, 4) ||
        '—';

    return (
        <>
            <div className="p-3">
                <p className="text-lg 712:text-xl">
                    {title} <span className="text-[#fff]/50">({year})</span>
                </p>

                {movie?.genres && (
                    <p>
                        {movie.genres
                            .map((g) => genreMap[g.id])
                            .slice(0, 3)
                            .map((name, i, arr) => (
                                <span
                                    key={i}
                                    className="text-xs text-[#fff]/50 712:text-sm"
                                >
                                    {name}
                                    {i < arr.length - 1 && ' • '}
                                </span>
                            ))}
                    </p>
                )}

                <p className="mt-5 text-[#fff]/60 text-sm">{movie.overview}</p>
            </div>
        </>
    );
}

export default MovieDetailsInfo;

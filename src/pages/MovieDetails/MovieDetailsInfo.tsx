import type { Movie } from '@/types/Movie';
import { genreMap } from '@/utils/genreMap';

interface MovieDetailsInfoProps {
    movie: Movie;
}

function MovieDetailsInfo({ movie }: MovieDetailsInfoProps) {
    return (
        <>
            <div className="p-3">
                <p className="text-lg">
                    {movie.title}{' '}
                    <span className="text-[#fff]/50">
                        ({movie.release_date.slice(0, 4)})
                    </span>
                </p>

                {movie?.genres && (
                    <p>
                        {movie.genres
                            .map((g) => genreMap[g.id])
                            .slice(0, 3)
                            .map((name, i, arr) => (
                                <span
                                    key={i}
                                    className="text-xs text-[#fff]/50"
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

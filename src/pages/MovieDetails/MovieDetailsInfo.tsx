import type { Movie } from '@/types/Movie';
import { genreMap } from '@/utils/genreMap';
import { useLocation } from 'react-router-dom';

interface MovieDetailsInfoProps {
    movie: Movie;
}

function MovieDetailsInfo({ movie }: MovieDetailsInfoProps) {
    const location = useLocation();

    const title = movie.title || movie.name;
    const year =
        movie.release_date?.slice(0, 4) ||
        movie.first_air_date?.slice(0, 4) ||
        '—';
    const seasons = movie.seasons;
    const runtime = movie?.runtime;

    const getHours = Math.floor(runtime / 60);
    const getMinutes = runtime % 60;

    return (
        <>
            <div className="p-3">
                <p className="text-lg 712:text-xl">
                    {title}{' '}
                    <span className="text-[#4743E0]/60 font-semibold">
                        ({year})
                    </span>
                </p>

                <div className="flex items-center gap-x-4">
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
                                        {name} {i < arr.length - 1 && ` • `}
                                    </span>
                                ))}
                        </p>
                    )}

                    <span className="text-[#4743E0] font-bold"> - </span>
                    <span className="font-semibold">
                        {location.pathname.toLowerCase().includes('tv')
                            ? `${seasons?.length} Temporadas`
                            : `${getHours} h ${getMinutes} min`}
                    </span>
                </div>

                <p className="mt-5 text-[#fff]/60 text-sm">{movie.overview}</p>
            </div>
        </>
    );
}

export default MovieDetailsInfo;

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import type { Movie } from '@/types/Movie';

interface MovieDetailsImageProps {
    movie: Movie;
}

function MovieDetailsImagem({ movie }: MovieDetailsImageProps) {
    return (
        <>
            <div className="relative">
                <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-[#171A21] via-[#171A21]/50 to-transparent"></div>
                <LazyLoadImage
                    alt={`Filme`}
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    placeholderSrc={`https://image.tmdb.org/t/p/w92/${movie?.backdrop_path}`}
                    effect="blur"
                    visibleByDefault={true}
                    threshold={300}
                    className="375:rounded-2xl"
                />
            </div>
        </>
    );
}

export default MovieDetailsImagem;

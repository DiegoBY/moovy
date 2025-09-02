import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Icon } from '@iconify/react';

import type { Movie } from '@/types/Movie';
import Trailers from '@/components/Trailers/Trailers';

interface MovieDetailsImageProps {
    movie: Movie;
    isPlay: boolean;
    setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function MovieDetailsImagem({
    movie,
    isPlay,
    setIsPlay,
}: MovieDetailsImageProps) {
    return (
        <>
            <div className="relative">
                <div>
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

                    {isPlay ? <Trailers /> : ''}
                </div>

                <div className="w-full h-full absolute inset-0">
                    <button
                        className="absolute left-[50%] top-[50%] -translate-[50%] z-[200] text-[#fff] bg-[#4743E0] rounded-xl w-10 h-10 flex justify-center items-center  375:w-12 375:h-12"
                        onClick={() => setIsPlay(true)}
                    >
                        <Icon
                            icon="gravity-ui:play-fill"
                            className="w-5 h-5 375:w-7 375:h-7 712:w-7 712:h-7"
                        />
                    </button>

                    <button className="absolute right-5 top-2">
                        <Icon
                            icon="iconamoon:heart-thin"
                            className="w-10 h-10 text-[#EBFAFF] 712:w-12 712:h-12 "
                        />
                    </button>
                </div>
            </div>
        </>
    );
}

export default MovieDetailsImagem;

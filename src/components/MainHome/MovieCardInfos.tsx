import { Icon } from '@iconify/react';

import type { Movie } from '@/types/Movie';

import NextOrPrevCarousel from './../MainHome/NextOrPrevCarousel';
interface MovieCardInfosProps {
    selectedMovie: Movie | null;
    genreMap: { [id: number]: string };
    handleMovie: () => void;
    scrollNext: any;
    scrollPrev: any;
}

function MovieCardInfos({
    selectedMovie,
    genreMap,
    handleMovie,
    scrollNext,
    scrollPrev,
}: MovieCardInfosProps) {
    return (
        <>
            <div className=" px-4 w-full flex flex-col gap-y-4 712:justify-between 712:w-[70%] 712:h-[14rem] 712:absolute 712:top-50 712:-translate-y-[50] lg:px-0 lg:top-80 lg:left-28 1164:top-120 1260:top-50 2xl:top-140 2xl:left-72">
                <div>
                    <p className="text-2xl font-bold line-clamp-1 w-fit 712:text-4xl">
                        {selectedMovie?.title}
                    </p>

                    <div className="flex items-center gap-x-4 w-fit">
                        {selectedMovie?.genre_ids.map((id) => (
                            <p
                                key={id}
                                className="text-sm/relaxed font-light opacity-70 712:text-base/relaxed"
                            >
                                {genreMap[id]}
                            </p>
                        ))}
                    </div>
                </div>

                <p className="text-sm/relaxed font-light opacity-70 line-clamp-3 w-full lg:w-[60%]">
                    {selectedMovie?.overview}
                </p>
                <div className="flex gap-x-6 w-fit">
                    <button
                        className="cursor-pointer transition-all duration-400 ease-linear flex items-center gap-x-2 bg-transparent border border-[#228ee5] px-4 py-2 rounded-2xl text-sm tracking-wider 390:text-base hover:bg-[#fff] hover:text-[#228ee5] hover:font-bold hover:border-[#fff]"
                        onClick={() => handleMovie()}
                    >
                        Assitir Filme
                        <Icon icon="ph:arrow-right-light" className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="px-4">
                <NextOrPrevCarousel
                    scrollPrev={scrollPrev}
                    scrollNext={scrollNext}
                />
            </div>
        </>
    );
}

export default MovieCardInfos;

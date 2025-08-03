import { Icon } from '@iconify/react';

import { Movie } from '@/types/Movie';

interface MovieCardInfosProps {
    selectedMovie: Movie | null;
    genreMap: { [id: number]: string };
    handleMovie: () => void;
}

function MovieCardInfos({
    selectedMovie,
    genreMap,
    handleMovie,
}: MovieCardInfosProps) {
    return (
        <>
            <div className="px-4 w-full mt-5 flex flex-col gap-y-4 712:absolute 712:top-50 712:-translate-y-[50] lg:top-40 1260:top-50 2xl:top-65">
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
        </>
    );
}

export default MovieCardInfos;

import { Icon } from '@iconify/react';

import type { Movie } from '@/types/Movie';

interface TopRatedCardProps {
    item: Movie;
    index: number;
    handleMovie: (index: number) => void;
}

function TopRatedCard({ item, index, handleMovie }: TopRatedCardProps) {
    return (
        <div
            key={item.id}
            className="cursor-pointer group transition-all duration-300 ease-linear translate-z-0 flex-[0_0_55%] min-w-0 pl-4 relative 712:flex-[0_0_30%] lg:flex-[0_0_25%] 1164:flex-[0_0_15%] xl:flex-[0_0_20%] 2xl:flex-[0_0_15%] "
            onClick={() => handleMovie(index)}
            role="region"
            aria-label="Melhores avaliados"
        >
            <div className="relative">
                <img
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    alt={`Filme ${item.title}`}
                    className="transition-all duration-300 ease-linear object-cover brightness-110 rounded-2xl group-hover:scale-90"
                />

                <div className="w-10 h-10 flex justify-center items-center rounded-lg bg-[#030A1B] absolute left-2 top-2 z-20">
                    <Icon
                        icon="material-symbols-light:favorite"
                        className="w-6 h-6 text-[#228EE5]"
                    />
                </div>

                <div className="transition-all duration-300 ease-linear hidden lg:flex opacity-0 justify-center items-center absolute inset-0 bg-transparent bg-clip-padding backdrop-filter backdrop-blur-xs group-hover:opacity-100">
                    <div className=" w-14 h-14 bg-[#228EE5] rounded-full flex justify-center items-center">
                        <Icon
                            icon="si:play-fill"
                            className="w-6 h-6 text-[#fff]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopRatedCard;

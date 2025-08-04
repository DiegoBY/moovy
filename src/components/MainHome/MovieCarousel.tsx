import type { Movie } from '@/types/Movie';

interface MovieCarouselProps {
    movies: Movie[];
    emblaRef: (element: HTMLElement | null) => void;
}

function MovieCarousel({ movies, emblaRef }: MovieCarouselProps) {
    return (
        <>
            <div className="embla max-w-3xl mx-auto h-fit w-full space-x-4 lg:max-w-[100%]">
                <div className="absolute top-0 left-0 right-0 w-full h-5 bg-[#228EE5] blur-lg pointer-events-none lg:hidden"></div>
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className=" flex touch-pan-y touch-pinch-zoom -ml-4">
                        {movies.map((item) => (
                            <div
                                key={item.id}
                                className="translate-z-0 flex-[0_0_100%] min-w-0 pl-4 relative "
                            >
                                <div className="relative ">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                                        alt={`Filme ${item.title}`}
                                        loading="lazy"
                                        className="object-cover brightness-110 w-auto lg:w-full lg:h-[25rem] lg:rounded-b-2xl 1260:h-[30rem] 2xl:h-[35rem]"
                                    />

                                    <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-[#030A1B]/10 via-[#030A1B]/20 to-[#030A1B] lg:bg-[#030A1B]/10"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieCarousel;

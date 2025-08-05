import { Icon } from '@iconify/react';

interface NextOrPrevCarouselProps {
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev?: boolean;
    canScrollNext?: boolean;
}

function NextOrPrevCarousel({
    scrollPrev,
    scrollNext,
    canScrollPrev = true,
    canScrollNext = true,
}: NextOrPrevCarouselProps) {
    return (
        <div className="w-full mt-5 flex justify-end gap-x-4  lg:pr-28 2xl:pr-72">
            <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={`cursor-pointer w-12 h-12 flex justify-center items-center rounded-xl transition ${
                    canScrollPrev
                        ? 'bg-[#228EE5] hover:bg-[#228EE5]/40'
                        : 'bg-[#161c2c]/70 cursor-not-allowed'
                }`}
                aria-label="Anterior"
            >
                <Icon
                    icon="ic:round-navigate-next"
                    className="rotate-180 w-5 h-5 text-white"
                />
            </button>
            <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={`cursor-pointer w-12 h-12 flex justify-center items-center rounded-xl transition ${
                    canScrollNext
                        ? 'bg-[#228EE5] hover:bg-[#228EE5]/40'
                        : 'bg-[#161c2c]/70 cursor-not-allowed'
                }`}
                aria-label="Próximo"
            >
                <Icon
                    icon="ic:round-navigate-next"
                    className="w-5 h-5 text-white"
                />
            </button>
        </div>
    );
}

export default NextOrPrevCarousel;

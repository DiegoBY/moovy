import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

interface BannerButtonsProps {
    id: number;
}

function BannerButtons({ id }: BannerButtonsProps) {
    return (
        <>
            <section className="absolute top-25 left-3 mt-4 z-[20] flex items-center gap-x-12 375:top-40 425:top-45 712:left-15 712:bottom-0 lg:left-25 lg:-bottom-30 xl:left-60 2xl:left-80 1920:left-110">
                <Link to={`/movie/${id}`}>
                    <button className="cursor-pointer text-[#fff] bg-[#4743E0] px-2 py-1 rounded-lg flex items-center gap-x-2 text-lg tracking-wider font-semibold transition-all duration-300 ease-in hover:bg-[#fff] hover:text-[#4743E0] 712:text-2xl 712:p-3 ">
                        <Icon
                            icon="gravity-ui:play-fill"
                            className="w-5 h-5 712:w-7 712:h-7"
                        />
                        Trailer
                    </button>
                </Link>
            </section>
        </>
    );
}

export default BannerButtons;

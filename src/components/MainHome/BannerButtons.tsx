import { Icon } from '@iconify/react';

function BannerButtons() {
    return (
        <>
            <section className="absolute top-25 left-3 z-[20] flex items-center gap-x-12 375:top-40 425:top-45 712:left-15 712:bottom-0 lg:left-25 lg:-bottom-30 xl:left-60 2xl:left-80 1920:left-110">
                <button className="text-[#fff] bg-[#4743E0] px-2 py-1 rounded-lg flex items-center gap-x-2 text-lg tracking-wider font-semibold 712:text-2xl 712:p-3 ">
                    <Icon
                        icon="gravity-ui:play-fill"
                        className="w-5 h-5 712:w-7 712:h-7"
                    />
                    Trailer
                </button>

                <button>
                    <Icon
                        icon="iconamoon:heart-thin"
                        className="w-10 h-10 text-[#EBFAFF] 712:w-16 712:h-16"
                    />
                </button>
            </section>
        </>
    );
}

export default BannerButtons;

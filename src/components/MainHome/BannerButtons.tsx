import { Icon } from '@iconify/react';

function BannerButtons() {
    return (
        <>
            <section className="absolute top-40 left-3 z-[20] flex items-center gap-x-12">
                <button className="text-[#fff] bg-[#4743E0] px-2 py-1 rounded-lg flex items-center gap-x-2 text-lg tracking-wider font-semibold">
                    <Icon icon="gravity-ui:play-fill" className="w-5 h-5" />
                    Trailer
                </button>

                <button>
                    <Icon
                        icon="iconamoon:heart-thin"
                        className="w-10 h-10 text-[#EBFAFF]"
                    />
                </button>
            </section>
        </>
    );
}

export default BannerButtons;

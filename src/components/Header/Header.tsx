import { Icon } from '@iconify/react';

function Header() {
    return (
        <>
            <section className="w-full lg:px-28 xl:px-42 2xl:px-72">
                <header className="fixed top-3 right-4 left-4 lg:right-28 lg:left-28 xl:right-42 xl:left-42 2xl:right-72 2xl:left-72 px-7 py-3 z-[999] bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm border border-[#228EE5]">
                    <div className="flex gap-x-4 items-center lg:hidden">
                        <Icon
                            icon="material-symbols-light:menu"
                            className="w-8 h-8"
                        />
                        <Icon
                            icon="material-symbols-light:search"
                            className="w-8 h-8"
                        />
                    </div>

                    {/* Menu Pc */}
                    <div className="hidden lg:flex justify-between items-center">
                        <a
                            href="/"
                            className=" flex text-2xl font-bold tracking-widest cursor-pointer text-[#228EE5]"
                        >
                            Moovy
                        </a>
                        <div className="flex items-center gap-x-10 ">
                            <div className="flex gap-x-4">
                                <a href="#" className="text-xl">
                                    Filmes
                                </a>
                                <a href="#" className="text-xl">
                                    Séries
                                </a>
                            </div>

                            <div className="flex gap-x-2 cursor-pointer">
                                <Icon
                                    icon="ic:baseline-favorite"
                                    className="w-8 h-8"
                                />
                                <p className="text-xl">Favoritos</p>
                            </div>
                        </div>
                    </div>
                </header>
            </section>
        </>
    );
}

export default Header;

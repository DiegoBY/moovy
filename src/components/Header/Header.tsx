import HeaderFavorites from './HeaderFavorites';
import HeaderLogo from './HeaderLogo';
import HeaderSearch from './HeaderSearch';
import HeaderUser from './HeaderUser';

function Header() {
    return (
        <>
            <header className="p-3 flex justify-between w-full fixed left-0 top-0 z-[999] bg-[#171A21] 712:px-10 lg:px-20 xl:px-50 2xl:px-70 1920:px-100">
                <div>
                    <HeaderLogo />
                </div>

                <div className="flex items-center gap-x-4">
                    <HeaderSearch />
                    <HeaderFavorites />
                    <HeaderUser />
                </div>
            </header>
        </>
    );
}

export default Header;

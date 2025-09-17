import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderLogo from './HeaderLogo';
import HeaderUser from './HeaderUser';
import HeaderMenuPC from './HeaderMenuPC';

function Header() {
    return (
        <>
            <header className="p-3 flex justify-between w-full fixed left-0 top-0 z-[999] bg-[#171A21] 712:px-10 lg:px-20 xl:px-50 2xl:px-70 1920:px-100">
                <HeaderLogo />

                <HeaderMenuPC />
                <HeaderUser />

                <HeaderMenuMobile />
            </header>
        </>
    );
}

export default Header;

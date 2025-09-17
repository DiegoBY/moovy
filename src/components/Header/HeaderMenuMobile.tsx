import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
    { path: '/', label: 'Filmes', icon: 'material-symbols:movie-outline' },
    {
        path: '/tv',
        label: 'Séries',
        icon: 'streamline-ultimate:single-man-vintage-tv',
    },
    {
        path: '/favoritos',
        label: 'Favoritos',
        icon: 'material-symbols:favorite-rounded',
    },
];

function HeaderMenuMobile() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <nav className="px-3 w-full py-2 fixed bottom-0 left-0 lg:hidden">
                <ul className="bg-[#4743E0] py-4 rounded-2xl px-2.5 flex justify-center items-center gap-x-10">
                    {menuItems.map(({ path, label, icon }) => (
                        <li key={path}>
                            <Link to={path}>
                                <div
                                    className={`${
                                        isActive(path)
                                            ? 'bg-[#242271] px-2 py-1'
                                            : ''
                                    } flex justify-center items-center gap-x-2 rounded-md`}
                                >
                                    <Icon
                                        icon={icon}
                                        className={`${
                                            isActive(path)
                                                ? 'w-5 h-5'
                                                : 'w-8 h-8'
                                        } transition-all duration-200`}
                                    />
                                    {isActive(path) && (
                                        <p className="font-bold">{label}</p>
                                    )}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default HeaderMenuMobile;

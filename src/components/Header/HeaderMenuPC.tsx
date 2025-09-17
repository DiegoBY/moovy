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

function HeaderMenuPC() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <nav className="hidden lg:flex justify-end">
                <ul className="flex items-center gap-x-10">
                    {menuItems.map(({ path, label, icon }) => (
                        <li key={path}>
                            <Link
                                to={path}
                                className={`${
                                    isActive(path)
                                        ? 'text-[#4743E0]'
                                        : 'text-[#fff]'
                                } text-xl font-bold flex items-center gap-x-2`}
                            >
                                <Icon icon={icon} className="w-6 h-6" />
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default HeaderMenuPC;

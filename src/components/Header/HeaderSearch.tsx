import { Icon } from '@iconify/react';
import { useState } from 'react';

function HeaderSearch() {
    const [isSearchOpen, setIsSearchOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);

        if (isSearchOpen) setSearchTerm('');
    };

    return (
        <>
            <div>
                <div
                    className={
                        isSearchOpen
                            ? 'hidden'
                            : ' bg-[#171A21] border border-[#4743E0] rounded-2xl w-[95%] flex p-3 absolute top-3 left-3 right-3 z-[20]'
                    }
                >
                    <input
                        type="text"
                        placeholder="Procurar Filmes ou Séries"
                        className="flex w-full outline-0 pr-10 text-[#EBFAFF] placeholder:text-[#EBFAFF]/60"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onBlur={() => {
                            if (!searchTerm) setIsSearchOpen(false);
                        }}
                    />
                </div>

                <button
                    className={
                        isSearchOpen
                            ? 'flex'
                            : 'absolute top-[50%] -translate-y-[50%] right-3 z-[20]'
                    }
                >
                    <Icon
                        icon="circum:search"
                        className="w-10 h-10 text-[#EBFAFF]"
                        onClick={toggleSearch}
                    />
                </button>
            </div>
        </>
    );
}

export default HeaderSearch;

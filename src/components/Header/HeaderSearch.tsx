import { Icon } from '@iconify/react';
import { useState } from 'react';
import SearchTvOrMovie from '../../pages/SearchTvOrMovie/SearchTvOrMovie';

function HeaderSearch() {
    const [isSearch, setIsSearch] = useState<boolean>(false);

    return (
        <>
            <div>
                <Icon
                    icon="circum:search"
                    className="w-10 h-10 text-[#EBFAFF] 712:w-12 712:h-12"
                    onClick={() => setIsSearch(true)}
                />
            </div>
        </>
    );
}

export default HeaderSearch;

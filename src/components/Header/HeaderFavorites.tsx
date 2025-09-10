import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function HeaderFavorites() {
    return (
        <>
            <div>
                <Link to={'/favoritos'}>
                    <Icon
                        icon="iconamoon:heart-thin"
                        className="w-12 h-12 text-[#EBFAFF] 712:w-12 712:h-12"
                    />
                </Link>
            </div>
        </>
    );
}

export default HeaderFavorites;

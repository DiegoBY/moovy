import { Icon } from '@iconify/react';

function HeaderLogo() {
    return (
        <>
            <div>
                <a href="/">
                    <Icon
                        icon="arcticons:movies-anywhere"
                        className="w-12 h-12 text-[#4743E0] 712:w-16 712:h-16 transition-all duration-300 ease-in-out hover:text-[#6560ec]"
                    />
                </a>
            </div>
        </>
    );
}

export default HeaderLogo;

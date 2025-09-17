import avatarImg from '../../assets/image/avatar.png';

function HeaderUser() {
    return (
        <>
            <div className="overflow-hidden w-12 h-12 bg-[#4743E0] rounded-full 712:w-16 712:h-16">
                <img src={avatarImg} alt="Avatar do Usuario" />
            </div>
        </>
    );
}

export default HeaderUser;

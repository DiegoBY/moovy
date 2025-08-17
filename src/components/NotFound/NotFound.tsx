function NotFound() {
    return (
        <>
            <div>
                <p>404</p>
                <p>Página não encontrada!</p>
                <p>
                    Hmm… parece que essa página não existe ou se escondeu de
                    nós!
                </p>
                <a
                    href="#"
                    className="text-[#fff] bg-[#4743E0] px-2 py-1 rounded-lg flex items-center gap-x-2 text-lg tracking-wider font-semibold"
                >
                    Me leve ao início
                </a>
            </div>
        </>
    );
}

export default NotFound;

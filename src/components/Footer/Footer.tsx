import { Icon } from '@iconify/react';

function Footer() {
    return (
        <>
            <footer className="flex items-center flex-col justify-center gap-y-5 px-3 mb-10 712:px-10 lg:px-20 xl:px-50 2xl:px-70">
                <div className="flex flex-col text-center text-2xl font-semibold text-[#fff]/70">
                    <p className="text-xl">Desenvolvidor por </p>
                    <p className="text-[#4743E0] italic tracking-widest">
                        Diego Santos -
                    </p>
                    <p className="text-xl">Código e design.</p>
                </div>

                <div className="font-semibold text-base text-[#fff] tracking-wide flex flex-col gap-y-2">
                    <p>
                        Figma:{' '}
                        <a href="#" className="italic text-[#4743E0]">
                            acesse aqui
                        </a>
                    </p>
                    <p>
                        GitHub:{' '}
                        <a href="#" className="italic text-[#4743E0]">
                            acesse aqui
                        </a>
                    </p>
                    <p>
                        Portfolio:{' '}
                        <a href="#" className="italic text-[#4743E0]">
                            acesse aqui
                        </a>
                    </p>
                </div>

                <div className="flex flex-col items-center gap-y-2">
                    <p className="text-[#4743E0] text-xs italic tracking-wider text-center 712:text-sm">
                        Criar é aprender, e aprender é evoluir — cada linha de
                        código é um passo à frente.
                    </p>

                    <div>
                        <Icon
                            icon="clarity:plane-line"
                            className="w-8 h-8 text-[#4743E0]"
                        />
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;

import { errors } from '../../utils/errors';

interface CodeProps {
    code: number;
}

function NotFound({ code }: CodeProps) {
    const message = errors[code] || 'Ocorreu um erro inesperado';

    return (
        <>
            <div className="my-30 flex flex-col justify-center items-center px-10 gap-y-2 h-[30vh]">
                <p className="text-3xl font-bold italic tracking-widest">
                    HEEEEEI !!!
                </p>
                <p className="text-base text-gray-400 mb-6">
                    {code} - {message}
                </p>
                <a href="/" className="text-blue-500 hover:underline">
                    Me leve ao começo
                </a>
            </div>
        </>
    );
}

export default NotFound;

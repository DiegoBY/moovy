interface WaveLoadProps {
    text: string;
}

export default function WaveLoad({ text = '' }: WaveLoadProps) {
    return (
        <>
            <div className="z-[999] flex flex-col items-center justify-center w-full h-full bg-[#030A1B] absolute inset-0 overflow-hidden">
                <div className="relative flex items-center justify-center w-[14rem] h-[14rem] bg-[#228EE5] rounded-full animate-spin">
                    {/* <div className="w-[12rem] h-[12rem] border border-purple-600 rounded-full absolute top-[50%] left-[50%] -translate-[50%]"></div> */}
                    <div className="w-[1rem] h-[1rem] bg-[#030A1B] rounded-full absolute top-[50%] left-[50%] -translate-[50%]"></div>
                    <div className="w-[3rem] h-[3rem] bg-[#030A1B] rounded-full absolute top-[8%] left-[50%] -translate-x-[50%]"></div>
                    <div className="w-[3rem] h-[3rem] bg-[#030A1B] rounded-full absolute top-[30%] left-[69%]"></div>
                    <div className="w-[3rem] h-[3rem] bg-[#030A1B] rounded-full absolute top-[65%] left-[57%]"></div>
                    <div className="w-[3rem] h-[3rem] bg-[#030A1B] rounded-full absolute top-[65%] left-[22%]"></div>
                    <div className="w-[3rem] h-[3rem] bg-[#030A1B] rounded-full absolute top-[30%] left-[9%]"></div>
                </div>

                <div className="absolute top-[61%] left-[55%] w-[20rem] h-[1rem] bg-[#228EE5] 712:left-[54%] 712:w-[25rem] md:left-[53%] lg:left-[52%] lg:rounded-2xl 1260:top-[60.7%] 2xl:top-[60%] 2xl:left-[51%]"></div>

                <div className="absolute top-[68%] left-[50%] -translate-x-[50%]">
                    <p
                        className={`inline-block text-[#228EE5] text-2xl tracking-widest font-medium 712:text-3xl`}
                    >
                        {text.split('').map((letra, i) => (
                            <span key={i} className={`wave-letter delay-${i}`}>
                                {letra}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </>
    );
}

import { Treadmill } from 'ldrs/react';
import 'ldrs/react/Treadmill.css';

// Default values shown
function SectionLoader() {
    return (
        <>
            <div className="absolute inset-0 h-screen z-[1000] overflow-hidden bg-[#171A21] flex items-center justify-center">
                <Treadmill size="70" speed="1.25" color="#4743E0" />
            </div>
        </>
    );
}

export default SectionLoader;

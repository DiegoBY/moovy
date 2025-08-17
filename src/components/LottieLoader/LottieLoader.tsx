import Lottie from 'lottie-react';
import lottieLoading from '../../assets/animations/LottieLoading.json';
export default function LottieLoader() {
    return (
        <div className="absolute inset-0 h-screen z-[1000] overflow-y-hidden bg-[#171A21] flex items-center justify-center">
            {' '}
            <Lottie animationData={lottieLoading} loop className="w-32 h-32" />
        </div>
    );
}

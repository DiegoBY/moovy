import { useState } from 'react';

function FadeInImage({ src, alt }: { src: string; alt: string }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className={` transition-opacity duration-700 ease-in-out 375:rounded-2xl ${
                loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLoaded(true)}
        />
    );
}

export default FadeInImage;

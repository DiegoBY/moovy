import { useState } from 'react';

function FadeInImage({ src, alt }: { src: string; alt: string }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`rounded-2xl transition-opacity duration-700 ease-in-out ${
                loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLoaded(true)}
        />
    );
}

export default FadeInImage;

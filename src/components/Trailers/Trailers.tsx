import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { api_tmdb } from '../../services/api';

const apiKey = import.meta.env.VITE_API_TMDB_KEY;

interface IsPlayProps {
    setIsPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function Trailers({ setIsPlay }: IsPlayProps) {
    const [listTrailersDublado, setListTrailersDublado] = useState([]);
    const [_, setLoading] = useState(true);

    const { type, id } = useParams<{ type: 'movie' | 'tv'; id: string }>();

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const response = await api_tmdb.get(`${type}/${id}/videos`, {
                    params: {
                        api_key: apiKey,
                        language: 'pt-BR',
                        page: 1,
                    },
                });

                const getTrailers = response.data.results;

                console.log(getTrailers);

                if (getTrailers) {
                    const dublados = getTrailers
                        .filter((dub: any) => dub.name.includes('Dublado'))
                        .map((dub: any) => dub.key);

                    let trailerSelecionado;

                    if (dublados.length > 0) {
                        const randomIndex = Math.floor(
                            Math.random() * dublados.length
                        );
                        trailerSelecionado = dublados[randomIndex];
                    } else if (getTrailers.length > 0) {
                        trailerSelecionado = getTrailers[0].key;
                    }

                    setListTrailersDublado(trailerSelecionado);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    return (
        <>
            <section className="absolute inset-0 z-[250]">
                <ReactPlayer
                    src={`https://www.youtube.com/watch?v=${listTrailersDublado}`}
                    playing
                    muted
                    controls
                    width={'100%'}
                    height={'100%'}
                    onEnded={() => setIsPlay(false)}
                />
            </section>
        </>
    );
}

export default Trailers;

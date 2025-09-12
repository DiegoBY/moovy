import { useEffect, useState } from 'react';
import type { Movie } from '@/types/Movie';

import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Favorites() {
    const [moviesTv, setMoviesTv] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 6;
    const totalPages = Math.ceil(moviesTv.length / itemPerPage);
    const initialIndex = (currentPage - 1) * itemPerPage;
    const finalIndex = initialIndex + itemPerPage;
    const itemPageCurrent = moviesTv.slice(initialIndex, finalIndex);

    useEffect(() => {
        const myList = localStorage.getItem('@moovy');
        let savedMoviesTv: Movie[] = [];

        if (myList) {
            try {
                savedMoviesTv = JSON.parse(myList);
                setMoviesTv(savedMoviesTv);
            } catch {
                setMoviesTv([]);
            }
        }
    }, []);

    const removeMovieTv = (item: Movie) => {
        let filterMovieTv = moviesTv.filter((id) => {
            return id.id !== item.id;
        });

        setMoviesTv(filterMovieTv);
        localStorage.setItem('@moovy', JSON.stringify(filterMovieTv));
    };

    const goToPage = (numeroDaPagina: number) => {
        console.log('ENTERI');
        setCurrentPage(numeroDaPagina);
    };

    return (
        <>
            <section className="my-30  px-3 712:px-10 lg:px-20 xl:px-50 2xl:px-70 1920:px-100">
                <h1 className="mb-10 text-[#4743E0] text-xl font-bold tracking-widest 712:text-2xl">
                    Meus Favoritos
                </h1>

                <div className="grid grid-cols-2 gap-4">
                    {itemPageCurrent.map((item) => (
                        <div className="relative" key={item.id}>
                            <Link to={`/${item.type}/${item.id}`}>
                                <LazyLoadImage
                                    alt={`${item.type} ${item.title}`}
                                    src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                                    effect="blur"
                                    threshold={300}
                                    className="375:rounded-2xl"
                                />
                            </Link>

                            <div
                                className="w-10 h-10 flex justify-center items-center absolute right-2 top-2 bg-[#171A21] z-[220] rounded-xl"
                                onClick={() => removeMovieTv(item)}
                            >
                                <Icon
                                    icon="heroicons:trash"
                                    className={` cursor-pointer w-8 h-8 712:w-12 712:h-12 `}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full grid grid-cols-4 mt-5 gap-5">
                    {totalPages > 1 &&
                        Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => goToPage(index + 1)}
                                className={`${
                                    currentPage === index + 1
                                        ? 'bg-[#4743E0] text-[#fff]'
                                        : 'bg-[#4743E0]/50 text-[#fff]/50'
                                } px-4 py-1  rounded-sm `}
                            >
                                {index + 1}
                            </button>
                        ))}
                </div>
            </section>
        </>
    );
}

export default Favorites;

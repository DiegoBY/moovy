export type Genre = {
    id: number;
    name: string;
};

export type Movie = {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    backdrop_path: string;
    poster_path: string;
    genre_ids?: number[];
    genres?: Genre[];
};

import Banner from '@/components/MainHome/Banner';
import TrendingList from '@/components/TrendingList/TrendingList';

export function Home() {
    return (
        <>
            <Banner type="movie" category="popular" />
            <TrendingList
                category="popular"
                type="movie"
                titleSection="Filmes em alta"
            />
            <TrendingList
                category="upcoming"
                type="movie"
                titleSection="Filmes Chegando"
            />

            <TrendingList
                category="now_playing"
                type="movie"
                titleSection="Filmes em Cartaz"
            />
        </>
    );
}

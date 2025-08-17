import Banner from '@/components/MainHome/Banner';
import TrendingList from '@/components/TrendingList/TrendingList';

export function Home() {
    return (
        <>
            <Banner />
            <TrendingList type="movie" titleSection="Filmes" />
            <TrendingList type="tv" titleSection="Séries" />
        </>
    );
}

import Banner from '@/components/MainHome/Banner';
import TrendingList from '@/components/TrendingList/TrendingList';

function SeriesTV() {
    return (
        <>
            <section className="mt-30">
                <Banner type="tv" category="popular" />

                <TrendingList
                    category="popular"
                    type="tv"
                    titleSection="Séries em alta"
                />

                <TrendingList
                    category="top_rated"
                    type="tv"
                    titleSection="Séries mais avaliadas"
                />

                <TrendingList
                    category="airing_today"
                    type="tv"
                    titleSection="Séries no ar hoje"
                />
            </section>
        </>
    );
}

export default SeriesTV;

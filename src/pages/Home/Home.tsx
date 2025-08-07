import MainHome from '../../components/MainHome/MainHome';
import Recommendations from '../../components/Recommendations/Recommendations';
import TopRated from '../../components/TopRated/TopRated';

export function Home() {
    return (
        <>
            <MainHome />
            <Recommendations />
            <TopRated />
        </>
    );
}

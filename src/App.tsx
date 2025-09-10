import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';

import Header from '../src/components/Header/Header';
import Footer from './components/Footer/Footer';
import MovieDetails from './pages/MovieDetails/MovieDatails';

import './App.css';
import NotFound from './components/NotFound/NotFound';
import Favorites from './pages/Favorites/Favorites';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:type/:id" element={<MovieDetails />} />
                    <Route path="/favoritos" element={<Favorites />} />
                    <Route path="*" element={<NotFound code={404} />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;

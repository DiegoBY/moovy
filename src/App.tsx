import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';

import Header from '../src/components/Header/Header';
import Footer from './components/Footer/Footer';
import MovieDetails from './pages/MovieDetails/MovieDatails';

import './App.css';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;

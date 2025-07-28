import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';

import Header from '../src/components/Header/Header';
import DetailsMovies from '../src/pages/DetailsMovies/DetailsMovies';

import './App.css';

function App() {
    return (
        <>
            <Header />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<DetailsMovies />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;

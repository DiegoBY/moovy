import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';

import Header from '../src/components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.css';
import SearchTvOrMovie from './pages/SearchTvOrMovie/SearchTvOrMovie';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchTvOrMovie />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;

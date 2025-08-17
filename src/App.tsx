import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';

import Header from '../src/components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
    return (
        <>
            <Header />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
            <Footer />
        </>
    );
}

export default App;

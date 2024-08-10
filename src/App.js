import React from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom';
import MainPage from './components/MainPage';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/dashboard/:id" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;

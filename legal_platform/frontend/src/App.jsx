import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import SpaceBackground from './components/SpaceBackground';
import CursorGlobe from './components/CursorGlobe';
import ScrollTabs from './components/ScrollTabs';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SpaceBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<><ScrollTabs /><CursorGlobe /><HomePage /></>} />
          <Route path="/analyze" element={<AnalyzePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

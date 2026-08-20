import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SinglePlayer from './pages/SinglePlayer';

const PAGE_TITLES = {
  zh: '二刺猿笑传之猜猜呗',
  en: 'Anime Character Guessr'
};

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const isEnglish = new URLSearchParams(location.search).get('lang') === 'en';
    document.title = isEnglish ? PAGE_TITLES.en : PAGE_TITLES.zh;
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element={<SinglePlayer />} />
      <Route path="/singleplayer" element={<SinglePlayer />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

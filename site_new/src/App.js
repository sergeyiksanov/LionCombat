import { Routes, Route } from 'react-router-dom';
import GameScreen from './components/GameScreen';
import LevelsScreen from './components/LevelsScreen';
import RatingScreen from './components/RatingScreen';
import PrizesScreen from './components/PrizesScreen';
import { Button } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const App = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
      <nav className="bottom-nav" style={{marginBottom: '16px'}}>
        <Button onClick={() => {
          setCurrentPage(0);
          navigate('/')
        }} style={{marginRight: '8px', color: currentPage === 0 ? '#33ff3c' : ''}}>Игра</Button>
        <Button onClick={() => {
          setCurrentPage(1);
          navigate('/rating')
        }} style={{marginRight: '8px', color: currentPage === 1 ? '#33ff3c' : ''}}>Рейтинг</Button>
        <Button onClick={() => {
          setCurrentPage(2);
          navigate('/prizes')
        }} style={{color: currentPage === 2 ? '#33ff3c' : ''}}>Призы</Button>
      </nav>
      <div>
      <Routes>
        <Route path="/" element={<GameScreen />} />
        <Route path="/levels" element={<LevelsScreen />} />
        <Route path="/rating" element={<RatingScreen />} />
        <Route path="/prizes" element={<PrizesScreen />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;

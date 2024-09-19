import { Routes, Route, Link } from 'react-router-dom';
import GameScreen from './components/GameScreen';
import LevelsScreen from './components/LevelsScreen';
import RatingScreen from './components/RatingScreen';
import PrizesScreen from './components/PrizesScreen';
import { Button } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
      <div>
      <Routes>
        <Route path="/" element={<GameScreen />} />
        <Route path="/levels" element={<LevelsScreen />} />
        <Route path="/rating" element={<RatingScreen />} />
        <Route path="/prizes" element={<PrizesScreen />} />
      </Routes>
      </div>
      <nav className="bottom-nav" style={{position: 'absolute', bottom: 0, marginBottom: '16px'}}>
        <Button onClick={() => navigate('/')} style={{marginRight: '8px'}}>Игра</Button>
        <Button onClick={() => navigate('/rating')} style={{marginRight: '8px'}}>Рейтинг</Button>
        <Button onClick={() => navigate('/prizes')}>Призы</Button>
      </nav>
    </div>
  );
};

export default App;

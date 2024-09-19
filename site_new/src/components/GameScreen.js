import React, { useState } from 'react'; // Добавляем useState
import { useNavigate } from 'react-router-dom';
import { Button, Progress } from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import ButtonImage from './button-image.png';

const GameScreen = () => {
  const [points, setPoints] = useState(0); // Теперь ошибка должна исчезнуть
  const navigate = useNavigate();
  const level = 'Уровень 1';
  const progress = points;

  return (
    <div className="game-screen" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
      <Button style={{marginBottom: '16px'}} onClick={() => navigate('/levels')} view='flat-action' size='xl'>
        {level}
      </Button>
      {/* <h2 onClick={() => navigate('/levels')}>{level}</h2> */}
      <Progress style={{width: '100%'}} value={progress} theme='success' stack={[{color: '#33ff3c', value: progress},]}/>
      <h3>{points} Р</h3>
      <Button onClick={() => setPoints(points + 1)} view="flat" pin='circle-circle' size="xs" style={{height: 'auto'}}>
        <img src={ButtonImage} width="192px"/>
      </Button>
    </div>
  );
};

export default GameScreen;

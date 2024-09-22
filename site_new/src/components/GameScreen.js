import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Progress, UserLabel, Loader } from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import ButtonImage from './../images/button-image.png';

const baseUrl = '/api/api';

const GameScreen = () => {
  // const WebApp = window.Telegram.WebApp;
  // const initDataUnsafe = WebApp.initDataUnsafe.user;

  const idForTest = '6228723943';
  const usernameForTest = 'sergeyiksanov';

  const [user, setUser] = useState(null);
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [initialPoints, setInitialPoints] = useState(0);
  const [pointsToSend, setPointsToSend] = useState(0); // Накопленные очки
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем информацию о пользователе
        const userResponse = await fetch(baseUrl + "/users/auth", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          },
          // body: JSON.stringify({ id: String(initDataUnsafe.id), username: initDataUnsafe.username }),
          body: JSON.stringify({ id: idForTest, username: usernameForTest })
        });

        const userData = await userResponse.json();
        setUser(userData.data);
        setInitialPoints(userData.data.CountPoints);

        // Получаем список всех уровней
        const levelsResponse = await fetch(baseUrl + "/levels", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          },
        });

        const levelsData = await levelsResponse.json();
        setLevels(levelsData.data);

        // Устанавливаем текущий уровень
        const currentLvl = levelsData.data.find(level => level.ID === userData.data.LevelID);
        setCurrentLevel(currentLvl);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Обработчик закрытия вкладки или перезагрузки страницы
    const handleUnload = async () => {
      console.log("SEND POINTS");
      if (pointsToSend > 0) {
        await fetch(baseUrl + `/users/add_points`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          },
          body: JSON.stringify({ id: idForTest, add_count_points: pointsToSend }) // Отправляем накопленные очки
        });
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [idForTest, usernameForTest, pointsToSend]);

  const handleAddPoints = () => {
    if (initialPoints + pointsToSend + 1 >= currentLevel.NeedPoints) {
      const nextLevel = levels.find(level => level.LevelNumber === currentLevel.LevelNumber + 1);
      if (nextLevel) {
        setCurrentLevel(nextLevel); // Обновляем уровень только в интерфейсе
      }
    }
    setPointsToSend(pointsToSend + 1);
  };


  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size="l" style={{color: '#33ff3c'}} />
      </div>
    );
  }

  const progress = points;

  return (
    <div className="game-screen" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '100px' }}>
      <h1 style={{ width: '100%', textAlign: 'center' }}>Lion Combat</h1>
      <UserLabel type="person" style={{ width: "100%", marginBottom: '16px' }}>{user?.Username}</UserLabel>
      <Button style={{ marginBottom: '16px', width: '100%' }} onClick={() => navigate('/levels')} view='outlined' size='xl'>
        {currentLevel?.Name + " (" + currentLevel?.LevelNumber + ")"}
      </Button>
      <Progress value={initialPoints + pointsToSend} style={{ width: '100%' }} size='m' theme='default' stack={[{ color: '#33ff3c', value: initialPoints + pointsToSend }]} />
      <h3>{points}</h3>
      <Button onClick={() => handleAddPoints} view="flat" pin='circle-circle' size="xs" style={{ height: 'auto' }}>
        <img src={ButtonImage} width="192px" />
      </Button>
    </div>
  );
};

export default GameScreen;
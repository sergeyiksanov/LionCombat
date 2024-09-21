import React, { useState, useEffect } from 'react'; // Добавляем useEffect
import { useNavigate } from 'react-router-dom';
import { Button, Progress, UserLabel, Loader } from '@gravity-ui/uikit'; // Добавляем Loader
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import ButtonImage from './../images/button-image.png';

const baseUrl = 'https://5d23-176-59-18-45.ngrok-free.app/api';

const GameScreen = () => {
  const WebApp = window.Telegram.WebApp;
  const initDataUnsafe = WebApp.initDataUnsafe.user;

  const [user, setUser] = useState(null); // Делаем начальное значение null
  const [level, setLevel] = useState("");
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true); // Лоадер

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрос на авторизацию пользователя
        const userResponse = await fetch(baseUrl + "/users/auth", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          },
          body: JSON.stringify({ id: String(initDataUnsafe.id), username: initDataUnsafe.username })
        });

        const userData = await userResponse.json();
        setUser(userData.data);
        setPoints(userData.data.CountPoints);

        // Запрос на получение уровня пользователя
        const levelResponse = await fetch(baseUrl + "/level?id=" + String(userData.data.LevelID), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          },
        });

        const levelData = await levelResponse.json();
        setLevel(levelData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Отключаем лоадер после загрузки данных
      }
    };

    fetchData(); // Вызов функции при монтировании компонента
  }, [initDataUnsafe.id, initDataUnsafe.username]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size="l" style={{color: '#33ff3c'}}/>
      </div>
    );
  }

  const progress = points;

  return (
    <div className="game-screen" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '100px' }}>
      <h1 style={{ width: '100%', textAlign: 'center' }}>Lion Combat</h1>
      <UserLabel type="person" style={{ width: "100%", marginBottom: '16px' }}>{JSON.stringify(user)}</UserLabel>
      <Button style={{ marginBottom: '16px', width: '100%' }} onClick={() => navigate('/levels')} view='outlined' size='xl'>
        {JSON.stringify(level.Name) + " (" + JSON.stringify(level.LevelNumber) + ")"}
      </Button>
      <Progress value={progress} style={{ width: '100%' }} size='m' theme='default' stack={[{ color: '#33ff3c', value: progress }]} />
      <h3>{points}</h3>
      <Button onClick={() => setPoints(points + 1)} view="flat" pin='circle-circle' size="xs" style={{ height: 'auto' }}>
        <img src={ButtonImage} width="192px" />
      </Button>
    </div>
  );
};

export default GameScreen;

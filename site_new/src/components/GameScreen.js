import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Progress, UserLabel, Loader } from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import ButtonImage from './../images/button-image.png';

const baseUrl = 'https://5d23-176-59-18-45.ngrok-free.app/api';

const GameScreen = () => {
  const WebApp = window.Telegram.WebApp;
  const initDataUnsafe = WebApp.initDataUnsafe.user;

  const [user, setUser] = useState(null);
  const [level, setLevel] = useState("");
  const [points, setPoints] = useState(0);
  const [pointsToSend, setPointsToSend] = useState(0); // Очки, которые нужно отправить на сервер
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const intervalRef = useRef(null);

  // Функция отправки очков на сервер
  const sendPointsToServer = async () => {
    if (pointsToSend > 0) {
      try {
        const response = await fetch(baseUrl + '/users/add_points', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          },
          body: JSON.stringify({
            id: String(initDataUnsafe.id),
            add_count_points: pointsToSend
          })
        });

        const userData = await response.json();
        
        // Обновляем состояние пользователя и уровень
        setUser(userData.data);
        setPoints(userData.data.CountPoints);

        // Если уровень изменился, отправляем новый запрос для получения уровня
        if (userData.data.LevelID !== user.LevelID) {
          const levelResponse = await fetch(baseUrl + "/level?id=" + String(userData.data.LevelID), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': true
            },
          });
          const levelData = await levelResponse.json();
          setLevel(levelData.data);
        }

        setPointsToSend(0); // Сбрасываем количество отправленных очков
      } catch (error) {
        console.error('Error sending points:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setLoading(false);
      }
    };

    fetchData();

    // Отправляем очки на сервер каждые 10 секунд
    intervalRef.current = setInterval(() => {
      sendPointsToServer();
    }, 10000);

    // Отправляем очки перед закрытием/обновлением страницы
    const handleBeforeUnload = () => {
      sendPointsToServer();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(intervalRef.current); // Очищаем интервал при размонтировании
      window.removeEventListener('beforeunload', handleBeforeUnload); // Удаляем обработчик события
    };
  }, [pointsToSend, initDataUnsafe.id, initDataUnsafe.username, user]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size="l" />
      </div>
    );
  }
  const handleButtonClick = () => {
    setPoints(points + 1);
    setPointsToSend(pointsToSend + 1); // Увеличиваем количество очков для отправки
  };

  return (
    <div className="game-screen" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '100px' }}>
      <h1 style={{ width: '100%', textAlign: 'center' }}>Lion Combat</h1>
      <UserLabel type="person" style={{ width: "100%", marginBottom: '16px' }}>{user?.Username}</UserLabel>
      <Button style={{ marginBottom: '16px', width: '100%' }} onClick={() => navigate('/levels')} view='outlined' size='xl'>
        {level + " (" + level + ")"}
      </Button>
      <Progress value={points} style={{ width: '100%' }} size='m' theme='default' stack={[{ color: '#33ff3c', value: points }]} />
      <h3>{points}</h3>

      {/* Кнопка для добавления поинтов */}
      <Button 
        onClick={handleButtonClick} 
        view="flat" 
        pin='circle-circle' 
        size="xs" 
        style={{
          height: 'auto', 
          width: '192px', 
          padding: '10px', 
          borderRadius: '50%', 
          overflow: 'hidden', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.1s',
        }}
        onTouchStart={(e) => e.target.style.transform = 'scale(0.95)'}
        onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
      >
        <img src={ButtonImage} width="100%" style={{ borderRadius: '50%' }} />
      </Button>
    </div>
  );
};

export default GameScreen;
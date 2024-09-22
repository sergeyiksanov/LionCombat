import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Progress, UserLabel, Loader } from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import Level1Image from './../images/level_1.png';
import Level2Image from './../images/level_2.png';
import Level3Image from './../images/level_3.png';
import Level4Image from './../images/level_4.png';
import Level5Image from './../images/level_5.png';
import Level6Image from './../images/level_6.png';
import Level7Image from './../images/level_7.png';
import Level8Image from './../images/level_8.png';
import Level9Image from './../images/level_9.png';
import Level10Image from './../images/level_10.png';
import Level11Image from './../images/level_11.png';
import Level12Image from './../images/level_12.png';
import Level13Image from './../images/level_13.png';
import Level14Image from './../images/level_14.png';
import Level15Image from './../images/level_15.png';

const baseUrl = '/api/api';

const GameScreen = () => {
  const idForTest = '6228723943';
  const usernameForTest = 'sergeyiksanov';

  const [user, setUser] = useState(null);
  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [initialPoints, setInitialPoints] = useState(0);
  const [pointsToSend, setPointsToSend] = useState(0); // Накопленные очки
  const [loading, setLoading] = useState(true);
  const [fullPoints, setFullPuints] = useState(0);

  const navigate = useNavigate();

  // Первый useEffect для загрузки данных о пользователе и уровнях
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

        // Устанавливаем начальный уровень, который пришел с данными о пользователе
        const currentLvl = levelsData.data.find(level => level.ID === userData.data.LevelID);
        setCurrentLevel(currentLvl);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [idForTest, usernameForTest, pointsToSend]);

  useEffect(() => {
    setFullPuints(initialPoints);
  }, [initialPoints]);

  // Второй useEffect для обновления уровня при изменении очков
  useEffect(() => {
    if (currentLevel && levels.length > 0) {
      const nextLevel = levels.find(level => level.ID === currentLevel?.ID + 1);
      
      if (initialPoints + pointsToSend >= nextLevel?.NeedPoints) {
        setCurrentLevel(nextLevel);
      }
    }
  }, [pointsToSend, currentLevel, initialPoints, levels]);

  const timeoutRef = useRef(null);

  useEffect(() => {
    console.log("TIMER");
    if (pointsToSend > 0) {
      timeoutRef.current = setTimeout(async () => {
        console.log("SEND POINTS");
        await fetch(baseUrl + "/users/add_points", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          },
          body: JSON.stringify({ id: idForTest, add_count_points: pointsToSend })
        }).finally(() => {
          setPointsToSend(0);
        });
        setPointsToSend(0);
      }, 500)
    }
  });

  const handleAddPoints = () => {
    clearTimeout(timeoutRef.current);
    setFullPuints(fullPoints + 1);
    setPointsToSend(pointsToSend + 1);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size="l" style={{color: '#33ff3c'}} />
      </div>
    );
  }

  const progress = fullPoints / levels?.find(level => level.ID === currentLevel?.ID + 1)?.NeedPoints * 100;

  return (
    <div className="game-screen" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '100px' }}>
      <h1 style={{ width: '100%', textAlign: 'center' }}>Lion Kombat</h1>
      <UserLabel type="person" style={{ width: "100%", marginBottom: '16px' }}>{user?.Username}</UserLabel>
      <Button style={{ marginBottom: '16px', width: '100%' }} onClick={() => navigate('/levels')} view='outlined' size='xl'>
        {currentLevel?.Name + " (" + currentLevel?.LevelNumber + ")"}
      </Button>
      <Progress value={progress} style={{ width: '100%' }} size='m' theme='default' stack={[{ color: '#33ff3c', value: progress }]} />
      <h3>{fullPoints} / {levels.find(level => level.ID === currentLevel?.LevelNumber + 1)?.NeedPoints}</h3>
      <Button onClick={handleAddPoints} view="flat" pin='circle-circle' size="xs" style={{ height: 'auto', backgroundColor: '#1c181c', borderRadius: '50%' }}>
        <img src={() => {
          if (currentLevel.ID == 1) return Level1Image;
          else if (currentLevel.ID == 2) return Level2Image;
          else if (currentLevel.ID == 3) return Level3Image;
          else if (currentLevel.ID == 4) return Level4Image;
          else if (currentLevel.ID == 5) return Level5Image;
          else if (currentLevel.ID == 6) return Level6Image;
          else if (currentLevel.ID == 7) return Level7Image;
          else if (currentLevel.ID == 8) return Level8Image;
          else if (currentLevel.ID == 9) return Level9Image;
          else if (currentLevel.ID == 10) return Level10Image;
          else if (currentLevel.ID == 11) return Level11Image;
          else if (currentLevel.ID == 12) return Level12Image;
          else if (currentLevel.ID == 13) return Level13Image;
          else if (currentLevel.ID == 14) return Level14Image;
          else return Level15Image;
        }} width="192px" />
      </Button>
    </div>
  );
};

export default GameScreen;
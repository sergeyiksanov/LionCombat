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
import Level16Image from './../images/level_16.png';
import Level17Image from './../images/level_17.png';
import Level18Image from './../images/level_18.png';
import Level19Image from './../images/level_19.png';
import Level20Image from './../images/level_20.png';

const baseUrl = '/debug/api/api';

function getLevelInfo(currentPoints, levels) {
  const curL = levels[0];
  for (const level in levels) {
    if (currentPoints >= level.NeedPoints) {
      curL = level
    }
  }

  return curL;
}

function getNextLevelInfo(currentPoints, levels) {
  for (const level in levels) {
    if (currentPoints < level.NeedPoints) {
      return level.NeedPoints;
    }
  }

  return -1;
}

const GameScreen = () => {
  const webApp = window.Telegram.WebApp;
  const userDataTg = webApp.initDataUnsafe.user;

  const [user, setUser] = useState(null);
  const [levels, setLevels] = useState([]);
  const [initialPoints, setInitialPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pointsToSend, setPointsToSend] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  
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
          body: JSON.stringify({ id: String(userDataTg.id), username: userDataTg.username })
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

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [userDataTg.id, userDataTg.username]);

  useEffect(() => {
    setPointsToSend(initialPoints);
  }, [initialPoints]);

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("SEND POINTS");
      if (hasChanges) {
        await fetch(baseUrl + "/users/add_points", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': true
          },
          body: JSON.stringify({ id: String(userDataTg.id), add_count_points: pointsToSend })
        }).finally(() => {
          setHasChanges(false);
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [hasChanges]);

  const handleAddPoints = () => {
    setPointsToSend(pointsToSend + 1);
    setHasChanges(true);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size="l" style={{color: '#33ff3c'}} />
      </div>
    );
  }

  const progress = (pointsToSend / (getNextLevelInfo(pointsToSend, levels) !== -1 ? getNextLevelInfo(pointsToSend, levels) : 100)) * 100;
  
  return (
    <div className="game-screen" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%', 
      paddingTop: '100px' 
    }}>
      <h1 style={{ width: '100%', textAlign: 'center' }}>Lion Kombat</h1>
      
      <UserLabel 
        type="person" 
        style={{ 
          width: '100%', 
          textAlign: 'center', 
          marginBottom: '16px' 
        }}
      >
        {user?.Username}
      </UserLabel>
      
      <Button 
        style={{ 
          marginBottom: '16px', 
          width: '100%', 
          maxWidth: '400px', 
          textAlign: 'center' 
        }} 
        onClick={() => navigate('/levels')} 
        view='outlined' 
        size='xl'
      >
        {getLevelInfo(pointsToSend, levels).Name + " (" + getLevelInfo(pointsToSend, levels).LevelNumber + ")"}
      </Button>
      
      <div style={{ width: '192px' }}>
      <Progress 
        value={progress} 
        style={{ 
          width: '100%',
          marginBottom: '16px' 
        }} 
        size='m' 
        theme='default' 
        stack={[{ color: '#33ff3c', value: progress }]} 
      />
      </div>
      
      <h3>{pointsToSend} / {getNextLevelInfo(pointsToSend, levels) !== -1 ? getNextLevelInfo(pointsToSend, levels) : "∞"}</h3>
      
      <Button 
        onClick={handleAddPoints} 
        view="flat" 
        pin='circle-circle' 
        size="xs" 
        style={{ 
          height: 'auto', 
          backgroundColor: '#1c181c', 
          borderRadius: '50%', 
          textAlign: 'center' 
        }}
      >
        <img 
          src={
            getLevelInfo(pointsToSend, levels).ID === 1 || getLevelInfo(pointsToSend, levels).ID === null ? Level1Image :
            getLevelInfo(pointsToSend, levels).ID === 2 ? Level2Image :
            getLevelInfo(pointsToSend, levels).ID === 3 ? Level3Image :
            getLevelInfo(pointsToSend, levels).ID === 4 ? Level4Image :
            getLevelInfo(pointsToSend, levels).ID === 5 ? Level5Image :
            getLevelInfo(pointsToSend, levels).ID === 6 ? Level6Image :
            getLevelInfo(pointsToSend, levels).ID === 7 ? Level7Image :
            getLevelInfo(pointsToSend, levels).ID === 8 ? Level8Image :
            getLevelInfo(pointsToSend, levels).ID === 9 ? Level9Image :
            getLevelInfo(pointsToSend, levels).ID === 10 ? Level10Image :
            getLevelInfo(pointsToSend, levels).ID === 11 ? Level11Image :
            getLevelInfo(pointsToSend, levels).ID === 12 ? Level12Image :
            getLevelInfo(pointsToSend, levels).ID === 13 ? Level13Image :
            getLevelInfo(pointsToSend, levels).ID === 14 ? Level14Image : 
            getLevelInfo(pointsToSend, levels).ID === 15 ? Level15Image : 
            getLevelInfo(pointsToSend, levels).ID === 16 ? Level16Image : 
            getLevelInfo(pointsToSend, levels).ID === 17 ? Level17Image : 
            getLevelInfo(pointsToSend, levels).ID === 18 ? Level18Image : 
            getLevelInfo(pointsToSend, levels).ID === 19 ? Level19Image : 
            Level20Image
          } 
          width="192px"
        />
      </Button>
    </div>
    
  );
};

export default GameScreen;
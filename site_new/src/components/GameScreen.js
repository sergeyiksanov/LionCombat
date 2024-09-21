import React, { useState } from 'react'; // Добавляем useState
import { useNavigate } from 'react-router-dom';
import { Button, Progress, UserLabel } from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import ButtonImage from './../images/button-image.png';

const baseUrl = 'https://5d23-176-59-18-45.ngrok-free.app/api'

const GameScreen = () => {
  const WebApp = window.Telegram.WebApp;
  const initDataUnsafe = WebApp.initDataUnsafe.user;

  const [user, setUser] = useState();
  const [level, setLevel] = useState("");
  const [points, setPoints] = useState(0);
  fetch(baseUrl + "/users/auth", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true
    },
    body: JSON.stringify({id: String(initDataUnsafe.id), username: initDataUnsafe.username})
  }).then(response => response.text())
  .then(data => {
    setUser(JSON.parse(data).data);
    // setPoints(user.CountPoints);
    
    // fetch(baseUrl + "/level?id=" + String(user.LevelID), {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'ngrok-skip-browser-warning': true
    //   },
    // }).then(response => response.text())
    // .then(data => {
    //   setLevel(JSON.parse(data).data);
    // })
  });

  const navigate = useNavigate();
  const progress = points;

  return (
    <div className="game-screen"  style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '100px'}}>
      <h1 style={{width: '100%', textAlign: 'center'}}>Lion Combat</h1>
      <UserLabel type="person" style={{width: "100%", marginBottom: '16px'}}>user.Username</UserLabel>
      <Button style={{marginBottom: '16px', width: '100%'}} onClick={() => navigate('/levels')} view='outlined' size='xl'>
        {level + " (" + level + ")"}
      </Button>
      <Progress value={progress} style={{width: '100%'}} size='m' theme='default' stack={[{color: '#33ff3c', value: progress},]}/>
      <h3>{points}</h3>
      <Button onClick={() => setPoints(points + 1)} view="flat" pin='circle-circle' size="xs" style={{height: 'auto'}}>
        <img src={ButtonImage} width="192px"/>
      </Button>
    </div>
  );
};

export default GameScreen;

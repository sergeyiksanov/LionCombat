import React, { useState } from 'react'; // Добавляем useState
import { useNavigate } from 'react-router-dom';
import { Button, Progress, UserLabel } from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import ButtonImage from './../images/button-image.png';

const baseUrl = 'https://5d23-176-59-18-45.ngrok-free.app/api'


/*
ID:{\
"initData\":\"query_id=AAHnyEJzAgAAAOfIQnPPjork\u0026user=%7B%22id%22%3A6228723943%2C%22first_name%22%3A%22%D0%A1%D0%B5%D1%80%D1%91%D0%B6%D0%B0%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22sergeyiksanov%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D\u0026auth_date=1726949472\u0026hash=6b765bbb3599c65d3204e4f767ea61686159dd8c6624752eef44fbf32a20d6a6\",\
"initDataUnsafe\":{\
"query_id\":\"AAHnyEJzAgAAAOfIQnPPjork\",\
"user\":{\
"id\":6228723943,\"first_name\":\"Серёжа\",\"last_name\":\"\",\"username\":\"sergeyiksanov\",\"language_code\":\"ru\",\"allows_write_to_pm\":true},\"auth_date\":\"1726949472\",\"hash\":\"6b765bbb3599c65d3204e4f767ea61686159dd8c6624752eef44fbf32a20d6a6\"},\"version\":\"7.10\",\"platform\":\"android\",\"colorScheme\":\"dark\",\"themeParams\":{\"bg_color\":\"#1e1e1e\",\"section_bg_color\":\"#191818\",\"secondary_bg_color\":\"#000000\",\"text_color\":\"#ffffff\",\"hint_color\":\"#7d7d7d\",\"link_color\":\"#d7729f\",\"button_color\":\"#e26fa0\",\"button_text_color\":\"#ffffff\",\"header_bg_color\":\"#252323\",\"accent_text_color\":\"#e67fab\",\"section_header_text_color\":\"#eb85ac\",\"subtitle_text_color\":\"#7f7e7e\",\"destructive_text_color\":\"#ee686f\",\"section_separator_color\":\"#000000\",\"bottom_bar_bg_color\":\"#000000\"},\"isExpanded\":true,\"viewportHeight\":700,\"viewportStableHeight\":700,\"isClosingConfirmationEnabled\":false,\"isVerticalSwipesEnabled\":true,\"headerColor\":\"#1e1e1e\",\"backgroundColor\":\"#1e1e1e\",\"bottomBarColor\":\"#000000\",\"BackButton\":{\"isVisible\":false},\"MainButton\":{\"type\":\"main\",\"text\":\"Continue\",\"color\":\"#e26fa0\",\"textColor\":\"#ffffff\",\"isVisible\":false,\"isProgressVisible\":false,\"isActive\":true,\"hasShineEffect\":false},\"SecondaryButton\":{\"type\":\"secondary\",\"text\":\"Cancel\",\"color\":\"#000000\",\"textColor\":\"#e26fa0\",\"isVisible\":false,\"isProgressVisible\":false,\"isActive\":true,\"hasShineEffect\":false,\"position\":\"left\"},\"SettingsButton\":{\"isVisible\":false},\"HapticFeedback\":{},\"CloudStorage\":{},\"BiometricManager\":{\"isInited\":false,\"isBiometricAvailable\":false,\"biometricType\":\"unknown\",\"isAccessRequested\":false,\"isAccessGranted\":false,\"isBiometricTokenSaved\":false,\"deviceId\":\"\" 
*/

const GameScreen = () => {
  const WebApp = window.Telegram.WebApp;
  const initDataUnsafe = WebApp.initDataUnsafe.user;

  const [user, setUser] = useState();
  fetch(baseUrl + "/users/auth", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true
    },
    body: JSON.stringify({id: String(initDataUnsafe.id), username: initDataUnsafe.username, avatar_url: initDataUnsafe.photo_url})
  }).then(response => response.text())
  .then(data => {
    console.log(JSON.parse(data).data);
    setUser(JSON.parse(data).data);
  })

  const [points, setPoints] = useState(0); // Теперь ошибка должна исчезнуть
  const navigate = useNavigate();
  const level = 'Уровень 1';
  const progress = points;

  return (
    <div className="game-screen"  style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '100px'}}>
      <h1 style={{width: '100%', textAlign: 'center'}}>Lion Combat</h1>
      <UserLabel type="person" style={{width: "100%", marginBottom: '16px'}}>Charlie Darwin</UserLabel>
      <Button style={{marginBottom: '16px', width: '100%'}} onClick={() => navigate('/levels')} view='outlined' size='xl'>
        {level}
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

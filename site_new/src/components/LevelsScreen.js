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
import LockImage from './../images/Lock@3x.svg';
import { useState, useEffect } from 'react';

const baseUrl = '/api/api'
  
const LevelsScreen = () => {
  const [user, setUser] = useState(null);
  const [levels, setLevels] = useState([]);

  const idForTest = '6228723943';
  const usernameForTest = 'sergeyiksanov';

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
      }
    };

    fetchData();

  }, [idForTest, usernameForTest]);

  const items = levels.map((level) => {
    console.log(level)
    if (level.ID <= user.LevelID) {
      return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '16px', marginBottom: '16px', border: '2px solid #33ff3c', padding: '16px', borderRadius: '16px'}}>
          <img src={
          currentLevel.ID === 1 || currentLevel.ID === null ? Level1Image :
          currentLevel.ID === 2 ? Level2Image :
          currentLevel.ID === 3 ? Level3Image :
          currentLevel.ID === 4 ? Level4Image :
          currentLevel.ID === 5 ? Level5Image :
          currentLevel.ID === 6 ? Level6Image :
          currentLevel.ID === 7 ? Level7Image :
          currentLevel.ID === 8 ? Level8Image :
          currentLevel.ID === 9 ? Level9Image :
          currentLevel.ID === 10 ? Level10Image :
          currentLevel.ID === 11 ? Level11Image :
          currentLevel.ID === 12 ? Level12Image :
          currentLevel.ID === 13 ? Level13Image :
          currentLevel.ID === 14 ? Level14Image : 
          Level15Image
        } width={'100px'} style={{marginRight: '16px'}}/>
          <div>
            <p style={{fontWeight: 'bold'}}>{level.Name}</p>
            <p>Необходимо: {level.NeedPoints}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '16px', marginBottom: '16px', padding: '16px', borderRadius: '16px', background: '#393439'}}>
          <img src={LockImage} width={'100px'} style={{marginRight: '16px'}}/>
          <div>
            <p style={{fontWeight: 'bold'}}>{level.Name}</p>
            <p>Необходимо: {level.NeedPoints}</p>
          </div>
        </div>
      );
    }
  });
  
  return (
    <div className="levels-screen">
      {items}
    </div>
  );
};
  
export default LevelsScreen;
  
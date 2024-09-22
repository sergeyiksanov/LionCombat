import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import ButtonImage from './../images/level_1.png';
import LockImage from './../images/Lock@3x.svg';
import { useState } from 'react';

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

  }, [idForTest, usernameForTest, pointsToSend]);

  const items = levels.map((level) => {
    console.log(level)
    if (level.ID <= user.LevelID) {
      return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '16px', marginBottom: '16px', border: '2px solid #33ff3c', padding: '16px', borderRadius: '16px'}}>
          <img src={ButtonImage} width={'100px'} style={{marginRight: '16px'}}/>
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
  
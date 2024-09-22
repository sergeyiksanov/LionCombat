import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import ButtonImage from './../images/level_1.png';
import LockImage from './../images/Lock@3x.svg';
import { useState } from 'react';

const baseUrl = '/api/api'
  
const LevelsScreen = () => {
  const [levels, setLevels] = useState([]);
  fetch(baseUrl + "/levels", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true
    }
  }).then(response => response.text())
  .then(data => {
    console.log(JSON.parse(data).data);
    setLevels(JSON.parse(data).data);
  })


  const items = levels.map((level) => {
    console.log(level)
    if (level.ID == 1) {
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
  
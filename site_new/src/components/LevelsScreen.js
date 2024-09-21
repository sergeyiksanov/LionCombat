import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import ButtonImage from './../images/button-image.png';
import LockIcon from './../images/Lock.svg';
import { useState } from 'react';
import { Icon } from '@gravity-ui/uikit';

const baseUrl = 'https://b4ab-176-59-18-45.ngrok-free.app'
  
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
          <Icon data={LockIcon} size={16}/>
          {/* <img src={ButtonImage} width={'100px'} style={{marginRight: '16px'}}/> */}
          <div>
            <p style={{fontWeight: 'bold'}}>{level.Name}</p>
            <p>Необходимо: {level.NeedPoints}</p>
          </div>
          <img src={ButtonImage} width={'24px'} style={{marginLeft: '16px'}}/>
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
  
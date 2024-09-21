import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import ButtonImage from './button-image.png';

const baseUrl = 'http://localhost:3001/api'
  
const LevelsScreen = () => {
  let levels = [];
  fetch(baseUrl + "/levels", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': true
    }
  }).then(response => console.log(JSON.parse(response.body())))


  const items = levels.map((level) => {
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
          <img src={ButtonImage} width={'100px'} style={{marginRight: '16px'}}/>
          <div>
            <p style={{fontWeight: 'bold'}}>{level.name}</p>
            <p>Необходимо: {level.pointsNeeded}</p>
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
  
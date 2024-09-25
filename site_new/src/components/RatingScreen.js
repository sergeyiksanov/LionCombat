import { UserLabel, Loader } from "@gravity-ui/uikit";
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import { useEffect, useState } from 'react';
  
const baseUrl = 'debug//api/api'

const RatingScreen = () => {
  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch(baseUrl + "/rating", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': true
        }
      }).then(response => response.text())
      .then(data => {
        console.log(JSON.parse(data).data);
        setRating(JSON.parse(data).data);
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size="l" style={{color: '#33ff3c'}} />
      </div>
    );
  }

  const items = rating.map((user, index) => {
    console.log(user)
    return (
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%", maxWidth: '400px', margin: '8px auto' }}>
          <h3 style={{marginRight: '8px'}}>{index + 1}</h3>
          <UserLabel type="person" style={{ width: "100%" }}>{user.Username} | {user.CountPoints} | {user.LevelID} LVL</UserLabel>
      </div>
    );
  });
  
  return (
    <div className="rating-screen">
      <h1 style={{ width: '100%', textAlign: 'center' }}>Рейтинг</h1>
      <h2 style={{ width: '100%', textAlign: 'center' }}>Юзернейм | Своишки | Уровень</h2>
      {items}
    </div>
  );
};
  
export default RatingScreen;
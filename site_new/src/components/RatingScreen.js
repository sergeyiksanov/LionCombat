import { User } from "@gravity-ui/uikit";
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import { useEffect, useState } from 'react';
  
const baseUrl = '/api/api'

const RatingScreen = () => {
  const [rating, setRating] = useState([]);

  useEffect(() => {
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
  });

  const items = rating.map((user) => {
    console.log(user)
    return (
      <User>Юзернейм: {user.Username} | Своишки: {user.Points} | Уровень: {user.LevelID}</User>
    );
  });
  
  return (
    <div className="rating-screen">
      {items}
    </div>
  );
};
  
export default RatingScreen;
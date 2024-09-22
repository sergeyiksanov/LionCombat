import { User } from "@gravity-ui/uikit";

const users = [
    { username: 'Player1', points: 150, level: '1' },
    { username: 'Player2', points: 200, level: '2' },
    // добавь остальных пользователей
  ];

  //<User>Юзернейм: {user.username} | Своишки: {user.points} | Уровень: {user.level}</User>
  
const RatingScreen = () => {
  const items = users.map((user) => {
    console.log(user)
    return (
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '16px', marginBottom: '16px'}}>
        <User>Юзернейм: {user.username} | Своишки: {user.points} | Уровень: {user.level}</User>
      </div>
    );
  });
  
  return (
    <div className="rating-screen">
      {items}
    </div>
  );
};
  
export default RatingScreen;
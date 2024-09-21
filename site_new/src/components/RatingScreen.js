import { User } from "@gravity-ui/uikit";

const users = [
    { username: 'Player1', points: 150, level: '1' },
    { username: 'Player2', points: 200, level: '2' },
    // добавь остальных пользователей
  ];
  
  const RatingScreen = () => {
    const userAvatar = ''
    
    return (
      <div className="rating-screen">
        {users.map((user) => (
          <User avatar={userAvatar}>Юзернейм: {user.username} | Своишки: {user.points} | Уровень: {user.level}</User>
        ))}
      </div>
    );
  };
  
  export default RatingScreen;
  
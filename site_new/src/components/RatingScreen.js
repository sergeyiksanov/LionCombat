import { User } from "@gravity-ui/uikit";

const users = [
    { username: 'Player1', points: 150, level: '1' },
    { username: 'Player2', points: 200, level: '2' },
    // добавь остальных пользователей
  ];
  
  const RatingScreen = () => {
    
    const items = levels.map((level) => {
      console.log(level)
      return (
        <User>Юзернейм: {user.username} | Своишки: {user.points} | Уровень: {user.level}</User>
      );
    });

    return (
      <div className="rating-screen">
        {items}
      </div>
    );
  };
  
  export default RatingScreen;
  
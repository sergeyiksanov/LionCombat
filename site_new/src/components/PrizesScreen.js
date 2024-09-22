import LockImage from './../images/Lock@3x.svg';

const users = [
    { username: 'Player1', points: 150, level: 'Уровень 1' },
    { username: 'Player2', points: 200, level: 'Уровень 2' },
    // добавь остальных пользователей
  ];
  
  const RatingScreen = () => {
    return (
      <div className="rating-screen">
        {/* {users.map((user) => (
          <div key={user.username} className="user-card">
            <h3>{user.username}</h3>
            <p>{user.points} очков</p>
            <p>{user.level}</p>
          </div>
        ))} */}
        <img src={LockImage} width={'150px'} style={{marginRight: '16px'}}/>
      </div>
    );
  };
  
  export default RatingScreen;
  
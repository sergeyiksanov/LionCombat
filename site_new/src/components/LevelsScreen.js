import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

const levels = [
    { name: 'Уровень 1', pointsNeeded: 100, unlocked: true },
    { name: 'Уровень 2', pointsNeeded: 200, unlocked: false },
    // добавь остальные уровни
  ];
  
  const LevelsScreen = () => {
    return (
      <div className="levels-screen">
        <h2 onClick={() => navigate('/levels')}>Уровни</h2>
      </div>
    );
  };
  
  export default LevelsScreen;
  
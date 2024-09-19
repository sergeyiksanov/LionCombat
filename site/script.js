(function() {
  let tapCount = 0;
  let currentLevel = 1;
  let progressPercentage = 50;

//  const user = window.Telegram.WebApp.initDataUnsafe.user;

  function getUserInfo() {
    let id = 0;
    fetch("https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits")
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
  }

  function incrementTap() {
    tapCount++;
    document.getElementById('tap-count').innerText = tapCount;
    progressPercentage = (tapCount % 100);
    updateProgress();
  }

  function updateProgress() {
    document.getElementById('progress').style.width = progressPercentage + '%';
    document.getElementById('progress-percentage').innerText = progressPercentage + '%';

    if (progressPercentage === 100) {
      currentLevel++;
      document.getElementById('level-number').innerText = `(${currentLevel})`;
      document.getElementById('level-name').innerText = 'Следующий Уровень';
      tapCount = 0;
      progressPercentage = 0;
      updateProgress();
    }
  }

  getUserInfo();
  document.getElementById('tap-button').addEventListener('click', incrementTap);
  document.getElementById('tap-button').addEventListener('touchstart', incrementTap);
})();

function navigateToLevels() {
  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('levels-screen').style.display = 'block';
}

function navigateToGame() {
  document.getElementById('levels-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';
}
import LockImage from './../images/Lock@3x.svg';
import TgPremiumImage from './../images/tg-premium.png';
import ZnachokImage from './../images/znachok.png';
import BurgerImage from './../images/burger.png';
import { Card } from '@gravity-ui/uikit';

const RatingScreen = () => {
  return (
    <div className="rating-screen">
      <Card theme='normal' type='container' view='filed' style={{ width: '192px', padding: '16px', display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '16px'}}>
        <img src={TgPremiumImage} width='100px' style={{ marginBottom: '8px' }}/>
        <p style={{ textAlign: 'center' }}>Подписка <b>Telegram Premium</b> на месяц</p>
      </Card>
      <Card theme='normal' type='container' view='filed' style={{ width: '192px', padding: '16px', display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '16px'}}>
        <img src={ZnachokImage} width='100px' style={{ marginBottom: '8px' }}/>
        <p style={{ textAlign: 'center' }}>Значки партии <b>X2</b></p>
      </Card>
      <Card theme='normal' type='container' view='filed' style={{ width: '192px', padding: '16px', display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '16px'}}>
        <img src={BurgerImage} width='100px' style={{ marginBottom: '8px' }}/>
        <p style={{ textAlign: 'center' }}>Бургер</p>
      </Card>
      <Card theme='normal' type='container' view='filed' style={{ width: '192px', padding: '16px', display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '16px'}}>
        <img src={LockImage} width='100px' style={{ marginBottom: '8px' }}/>
        <p style={{ textAlign: 'center' }}>Совместная фотография со <b>СВОЕЙ ПАРТИЕЙ</b> с автографами</p>
      </Card>
    </div>
  );
};
  
export default RatingScreen;  

import './styles/ActionButtons.css'
import Button from 'react-bootstrap/Button';

import timer from '../mobx/Timer'
import alarm from '../mobx/Alarm';

const ActionButtons = () => {
    

    return (
        <div className='ActionButtons'>
            <Button variant="success" className='ActionButton StartButton' onClick={() => timer.start()}>Начать тренировку</Button>
            <Button variant="success" className='ActionButton StopButton' onClick={() => {alarm.pauseAll()}}>Закончить тренировку</Button>
        </div>
    )
}

export default ActionButtons
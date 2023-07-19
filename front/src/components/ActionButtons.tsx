
import './styles/ActionButtons.css'
import { Button } from 'react-bootstrap';
import traning from '../classes/Traning';

const ActionButtons = () => {

    // switch(traning.status) {
    //     case TraningStatus.InProcess: return <InProcessButtons/>
    //     case TraningStatus.Pause: return <PauseButtons/>
    //     case TraningStatus.Stop: return <StopButtons/>
    // }

    return <div>
        <Button variant="success" className='ActionButton StartButton' onClick={() => traning.start()}>Старт</Button>
        <Button variant="success" className='ActionButton' onClick={() => traning.completeSet()}>Закончить подход</Button>
        {/* <Button variant="success" className='ActionButton' onClick={() => traning.pause()}>Пауза</Button>
        <Button variant="success" className='ActionButton' onClick={() => traning.resume()}>Возобновить</Button> */}
        {/* <Button variant="success" className='ActionButton' onClick={() => traning.pause()}>Пауза</Button> */}
        {/* <Button variant="success" className='ActionButton' onClick={() => traning.reset()}>Сбросить</Button> */}
        {/* <Button variant="success" className='ActionButton' onClick={() => traning.stop()}>Остановить</Button> */}
    </div>
}

const PauseButtons = () => {
    return <div className='ActionButtons'>
        {/* <Button variant="success" className='ActionButton' onClick={() => traning.resume()}>Возобновить</Button> */}
    </div>
}

const StopButtons = () => {
    return <div className='ActionButtons'>
        <Button variant="success" className='ActionButton StartButton' onClick={() => traning.start()}>Начать тренировку</Button>
        {/* <Button variant="success" className='ActionButton StopButton' onClick={() => traning.stopTraning()}>Закончить тренировку</Button> */}
    </div>
}

const InProcessButtons = () => {
    return <div className='ActionButtons'>
        {/* <Button variant="success" className='ActionButton' onClick={() => traning.finishSet()}>Закончить подход</Button>
        <Button variant="success" className='ActionButton' onClick={() => traning.pause()}>Пауза</Button> */}
    </div>
}
export default ActionButtons
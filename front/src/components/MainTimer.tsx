import { observer } from "mobx-react";
import './styles/MainTimer.css'
import traning from '../classes/Traning'

const MainTimer = observer(() => {


    return (
        <div className="MainTimer">
            <p>{traning.getTimerValue()}</p>
        </div>
    )
})

export default MainTimer
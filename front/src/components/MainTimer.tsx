import { observer } from "mobx-react";
import timer from "../mobx/Timer"
import './styles/MainTimer.css'


const MainTimer = observer(() => {

    return (
        <div className="MainTimer">
            <p>{timer.timeString}</p>
        </div>
    )
})

export default MainTimer
import './styles/CurrentActionViewer.css';
import { observer } from 'mobx-react';
import traning from '../classes/Traning'

const CurrentActionViewer = observer(() => {

    return (
        <div className="CurrentActionViewer">
            <h2>{traning.getCurrentExerciseName()}</h2>
        </div>
    )
})

export default CurrentActionViewer
import './styles/CurrentActionViewer.css';
import { observer } from 'mobx-react';
import traning from '../classes/Traning'

const CurrentActionViewer = observer(() => {

    return (
        <div className="CurrentActionViewer">
            <h2>{traning.getCurrentExercise().name}: {traning.getCurrentExercise().reps} раз</h2>
            <h2>Подход: {traning.getCurrentExercise().getCurrentSet()} из {traning.getCurrentExercise().sets}</h2>
        </div>
    )
})

export default CurrentActionViewer
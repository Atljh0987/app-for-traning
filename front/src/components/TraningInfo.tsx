import { observer } from "mobx-react"
import traning from "../classes/Traning"

const TraningInfo = observer(() => {
    return (
        <div style={{
            textAlign: "left"
        }}>
            <h3>Максимальное время тренировки: {traning.getFinishMaxTimeString()}</h3>
            <h3>Среднее время тренировки: {traning.getFinishMiddleTimeString()}</h3>
            <h3>Текущее время тренировки: {traning.getCurrentTraningTime()}</h3>
        </div>
    )
})

export default TraningInfo
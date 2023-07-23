import traning from "../classes/Traning"
import "./styles/Finish.css"


const Finish = () => {
    return (
        <div className="Finish">
            <h1>Киска-молодец-ириска!</h1>
            <h3>Время тренировки: {traning.getCurrentTraningTime()} часов</h3>
        </div>        
    )
}

export default Finish
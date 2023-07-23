import ActionButtons from "./ActionButtons"
import './styles/MainActions.css'
import MainTimer from "./MainTimer"
import CurrentActionViewer from "./CurrentActionViewer"
import TraningInfo from "./TraningInfo"

const MainActions = () => {
    return (
        <div className="MainActions">
            <MainTimer/>
            <ActionButtons/>
            <CurrentActionViewer/>
            <TraningInfo/>
            {/* <ExerciseTable/> */}
        </div>
    )
}

export default MainActions
import ExerciseTable from "./ExerciseTable"
import ActionButtons from "./ActionButtons"
import './styles/MainActions.css'
import MainTimer from "./MainTimer"
import CurrentActionViewer from "./CurrentActionViewer"

const MainActions = () => {
    return (
        <div className="MainActions">
            <MainTimer/>
            <ActionButtons/>
            <CurrentActionViewer/>
            {/* <ExerciseTable/> */}
        </div>
    )
}

export default MainActions
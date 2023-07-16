import MainActions from './MainActions'
import Statistics from './Statistics'
import './styles/MainFraim.css'
import './styles/MainActions.css'

const MainFraim = () => {


    return (
        <div className="MainFraim">            
            <MainActions/>
            <Statistics/>
        </div>
    )
}

export default MainFraim
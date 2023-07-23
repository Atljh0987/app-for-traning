import MainActions from './MainActions'
import Statistics from './Statistics'
import './styles/MainFraim.css'
import './styles/MainActions.css'
import { observer } from 'mobx-react'
import traning from '../classes/Traning'
import Finish from './Finish'

const MainFraim = observer(() => {
  return (
    <div className="MainFraim">
      {
        (traning.isFinish()) ?
          <Finish /> :
          <div className="TraningFrame">
            <MainActions />
            <Statistics />
          </div>
      }
    </div>
  )
})

export default MainFraim
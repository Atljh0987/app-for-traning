
import './styles/ActionButtons.css'
import { Button } from 'react-bootstrap';
import traning from '../classes/Traning';
import TraningExerciseStatus from '../enums/TraningExerciseStatus';
import { observer } from 'mobx-react';
// import React, { useEffect, useRef } from 'react';
// import { JsxElement } from 'typescript';

const ActionButtons = observer(() => {

  const exerciseButtonTap = () => {
    switch (traning.exerciseStatus) {
      case TraningExerciseStatus.Run: traning.completeSet(); break;
      case TraningExerciseStatus.Rest: traning.start(); break;
      default: console.log("Unknown action")
    }
  }

  return <div>
    <div></div>
    <div>
      {
        (() => {
          switch (traning.exerciseStatus) {
            case TraningExerciseStatus.Run: 
              return <Button variant="success" className='ActionButton' onClick={() => exerciseButtonTap()}>Закончить подход</Button>
            case TraningExerciseStatus.Rest: 
              return <Button disabled={traning.isFinish()} variant="success" className='ActionButton StartButton' onClick={() => exerciseButtonTap()}>Старт</Button>;;
            default: 
              return <h1>Ошибка</h1>
          }
        })()
      }
    </div>
  </div>
})

export default ActionButtons
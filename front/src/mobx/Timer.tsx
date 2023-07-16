import { makeAutoObservable } from "mobx"
import moment from "moment";
import alarm from "./Alarm";


class Timer {
  timeString = '00:00:00';
  minutesPassed = 0;
  secondsPassed = 0;

  _timeStep: number = 10;  
  _startTime: moment.Moment | null = null;
  _interval: NodeJS.Timer | null = null;

  constructor() {
    makeAutoObservable(this)
  }

  start() {
    if (this._interval !== null || this._startTime !== null) return;

    this._startTime = moment()

    this._interval = setInterval(() => {
      this._step()
    }, this._timeStep);
  }

  stop() {
    if (this._interval === null || this._startTime === null) return;

    clearInterval(this._interval);
    this._interval = null;
    this._startTime = null;
    this.timeString = '00:00:00'
  }

  _step() {
    const thisTime = moment();

    const millisecondsNum = Math.floor(thisTime.diff(this._startTime) % 1000 / 10);
    const secondsNum = Math.floor(thisTime.diff(this._startTime, 'seconds') % 60);
    const minutesNum = Math.floor(thisTime.diff(this._startTime, 'minutes') % 60);

    const milliseconds = (millisecondsNum < 10) ? "0" + millisecondsNum : millisecondsNum;
    const seconds = (secondsNum < 10) ? "0" + secondsNum : secondsNum;
    const minutes = (minutesNum < 10) ? "0" + minutesNum : minutesNum;
    
    this.timeString = `${minutes}:${seconds}:${milliseconds}`
    this.secondsPassed = thisTime.diff(this._startTime, 'seconds')
    this.minutesPassed = thisTime.diff(this._startTime, 'minutes')

    this._startAlarm()
  }

  _startAlarm() {
    if(this.secondsPassed === 5) {
      alarm.playBugilnik()
    }
  }
}

const timer = new Timer()

export default timer 
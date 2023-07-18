import { makeAutoObservable } from "mobx"
import moment from 'moment'
import Alarm from "./Alarm";
import TimerStatus from "../enums/TimerStatus";

class Timer {
  public timeString: string = '00:00:00';
  public minutesPassed = 0;
  public secondsPassed = 0;

  private minutesBeforeAlarm: number;

  private alarm: Alarm;
  private timeStep: number = 10;
  private startTime?: moment.Moment;
  private pauseTime?: moment.Moment;
  private interval?: NodeJS.Timer;
  private isAlarmRinging: boolean = false;

  constructor(minutes: number, alarm: Alarm) {
    makeAutoObservable(this)

    this.alarm = alarm
    this.minutesBeforeAlarm = minutes
  }

  public start(): void {
    if (this.status() !== TimerStatus.Stop) return;

    this.startTime = moment();
    this.setIntervalFunction();
  }

  public pause(): void {
    if (this.status() !== TimerStatus.Run) return;

    this.pauseTime = moment()

    clearInterval(this.interval);
    this.interval = undefined;
  }

  public stop(): void {
    this.pause()
    this.reset()
  }

  public resume(): void {
    if (this.status() !== TimerStatus.Pause) return;

    const pauseInSeconds: number = this.pauseTime!.diff(this.startTime, 'milliseconds');
    this.startTime = moment().subtract(pauseInSeconds, 'milliseconds');

    this.setIntervalFunction()
    this.pauseTime = undefined
  }

  public reset(): void {
    if (this.status() !== TimerStatus.Pause) return;

    this.timeString = '00:00:00'
    this.startTime = undefined
    this.pauseTime = undefined
    this.interval = undefined
  }

  public stopAlarm(): void {
    this.alarm.pause()
  }



  private status(): TimerStatus {
    const isStop: boolean = this.startTime === undefined && this.interval === undefined
    const isPause: boolean = this.startTime !== undefined && this.interval === undefined && this.pauseTime !== undefined
    const isRun: boolean = this.startTime !== undefined && this.interval !== undefined

    if(isStop) return TimerStatus.Stop
    if(isPause) return TimerStatus.Pause
    if(isRun) return TimerStatus.Run

    throw new Error("Неизвестный статус таймера") 
  }

  private setIntervalFunction(): void {
    this.interval = setInterval(() => this.step(), this.timeStep);
  }

  private step(): void {
    const thisTime = moment();

    const millisecondsNum = 99 - Math.floor(thisTime.diff(this.startTime) % 1000 / 10);
    const secondsNum = 59 -  Math.floor(thisTime.diff(this.startTime, 'seconds') % 60);
    const minutesNum = this.minutesBeforeAlarm - 2 - Math.floor(thisTime.diff(this.startTime, 'minutes') % 60);

    const milliseconds = this.addFirstZeroSymbol(millisecondsNum);
    const seconds = this.addFirstZeroSymbol(secondsNum);
    const minutes = this.addFirstZeroSymbol(minutesNum);

    this.timeString = `${minutes}:${seconds}:${milliseconds}`
    this.secondsPassed = thisTime.diff(this.startTime, 'seconds')
    this.minutesPassed = thisTime.diff(this.startTime, 'minutes')

    if(millisecondsNum + secondsNum + minutesNum === 0) {
      this.stop()
    }

    // this.startAlarm()
    // this.startBoop()
  }

  private addFirstZeroSymbol(num: number): string {
    return num.toString().length < 2 ? "0" + num.toString() : num.toString()
  }

  private startAlarm(): void {
    if (this.isAlarmRinging) return;

    this.startTime = moment()
    this.isAlarmRinging = true;
    this.alarm.playBugilnik()
    this.stop()
  }

  private startBoop(): void {
    if (this.isAlarmRinging) return;
    // if (this.secondsPassed === this.minutesBeforeBoop) return;

    this.alarm.playBoop()
  }
}

export default Timer 
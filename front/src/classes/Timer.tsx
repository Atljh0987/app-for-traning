import { makeAutoObservable } from "mobx"
import moment from 'moment'
import Alarm from "./Alarm";
import TimerStatus from "../enums/TimerStatus";
import Duration from "./Duration";

class Timer {
  public timeString: string = '00:00:00';
  public minutesPassed = 0;
  public secondsPassed = 0;  
  public duration: Duration;

  private alarm: Alarm;
  private timeStep: number = 10;
  private endTime?: moment.Moment;
  private pauseTime?: moment.Moment;
  private interval?: NodeJS.Timer;

  constructor(duration: Duration, alarm: Alarm) {
    makeAutoObservable(this)

    this.alarm = alarm
    this.duration = duration
  }

  public start(): void {
    if (this.status() !== TimerStatus.Stop) return;

    this.alarm.pause()
    this.endTime = moment().add(this.duration.allSeconds(), 'seconds');
    this.setIntervalFunction();
  }

  public pause(): void {
    if (this.status() !== TimerStatus.Run) return;

    this.pauseTime = moment()
    this.alarm.isRinging = false

    clearInterval(this.interval);
    this.interval = undefined;
  }

  public stop(): void {
    this.pause()
    this.reset()
  }

  public stopAlarm(): void {
    this.alarm.pause()
  }

  public stopTimerAndAlarm() : void {
    this.stop()
    this.stopAlarm()
  }

  public resume(): void {
    if (this.status() !== TimerStatus.Pause) return;

    const pauseInSeconds: number = this.pauseTime!.diff(this.endTime, 'milliseconds');
    this.endTime = moment().subtract(pauseInSeconds, 'milliseconds');

    this.setIntervalFunction()
    this.pauseTime = undefined
  }

  public reset(): void {
    if (this.status() !== TimerStatus.Pause) return;

    this.timeString = '00:00:00'
    this.endTime = undefined
    this.pauseTime = undefined
    this.interval = undefined
  }

  public status(): TimerStatus {
    const isStop: boolean = this.endTime === undefined && this.interval === undefined
    const isPause: boolean = this.endTime !== undefined && this.interval === undefined && this.pauseTime !== undefined
    const isRun: boolean = this.endTime !== undefined && this.interval !== undefined

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

    const millisecondsNum = Math.floor(this.endTime!.diff(thisTime) % 1000 / 10);
    const secondsNum = Math.floor(this.endTime!.diff(thisTime, 'seconds') % 60);
    const minutesNum = Math.floor(this.endTime!.diff(thisTime, 'minutes') % 60);

    const milliseconds = this.addFirstZeroSymbol(millisecondsNum);
    const seconds = this.addFirstZeroSymbol(secondsNum);
    const minutes = this.addFirstZeroSymbol(minutesNum);

    this.timeString = `${minutes}:${seconds}:${milliseconds}`
    this.secondsPassed = thisTime.diff(this.endTime, 'seconds')
    this.minutesPassed = thisTime.diff(this.endTime, 'minutes')

    if(millisecondsNum + secondsNum + minutesNum <= 0) {
      this.startAlarm()
      this.stop()
    }
  }

  private addFirstZeroSymbol(num: number): string {
    return num.toString().length < 2 ? "0" + num.toString() : num.toString()
  }

  private startAlarm(): void {
    if (!this.alarm.isRinging) return;

    this.alarm.isRinging = true
    this.alarm.play()
  }
}

export default Timer 
import TraningStatus from "../enums/TraningStatus";
import Alarm from "./Alarm";
import Timer from "./Timer";
import { makeAutoObservable } from "mobx"
import bugilnik from '../resources/sounds/bugilnik.mp3'
import boop from '../resources/sounds/boop.mp3'
import ExerciseProcessor from "./ExerciseProcessor";
import Exercise from "./Exercise";
import TimerStatus from "../enums/TimerStatus";
import Duration from "./Duration";
import TraningExerciseStatus from "../enums/TraningExerciseStatus";
import moment from "moment";

class Traning {
  public status: TraningStatus = TraningStatus.Start
  public exerciseStatus: TraningExerciseStatus = TraningExerciseStatus.Rest;

  private traningLength: number = 0;
  private startTime?: moment.Moment;
  private exercises: ExerciseProcessor;
  private timer: Timer;
  private exerciseTimer: Timer = new Timer(new Duration(5, 0), new Alarm(boop));
  private static instance: Traning;

  private constructor() {
    makeAutoObservable(this)

    this.exercises = new ExerciseProcessor()
    this.timer = this.exerciseTimer;
  }

  public getTimerValue(): string {
    return this.timer.timeString;
  }

  public getTimerStatus(): TimerStatus {
    return this.timer.status()
  }

  public getMaxTraningTimeInSeconds(): number {
    return this.exercises.getAllCompeletesTimeInSeconds() +
      this.exerciseTimer.duration.allSeconds() *
      this.exercises.getExerciseCount()
  }

  public getMiddleTimeInSeconds(): number {
    return this.exercises.getAllCompeletesTimeInSeconds() +
      this.exerciseTimer.duration.allSeconds() * 0.4 *
      this.exercises.getExerciseCount()
  }

  public getFinishMiddleTimeString(): string {
    return this.secondsToString(this.getMiddleTimeInSeconds())
  }

  public getFinishMaxTimeString(): string {
    return this.secondsToString(this.getMaxTraningTimeInSeconds())
  }

  public getCurrentTraningTime(): string {
    return this.secondsToString(this.traningLength)
  }

  public start(): void {
    if (this.status === TraningStatus.Finish) {
      this.timer.stopTimerAndAlarm();
      return;
    }

    this.exerciseStatus = TraningExerciseStatus.Run

    if (this.traningLength === 0) {
      this.startTime = moment()
    }

    this.setTraningLength()
    this.timer.stopTimerAndAlarm();
    this.timer = this.exerciseTimer;
    this.timer.start()
  }

  public completeSet(): void {
    this.exerciseStatus = TraningExerciseStatus.Rest

    this.exercises.completeSet()
    this.timer.stopTimerAndAlarm();
    this.setTraningLength()
    if(this.finish()) return
    
    this.timer = new Timer(this.exercises.getRestTime(), new Alarm(bugilnik));
    this.timer.start()
  }

  private finish(): boolean {
    if (this.isTraningFinish()) {
      this.status = TraningStatus.Finish
      return true;
    }

    return false
  }

  private isTraningFinish(): boolean {
    return this.exercises.isFinish()
  }

  public isFinish(): boolean {
    return this.status === TraningStatus.Finish
  }

  private setTraningLength(): void {
    if (this.startTime) {
      this.traningLength = moment().diff(this.startTime, 'seconds')
    }
  }

  private secondsToString(sec: number): string {
    const hours = this.parseTime(Math.floor(sec / 3600))
    const minutes = this.parseTime(Math.floor((sec % 3600) / 60))
    const seconds = this.parseTime(Math.floor((sec % 60)))

    return `${hours}:${minutes}:${seconds}`
  }

  private parseTime(num: number): string {
    return (num < 10) ? "0" + num : num.toString();
  }

  // public pause(): void {
  //     this.status = TraningStatus.Pause
  //     this.restTimer.pause()
  //     this.exerciseTimer.pause()
  // }

  // public resume(): void {
  //     this.status = TraningStatus.Run
  //     this.restTimer.resume()
  //     this.exerciseTimer.resume()
  // }    


  public getCurrentExercise(): Exercise {
    return this.exercises.getCurrentExercise()
  }

  public static singleton(): Traning {
    if (!Traning.instance) {
      Traning.instance = new Traning()
    }

    return Traning.instance
  }
}

const traning = Traning.singleton()

export default traning
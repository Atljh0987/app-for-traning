import TraningStatus from "../enums/TraningStatus";
import Alarm from "./Alarm";
import Timer from "./Timer";
import { makeAutoObservable } from "mobx"
import bugilnik from '../resources/sounds/bugilnik.mp3'
import boop from '../resources/sounds/boop.mp3'
import ExerciseProcessor from "./ExerciseProcessor";
import Exercise from "./Exercise";
import TimerStatus from "../enums/TimerStatus";

class Traning {
    public status: TraningStatus = TraningStatus.Stop

    private exercises: ExerciseProcessor;
    private restTimer: Timer = new Timer(2, new Alarm(bugilnik));
    private exerciseTimer: Timer = new Timer(5, new Alarm(boop));
    private static instance: Traning;    

    private constructor() {
        makeAutoObservable(this)

        this.exercises = new ExerciseProcessor()
    }

    public getTimerValue(): string {
        if(this.restTimer.status() !== TimerStatus.Stop) {
            return this.restTimer.timeString
        } else if(this.exerciseTimer.status() !== TimerStatus.Stop) {
            return this.exerciseTimer.timeString
        } else {
            return '00:00:00'
        }        
    }

    public start(): void {
        this.status = TraningStatus.Run
        this.exerciseTimer.start()
        this.restTimer.stopAlarm()
    }

    public pause(): void {
        this.status = TraningStatus.Pause
        this.restTimer.pause()
        this.exerciseTimer.pause()
    }

    public stop(): void {
        this.status = TraningStatus.Stop
        this.restTimer.stop()
        this.exerciseTimer.stop()
        this.exercises.reset()
    }

    public resume(): void {
        this.status = TraningStatus.Run
        this.restTimer.resume()
        this.exerciseTimer.resume()
    }
    
    public completeSet(): void {
        this.exercises.completeSet()
        this.restTimer.start()
        this.exerciseTimer.stop()
        this.exerciseTimer.stopAlarm()
    }

    public getCurrentExercise(): Exercise {
        return this.exercises.getCurrentExercise()
    }

    public static singleton() : Traning {
        if(!Traning.instance) {
            Traning.instance = new Traning()
        }

        return Traning.instance
    }
}

const traning = Traning.singleton()

export default traning
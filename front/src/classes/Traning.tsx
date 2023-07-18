import TraningStatus from "../enums/TraningStatus";
import Exercise from "./Exercise"
import Timer from "./Timer";
import { makeAutoObservable } from "mobx"

class Traning {
    

    public status: TraningStatus = TraningStatus.Stop

    private exercises: Array<Exercise>;
    private isTraningRun: boolean = false;
    private timer: Timer = new Timer(2);    
    private currentExerciseNumber: number = 0;
    private static instance: Traning;
    private currentExercise?: Exercise;

    private constructor() {
        makeAutoObservable(this)

        this.exercises = [
            new Exercise("Приседания", 4, 30),
            new Exercise("Присед в ножницы", 3, 12),
            new Exercise("Мертвая тяга", 4, 12),
            new Exercise("Подъем таза", 4, 15),
            new Exercise("Тяга к поясу", 3, 10),
            new Exercise("Отведение гантели назад с опорой", 3, 10),
            new Exercise("Отжимания", 3, 10),
            new Exercise("Сведение гантелей лежа на полу", 3, 12),
            new Exercise("Тяга ног к поясу лежа", 3, 12),
        ]
    }

    public start(): void {
        this.currentExercise = this.exercises[this.currentExerciseNumber]
        this.timer.start()
    }

    public pause(): void {
        this.timer.pause()
    }

    public resume(): void {
        this.timer.resume()
    }

    public stop(): void {
        this.timer.stop()
    }

    public reset(): void {
        this.timer.reset()
    }

    public finishSet(): void {
        throw new Error('Method not implemented.');
    }


    public getTimerValue(): string {
        return this.timer.timeString;
    }    

    public getCurrentExerciseName() : string {
        if(!this.currentExercise) return "";

        return this.currentExercise.name;
    }

    public completeSet(): void {
        if(!this.currentExercise) throw new Error("Тренировка не начата")

        return this.currentExercise.completeSet()
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
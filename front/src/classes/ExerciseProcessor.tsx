import { makeAutoObservable } from "mobx";
import Exercise from "./Exercise";
import Duration from "./Duration";


class ExerciseProcessor {
    private exercises: Array<Exercise>;
    private currentExerciseNumber: number = 0
    private finish: boolean = false;

    constructor() {
        makeAutoObservable(this)
        
        this.exercises = [
            new Exercise("Приседания", 4, 30, new Duration(2, 0)),
            new Exercise("Присед в ножницы", 3, 12, new Duration(1, 30)),
            new Exercise("Мертвая тяга", 4, 12, new Duration(1, 30)),
            new Exercise("Подъем таза", 4, 15, new Duration(1, 0)),
            new Exercise("Тяга к поясу", 3, 10, new Duration(1, 30)),
            new Exercise("Отведение гантели назад с опорой", 3, 10, new Duration(0, 30)),
            new Exercise("Отжимания", 3, 10, new Duration(1, 30)),
            new Exercise("Сведение гантелей лежа на полу", 3, 12, new Duration(0, 30)),
            new Exercise("Тяга ног к поясу лежа", 3, 12, new Duration(0, 45)),
        ]

        // this.exercises = [
        //     new Exercise("Приседания", 4, 30, new Duration(0, 3)),
        //     // new Exercise("Присед в ножницы", 3, 12, new Duration(0, 3)),
        //     // new Exercise("Мертвая тяга", 4, 12, new Duration(0, 3)),
        //     // new Exercise("Подъем таза", 4, 15, new Duration(0, 3)),
        //     // new Exercise("Тяга к поясу", 3, 10, new Duration(0, 3)),
        //     // new Exercise("Отведение гантели назад с опорой", 3, 10, new Duration(0, 3)),
        //     // new Exercise("Отжимания", 3, 10, new Duration(0, 3)),
        //     // new Exercise("Сведение гантелей лежа на полу", 3, 12, new Duration(0, 3)),
        //     new Exercise("Тяга ног к поясу лежа", 3, 12, new Duration(0, 3)),
        // ]
    }

    public getExerciseCount() : number {
        return this.exercises.length
    }

    public getAllCompeletesTimeInSeconds(): number {
        return this.exercises.map(e => e.getMinCompletesInSeconds()).reduce((sum, el) => sum + el)
    }

    public completeSet(): void {
        if(this.isFinish()) return;

        const currentExercise = this.getCurrentExercise()

        if(!this.isLastSetInLastExercise()) {
            currentExercise.completeSet()
        } else {
            this.finish = true;
            return;
        }

        if(currentExercise.isFinish()) {
            this.currentExerciseNumber++
        }
    }

    public getPriviosExercise(): Exercise {
        return (this.currentExerciseNumber === 0)? 
            this.getCurrentExercise() : 
            this.exercises[this.currentExerciseNumber - 1]
    }

    public getRestTime(): Duration {
        if(this.getCurrentExercise().getCurrentSet() === 1) {
            return this.getPriviosExercise().restTime
        } else {
            return this.getCurrentExercise().restTime
        }
    }

    public getCurrentExercise(): Exercise {
        return this.exercises[this.currentExerciseNumber]
    }

    public isLastSetInLastExercise() {
        return this.currentExerciseNumber + 1 >= this.exercises.length &&
            this.getCurrentExercise().isLastSet()  
    }

    public isFinish(): boolean {
        return this.finish;       
    }

    public reset(): void {
        this.currentExerciseNumber = 0

        for(var e of this.exercises) {
            e.reset()
        }
    }
}

export default ExerciseProcessor
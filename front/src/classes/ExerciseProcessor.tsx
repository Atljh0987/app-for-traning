import { makeAutoObservable } from "mobx";
import Exercise from "./Exercise";


class ExerciseProcessor {

    private exercises: Array<Exercise>;
    private currentExerciseNumber: number = 0

    constructor() {
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

    public completeSet(): void {
        const currentExercise = this.exercises[this.currentExerciseNumber]

        currentExercise.completeSet()

        if(currentExercise.isFinish()) {
            if(this.currentExerciseNumber + 1 < this.exercises.length)
                this.currentExerciseNumber++
        }
    }    

    public exercisesFinish(): boolean {
        return this.currentExerciseNumber > this.exercises.length - 1
    }

    public getCurrentExercise(): Exercise {
        return this.exercises[this.currentExerciseNumber]
    }

    public reset(): void {
        this.currentExerciseNumber = 0

        for(var e of this.exercises) {
            e.reset()
        }
    }
}

export default ExerciseProcessor
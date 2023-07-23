import { makeAutoObservable } from "mobx";
import Duration from "./Duration";

class Exercise {
    public name: string;
    public sets: number;
    public reps: number;
    public restTime: Duration;
    private currentSet: number = 1;

    constructor(name: string, sets: number, reps: number, restTime: Duration) {
        makeAutoObservable(this)

        this.name = name
        this.sets = sets
        this.reps = reps
        this.restTime = restTime;
    }

    public getMinCompletesInSeconds(): number {
        return this.restTime.allSeconds() * this.sets
    }

    public getCurrentSet(): number {
        return this.currentSet
    }

    public completeSet() : void {
        if(!this.isFinish())
            this.currentSet++;
    }

    public isFinish(): boolean {
        return this.currentSet > this.sets
    }

    public isLastSet() : boolean {
        return this.currentSet === this.sets
    }

    public reset() {
        this.currentSet = 1
    }
}

export default Exercise
import { makeAutoObservable, set } from "mobx";

class Exercise {
    public name: string;
    public sets: number;
    public reps: number;
    private currentSet: number = 1;

    constructor(name: string, sets: number, reps: number) {
        makeAutoObservable(this)

        this.name = name
        this.sets = sets
        this.reps = reps
    }

    public getCurrentSet(): number {
        return this.currentSet
    }

    public completeSet() : void {
        if(this.currentSet - 1 < this.sets)
            this.currentSet++;
    }

    public isFinish() : boolean {
        return this.currentSet > this.sets
    }

    public reset() {
        this.currentSet = 1
    }
}

export default Exercise
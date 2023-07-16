class Exercise {
    name: string;
    sets: number;
    reps: number;
    _completedSets: number = 0;


    constructor(name: string, sets: number, reps: number) {
        this.name = name
        this.sets = sets
        this.reps = reps
    }

    completeSet() {
        this._completedSets++;
    }

    isFinish() {
        return this.sets > this._completedSets
    }
}

export default Exercise
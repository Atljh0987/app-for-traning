class Exercise {
    public name: string;
    public sets: number;
    public reps: number;
    private completedSets: number = 0;


    constructor(name: string, sets: number, reps: number) {
        this.name = name
        this.sets = sets
        this.reps = reps
    }

    public completeSet() : void {
        this.completedSets++;
    }

    public isFinish() : boolean {
        return this.sets > this.completedSets
    }
}

export default Exercise
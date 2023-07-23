class Duration {
    public minutes: number = 0;
    public seconds: number = 0;

    constructor(minutes: number, seconds: number) {
        if(seconds > 59 || seconds < 0) throw new Error("Incorrect seconds diapason")
        if(minutes < 0) throw new Error("Incorrect minutes diapason")

        this.minutes = minutes
        this.seconds = seconds
    }

    public allSeconds(): number {
        return this.minutes * 60 + this.seconds 
    }
}

export default Duration
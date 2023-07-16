import { makeAutoObservable } from "mobx"

class Exercises {


    constructor() {
        makeAutoObservable(this)
    }

    
}

const exercises = new Exercises()

export default exercises
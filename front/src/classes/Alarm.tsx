class Alarm {
    public isRinging: boolean = false

    private audio: HTMLAudioElement    

    constructor(src: string) {
        this.audio = new Audio();
        this.audio.src = src;
        this.audio.load();
    }

    public play() {
        this.audio.play()
        this.isRinging = true
    }

    public pause() {
        this.audio.pause()        
        this.isRinging = true
    }
}

export default Alarm
class Alarm {
    private audio: HTMLAudioElement

    constructor(src: string) {
        this.audio = new Audio();
        this.audio.src = src;
        this.audio.load();
    }

    public play() {
        this.audio.play()
    }

    public pause() {
        this.audio.pause()
    }
}

export default Alarm
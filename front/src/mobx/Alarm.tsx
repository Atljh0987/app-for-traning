import timer from "./Timer"
import { makeAutoObservable } from "mobx"
import bugilnik from '../resources/sounds/bugilnik.mp3';
import boop from '../resources/sounds/boop.mp3';

class Alarm {
  _bugilnik = new Audio();
  _boop = new Audio();

  constructor() {
    makeAutoObservable(this)
    this._bugilnik.src = bugilnik;
    this._bugilnik.load()
  }

  playBugilnik() {
    this._bugilnik.play();
  }

  pauseBugilnik() {
    this._bugilnik.pause();
  }

  playBoop() {
    this._boop.play();
  }

  pauseBoop() {
    this._boop.pause();
  }

  pauseAll() {
    this.pauseBoop()
    this.pauseBugilnik()
  }
}

const alarm = new Alarm()

export default alarm
import {ClassEvent} from './../utils/ClassEvent';

export class MicrophoneController extends ClassEvent
{
	constructor()
	{
		super();
		navigator.mediaDevices.getUserMedia({
			audio: true
		}).then(stream=>{
			this._stream = stream;
			let audio = new Audio();

			audio.srcObject = stream;
			audio.play();
			//Evento criado em ClassEvent
			this.trigger('play', audio);
		}).catch(err=>{
			console.log(err);
		});
	}

	stop()
	{
		this._stream.getTracks().forEach(track=>{
			track.stop();
		});
	}
}
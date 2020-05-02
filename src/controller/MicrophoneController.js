export class MicrophoneController
{
	constructor()
	{

		navigator.mediaDevices.getUserMedia({
			audio: true
		}).then(stream=>{
			let audio = new Audio();
			audio.srcObject = stream;
			audio.play();
		}).catch(err=>{
			console.log(err);
		});
	}
}
/***Informações 
1. Deve verificar se o navegator permite a gravação de áudio em um determinado tipo de arquivo. Para testar,
vá ao console do navegador e digita MediaRecorder.isTypeSupported('audio/webm'). O parâmetro é o mimetype do
arquivo desejado.

*/

import {ClassEvent} from './../utils/ClassEvent';
import {Format} from './../utils/Format';

export class MicrophoneController extends ClassEvent
{
	constructor()
	{
		super();

		//Verificar se é possivel gravar o audio
		this._available = false;
		this._mimetype = 'audio/webm';

		navigator.mediaDevices.getUserMedia({
			audio: true
		}).then(stream=>{

			this._available = true;

			this._stream = stream;

			/*Trecho de código para captura e reproduzir ao mesmo tempo o audio
			let audio = new Audio();
			audio.srcObject = stream;
			audio.play();
			*/

			//Evento criado em ClassEvent
			this.trigger('ready', this._stream);

		}).catch(err=>{
			console.log(err);
		});
	}

	isAvailable()
	{
		return this._available;
	}

	stop()
	{
		this._stream.getTracks().forEach(track=>{
			track.stop();
		});
	}

	startRecord()
	{
		if(this.isAvailable())
		{
			this._mediaRecorder = new MediaRecorder(this._stream, {
				mimeType: this._mimetype
			});
			this.startRecordMicrophoneTime();

			//O MediaRecorder envia pedaços do audio
			this._recordedChunks = [];
			this._mediaRecorder.addEventListener('dataavailable', e=>{
				if(e.data.size > 0) this._recordedChunks.push(e.data);
			});

			//Quando encerrar a gravação
			this._mediaRecorder.addEventListener('stop', e=>{
				//Transformar os dados capturados e armazenados no array para binários
				let blob = new Blob(this._recordedChunks, {
					type: this._mimetype
				});
				//Criar o arquivo
				let filename = `rec${Date.now()}.webm`;
				let file = new File([blob], filename, {
					type: this._mimetype,
					lastModified: Date.now()
				});

				console.log(file);

				let reader = new FileReader();
				reader.onload = e=>{
					let audio = new Audio(reader.result);
					audio.play();
				};
				reader.readAsDataURL(file);

			});

			this._mediaRecorder.start();
		}
	}

	stopRecord()
	{
		if(this.isAvailable())
		{
			this._mediaRecorder.stop();
			this.stop();
			this.stopRecordMicrophoneTime();
		}
	}

	stopRecordMicrophoneTime()
	{
		clearInterval(this._recordMicrophoneInterval);
	}

	startRecordMicrophoneTime()
	{
		let start = Date.now();
		this._recordMicrophoneInterval = setInterval(()=>{
			this.trigger('timeRecord', Format.toTime(Date.now() - start));
		}, 100);
	}
}
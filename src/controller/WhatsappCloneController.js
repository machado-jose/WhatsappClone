import {CameraController} from './CameraController';
import {Format} from './../utils/Format';

export class WhatsappCloneController
{
	constructor()
	{
		//Esse método vai permitir que vários elementos diferentes possam herdar
		//métodos sem necessidade de especificar cada um separadamente. Semelhante 
		//do JQuery
		this.elementsPrototype();
		//Carregar automaticamente os elementos html. Para isso, os nomes dos id devem
		//seguir o padrao nome-nome
		this.loadElements();
		//Método para iniciar todos os eventos dos elementos
		this.initEvents();

	}

	loadElements()
	{
		this.el = {};

		document.querySelectorAll("[id]").forEach(element=>{
			this.el[Format.getCamelCase(element.id)] = element;
		});
	}

	elementsPrototype()
	{
		Element.prototype.hide = function()
		{
			this.style.display = "none";
			return this;
		}

		Element.prototype.show = function()
		{
			this.style.display = "block";
			return this;
		}

		Element.prototype.toggle = function()
		{
			this.style.display = (this.style.display === 'block') ? "none" : "block";
			return this;
		}

		Element.prototype.on = function(events, fn)
		{
			events.split(' ').forEach(event=>{
				this.addEventListener(event, fn);
			});
			return this;
		}

		Element.prototype.css = function(styles)
		{
			for(let name in styles)
			{
				this.style[name] = styles[name];
			}
			return this;
		}

		Element.prototype.addClass = function(name)
		{
			this.classList.add(name);
			return this;
		}

		Element.prototype.removeClass = function(name)
		{
			this.classList.remove(name);
			return this;
		}

		Element.prototype.toggleClass = function(name)
		{
			this.classList.toggle(name);
			return this;
		}

		Element.prototype.hasClass = function(name)
		{
			return this.classList.contains(name);
		}

		HTMLFormElement.prototype.getForm = function()
		{
			return new FormData(this);
		}

		HTMLFormElement.prototype.toJSON = function()
		{
			let json = {};
			this.getForm().forEach((value, key)=>{
				json[key] = value;
			})
			return json;
		}


	}

	initEvents()
	{
		this.el.myPhoto.on('click', ()=>{
			this.closeAllLeftPanel();
			this.el.panelEditProfile.show();
			setTimeout(()=>{
				this.el.panelEditProfile.addClass('open');
			}, 300);
		});

		this.el.btnNewContact.on('click', ()=>{
			this.closeAllLeftPanel();
			this.el.panelAddContact.show();
			setTimeout(()=>{
				this.el.panelAddContact.addClass('open');
			}, 300);	
		});

		this.el.btnClosePanelEditProfile.on('click', ()=>{
			this.el.panelEditProfile.removeClass('open');
		});

		this.el.btnClosePanelAddContact.on('click', ()=>{
			this.el.panelAddContact.removeClass('open');
		});

		this.el.photoContainerEditProfile.on('click', ()=>{
			this.el.inputProfilePhoto.click();
		});

		this.el.inputNamePanelEditProfile.on('keypress', (e)=>{
			if(e.key === 'Enter')
			{
				e.preventDefault();
				this.el.btnSavePanelEditProfile.click();
			}
		});

		this.el.btnSavePanelEditProfile.on('click', (e)=>{
			console.log(this.el.inputNamePanelEditProfile.innerHTML);
		});

		this.el.formPanelAddContact.on('submit', (e)=>{
			e.preventDefault();
		});

		this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{
			item.on('click', e=>{
				this.el.home.hide();
				this.el.main.css({
					display: "flex"
				});
			});
		});

		let closeMenuAttach = ()=>{
			this.el.menuAttach.removeClass('open');
			document.removeEventListener('click', closeMenuAttach);	
		}

		this.el.btnAttach.on('click', e=>{
			//Para evitar que os eventos propagem para os nós ancestrais
			//Se não colocar essa linha, os eventos dos elementos ancestrais
			//seriam removidos também
			e.stopPropagation();
			this.el.menuAttach.addClass('open');
			//Para remover um evento, é necessário que a função em questão não seja
			//anônima
			document.addEventListener('click', closeMenuAttach);
		});

		//Anexar Imagem
		this.el.btnAttachPhoto.on('click', e=>{
			this.el.inputPhoto.click();
		});

		this.el.inputPhoto.on('change', e=>{
			[...this.el.inputPhoto.files].forEach(file=>{
				console.dir(file);
			});
		});
		//Tirar foto
		this.el.btnAttachCamera.on('click', e=>{
			this.closeAllMainPanel();
			this.el.panelCamera.addClass("open");
			this.el.panelCamera.css({
				height:"100%"
			});
			this._camera = new CameraController(this.el.videoCamera);
		});

		this.el.btnClosePanelCamera.on('click', e=>{
			this.closeAllMainPanel();
			this.el.panelMessagesContainer.show();
			this._camera.stop();
		});

		this.el.btnTakePicture.on('click', e=>{
			console.dir(e);
		});
		//Anexar documento
		this.el.btnAttachDocument.on('click', e=>{
			this.closeAllMainPanel();
			this.el.panelDocumentPreview.addClass("open");
			this.el.panelDocumentPreview.css({
				height:"100%"
			});
		});

		this.el.btnClosePanelDocumentPreview.on('click', e=>{
			this.closeAllMainPanel();
			this.el.panelMessagesContainer.show();
		});

		this.el.btnSendDocument.on('click', e=>{
			console.log('send document');
		});
		//Anexar contatos
		this.el.btnAttachContact.on('click', e=>{
			this.el.modalContacts.show();
		});

		this.el.btnCloseModalContacts.on('click', e=>{
			this.el.modalContacts.hide();
		});

		//Configurar evento do microfone
		this.el.btnSendMicrophone.on('click', e=>{
			this.el.recordMicrophone.show();
			this.el.btnSendMicrophone.hide();
			this.recordMicrophoneTime();
		});

		this.el.btnCancelMicrophone.on('click', e=>{
			this.closeRecordMicrophone();
		});

		this.el.btnFinishMicrophone.on('click', e=>{
			this.closeRecordMicrophone();
		});

		//Configurar o campo da mensagem
		this.el.inputText.on('keypress', e=>{
			if(e.key === 'Enter' && !e.ctrlKey)
			{
				e.preventDefault();
				this.el.btnSend.click();
			}
		});

		this.el.inputText.on('keyup', e=>{
			if(this.el.inputText.innerHTML.length)
			{
				this.el.inputPlaceholder.hide();
				this.el.btnSendMicrophone.hide();
				this.el.btnSend.show();
			}
			else
			{
				this.el.inputPlaceholder.show();
				this.el.btnSendMicrophone.show();
				this.el.btnSend.hide();
			}
		});

		this.el.btnSend.on('click', e=>{
			console.log(this.el.inputText.innerHTML);
		});

		let closeEmojisPanel = (e)=>{
			if(e.key === 'Escape'){
				this.el.panelEmojis.removeClass('open');
				document.removeEventListener('keyup', closeEmojisPanel);
			}
		};

		this.el.btnEmojis.on('click', e=>{
			this.el.panelEmojis.toggleClass('open');
			document.addEventListener('keyup', closeEmojisPanel);
		});

		this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji=>{
			emoji.on('click', e=>{

				let img = this.el.imgEmojiDefault.cloneNode();
				img.style.cssText = emoji.style.cssText;
				img.dataset.unicode = emoji.dataset.unicode;
				img.alt = emoji.dataset.unicode;

				emoji.classList.forEach(name=>{
					img.classList.add(name);
				});

				//Para determinar a posição que o usuário quer inserir o emoji
				//1º Focar (Selecionar) o cursor no campo
				let cursor = window.getSelection();
				if(!cursor.focusNode || !cursor.focusNode.id == 'input-text')
				{
					this.el.inputText.focus();
					cursor = window.getSelection();
				}
				//2º Capturar o range da informação selecionada e deletar
				let range = document.createRange();
				range = cursor.getRangeAt(0);
				range.deleteContents();
				//3º Inserir o emoji
				let frag = document.createDocumentFragment();
				frag.appendChild(img);
				range.insertNode(frag);
				range.setStartAfter(img);


				this.el.inputText.dispatchEvent(new Event('keyup'));
			});
		});

	}

	closeAllLeftPanel()
	{
		this.el.panelEditProfile.hide();
		this.el.panelAddContact.hide();
	}

	closeAllMainPanel()
	{
		this.el.panelMessagesContainer.hide();
		this.el.panelCamera.removeClass("open");
		this.el.panelDocumentPreview.removeClass("open");
		this.el.panelDocumentPreview.removeClass("open");
	}

	closeRecordMicrophone()
	{
		clearInterval(this._recordMicrophoneInterval);
		this.el.recordMicrophone.hide();
		this.el.btnSendMicrophone.show();
	}

	recordMicrophoneTime()
	{
		let start = Date.now();
		this._recordMicrophoneInterval = setInterval(()=>{
			this.el.recordMicrophoneTimer.innerHTML = (Format.toTime(Date.now() - start));
		}, 100);
	}

}
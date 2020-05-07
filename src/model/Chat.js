import {Firebase} from './../utils/Firebase';
import {Model} from './Model';

export class Chat extends Model
{
	constructor()
	{
		super();
	}

	get users(){return this._data.users};
	set users(value) {this._data.users = value};
	get timeStamp(){return this._data.timeStamp};
	set timeStamp(value) {this._data.timeStamp = value};

	static getRef()
	{
		return Firebase.db().collection('/chats');
	}
	/**
	* Cria um chat entre o usuário e o contato
	* @param {string} meEmail - O email do usuário
	* @param {string} contactEmail - O email do contato
	* @returns {Promise}
	*/
	static createIfNotExists(meEmail, contactEmail)
	{
		return new Promise((s, f)=>{
			Chat.find(meEmail, contactEmail).then(chats=>{
				if(chats.empty)
				{
					Chat.create(meEmail, contactEmail).then(chat=>{
						s(chat);
					});
				}
				else
				{
					chats.forEach(chat=>{
						s(chat);
					});
				}
			}).catch(err=>{f(err)});
		});
	}
	/**
	* Procura conversas entre o usuário e o contato
	* @param {string} meEmail - O email do usuário
	* @param {string} contactEmail - O email do contato
	* @returns {Promise} No caso de sucesso, retorna um Object com os documentos
	* das conversas. Caso contrário, retorna um Object com os dados do erro
	*/
	static find(meEmail, contactEmail)
	{	
		return Chat.getRef().where(btoa(meEmail), '==', true).where(btoa(contactEmail), '==', true).get();
	}
	/**
	* Procura conversas entre o usuário e o contato
	* @param {string} meEmail - O email do usuário
	* @param {string} contactEmail - O email do contato
	* @returns {Promise} No caso de sucesso, retorna um Object referente ao novo chat. 
	* Caso contrário, retorna um Object com os dados do erro
	*/
	static create(meEmail, contactEmail)
	{
		return new Promise((s, f)=>{
			let users = {};
			users[btoa(meEmail)] = true;
			users[btoa(contactEmail)] = true;
			Chat.getRef().add({
				users,
				timeStamp: new Date()
			}).then(doc=>{
				Chat.getRef().doc(doc.id).get().then(chat=>{
					s(chat);
				}).catch(err=>{f(err)});
			}).catch(err=>{f(err)});
		});
	}
}
import {Firebase} from './../utils/Firebase';
import {Model} from './Model';

export class User extends Model
{

	constructor(id)
	{
		super();
		if(id) this.getById(id);
	}

	get name(){ return this._data.name; }
	set name(value){ this._data.name = value; }
	get email(){ return this._data.email; }
	set email(value){ this._data.email = value; }
	get photo(){ return this._data.photo; }
	set photo(value){ this._data.photo = value; }
	/**
	* Busca os dados do usuário a partir do seu ID
	* @param {string} id - O identificador do documento do usuário salvo no Firebase
	* @returns {Object} doc - Contém os dados do usuário salvo no Firebase
	*/
	getById(id)
	{
		User.findByEmail(id).onSnapshot(doc=>{
			this.fromJSON(doc.data());
			return doc;
		});
	}
	/**
	* Salvar as informações do usuário no Firebase
	* @returns {Promise} No caso de sucesso, será retornado um Object com os dados informando que o processo ocorreu
	* como esperado. Caso contrário, será retornado um Object com as informações do tipo do erro.
	*/
	save()
	{
		return User.findByEmail(this.email).set(this.toJSON());
	}
	/**
	* Obter a coleção referente aos usuários no Firebase
	* @returns {Promise} No caso de sucesso, será retornado a coleção de usuários salvos no Firebase. Caso contrário,
	* será retornado um Obejct com os dados do erro
	*/
	static getRef()
	{
		return Firebase.db().collection('/users');
	}
	/**
	* Encontrar os dados do usuário por meio da sua conta de email
	* @param {string} email - O email do usuário
	* @returns {Promise} No caso de sucesso, será retornado um Object com os dados do usuário salvo no Firebase. 
	* Caso contrario, será retornado um Object com as informações do erro
	*/
	static findByEmail(email)
	{
		return User.getRef().doc(email);
	}
	/**
	* Adiciona um contato na lista do usuário
	* @param {User} contact - O contato que deve ser adicionado caso esteja cadastrado
	* @returns {Promise} No caso de sucesso, será retornado um Object com as informações do contato salvo. Caso contrário, será
	* enviado um Object com os dados de erro
	*/
	addContact(contact)
	{
		return User.getRef().doc(this.email).collection('contacts').doc(btoa(contact.email)).set(contact.toJSON());
	}
}
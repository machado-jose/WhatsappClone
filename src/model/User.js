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
	* @function getById
	* @param id : O id do documento do usuário salvo no Firebase. O id, nessa aplicação, é a conta de email do usuário.
	* @returns Promise
	*/
	getById(id)
	{
		return new Promise((s, f)=>{

			User.findByEmail(id).onSnapshot(doc=>{
				this.fromJSON(doc.data());
				s(doc);
			});

		});
	}
	/**
	* @function save
	* @returns Promise
	*/
	save()
	{
		return User.findByEmail(this.email).set(this.toJSON());
	}

	static getRef()
	{
		return Firebase.db().collection('/users');
	}
	/**
	* @function findByEmail
	* @param email : O email do usuário
	*/
	static findByEmail(email)
	{
		return User.getRef().doc(email);
	}
}
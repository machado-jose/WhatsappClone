import {ClassEvent} from './../utils/ClassEvent';

export class Model extends ClassEvent
{
	constructor()
	{
		super();
		this._data = {};
	}
	/**
	* Salva os dados e aciona o evento 'datachange'
	* @param {Object} json - Contém os dados para serem salvos na variável this._data.
	*/
	fromJSON(json)
	{
		this._data = Object.assign(this._data, json);
		this.trigger('datachange', this.toJSON());
	}
	/**
	* Retorna os dados do objeto
	* @returns {Object} this._data
	*/
	toJSON()
	{
		return this._data;
	}
}
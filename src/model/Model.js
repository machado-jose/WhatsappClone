import {ClassEvent} from './../utils/ClassEvent';

export class Model extends ClassEvent
{
	constructor()
	{
		super();
		this._data = {};
	}
	/**
	* @function fromJSON
	* @param json : Contém os dados para serem salvos na variável this._data.
	*/
	fromJSON(json)
	{
		this._data = Object.assign(this._data, json);
		this.trigger('datachange', this.toJSON());
	}
	/**
	* @function toJSON
	* @returns this._data : Contém os dados salvos no formato JSON.
	*/
	toJSON()
	{
		return this._data;
	}
}
export class Format
{
	static getCamelCase(text)
	{
		let div = document.createElement("div");
		//Para converter em camelCase, a variavel text deve ter os dados no 
		//formato nome-nome
		div.innerHTML = `<div data-${text}="id"></div>`;
		return Object.keys(div.firstChild.dataset)[0];
	}

	static toTime(duration)
	{
		let seconds = parseInt((duration / 1000) % 60);
		let minutes = parseInt((duration / (1000 * 60)) % 60);
		let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

		return (hours > 0) ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` : `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}
	/**
	* Converte timeStamp para time
	* @param {timestamp} timeStamp
	* @returns {string}
	*/
	static timeStampToTime(timeStamp)
	{
		return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : '';
	}

	static dateToTime(date, locale = 'pt-BR')
	{
		return date.toLocaleTimeString(locale, {
			hour: '2-digit',
			minute: '2-digit'
		});
	}
}
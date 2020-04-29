class Format
{
	static getCamelCase(text)
	{
		let div = document.createElement("div");
		//Para converter em camelCase, a variavel text deve ter os dados no 
		//formato nome-nome
		div.innerHTML = `<div data-${text}="id"></div>`;
		return Object.keys(div.firstChild.dataset)[0];
	}
}
class WhatsappCloneController
{
	constructor()
	{
		//Carregar automaticamente os elementos html. Para isso, os nomes dos id devem
		//seguir o padrao nome-nome
		this.loadElements();
	}

	loadElements()
	{
		this.el = {};

		document.querySelectorAll("[id]").forEach(element=>{
			this.el[Format.getCamelCase(element.id)] = element;
		});
	}
}
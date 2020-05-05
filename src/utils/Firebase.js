const firebase = require('firebase');
require('firebase/firestore');

export class Firebase
{
	constructor()
	{
		window._initializedFirebase = false;

		this._config = {
		    apiKey: "AIzaSyCALZ31ug5ZIHlI0T1bBMJqLQHgnEgvOEc",
		    authDomain: "whatsapp-clone-9afca.firebaseapp.com",
		    databaseURL: "https://whatsapp-clone-9afca.firebaseio.com",
		    projectId: "whatsapp-clone-9afca",
		    storageBucket: "whatsapp-clone-9afca.appspot.com",
		    messagingSenderId: "471238643134",
		    appId: "1:471238643134:web:8b64d0cef794003234bdef"
	  	};

		this.init();
	}

	init()
	{
		if(!window._initializedFirebase)
		{
			firebase.initializeApp(this._config);
			window._initializedFirebase = true;
		}
	  	
	}

	static db()
	{
		return firebase.firestore();
	}

	static hd()
	{
		return firebase.storage();
	}

	/**
	* Autentifica o usuário usando a sua conta de email do Google
	* @returns {Promise} No caso de sucesso, retorna um Object contendo os dados do usuário e o token gerado. 
	* Caso contrário, retorna um Object com os dados do erro
	*/
	initAuth()
	{
		return new Promise((s, f)=>{

			var provider = new firebase.auth.GoogleAuthProvider();

			firebase.auth().signInWithPopup(provider).then(function(result) {
			  // This gives you a Google Access Token. You can use it to access the Google API.
			  var token = result.credential.accessToken;
			  // The signed-in user info.
			  var user = result.user;
			  
			  s({
			  	user, 
			  	token
			  });

			}).catch(function(error) {
			  // Handle Errors here.
			  f(error);
			});
		});
	}
}
const firebase = require('firebase');
require('firebase/firestore');

export class Firebase
{
	constructor()
	{
		this._initialized = false;

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
		if(!this._initialized)
		{
			firebase.initializeApp(this._config);
			this._initialized = true;
		}
	  	
	}

	db()
	{
		return firebase.firestore();
	}

	hd()
	{
		return firebase.storage();
	}

	/**
	* @function Autentifica o usuário usando a sua conta de email do Google
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
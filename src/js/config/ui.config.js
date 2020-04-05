class LoginUI{
	constructor(){
		this._form = null;
		this._inputEmail = null;
		this._inputPassword = null;
	}

	init(){
		this._form = document.forms.loginForm;
		this._inputEmail = document.getElementById('email');
		this._inputPassword = document.getElementById('password');
	}

	get form(){
		return this._form;
	}

	get inputEmail(){
		return this._inputEmail;
	}

	get inputPassword(){
		return this._inputPassword;
	}
}

/**
*
* @type {LoginUI}
*/
const loginUI = new LoginUI();
export default loginUI;

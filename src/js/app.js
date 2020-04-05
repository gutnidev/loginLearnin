/* eslint-disable import/no-unresolved,no-shadow,no-use-before-define */
/*	login: denis.m.pcspace@gmail.com
	password: dmgame12345 */
import loginUI from '@src/js/config/ui.config';
import validate from '@src/js/helpers/validate';
import registrationFormUI from '@src/js/vievs/registrationForm';
import errorUI from '@src/js/vievs/errorUI';
import fetchLogin from '@src/js/servises/loginServise';
import getNews from '@src/js/servises/news.service';
import showNotify from '@src/js/vievs/notification';


document.addEventListener('DOMContentLoaded', () => {
	//! **************************Initing**************************
	registrationFormUI.init();
	loginUI.init();
	const { form, inputEmail, inputPassword } = loginUI;
	const inputArr = [inputEmail, inputPassword];

	//! **************************Events**************************
	//* Login submit event
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		onSubmit();
	});

	//* Клик по кнопке "регистрация"
	document.getElementById('registrationButton').addEventListener('click', () => {
		registrationFormUI.registrationForm.reset();
	});

	//* Registration submit event
	registrationFormUI.registrationForm.addEventListener('submit', (e) => {
		onSubmitRegistration(e);
	});

	//* Фокус ивент прячем уведомление ошибки инпута на логине
	inputArr.forEach((input) => {
		input.addEventListener('focus', () => {
			errorUI.hideInputError(input);
		});
	});

	//! **************************Handlers**************************
	//* Для кнопки саба логина
	async function onSubmit() {
		const isValidForm = inputArr.every((el) => {
			const isValidInput = validate(el);
			if (!isValidInput){
				errorUI.showInputError(el);
			}
			return isValidInput;
		});
		if (!isValidForm){
			return;
		}
		try {
			await fetchLogin(inputEmail.value, inputPassword.value);
			await getNews();
			showNotify({ message: 'Login success', className: 'badge-success' });
			form.reset();
		} catch (err) {
			console.log('Ошбика в app/onSubmit/login-catch:', new Error(err));
			showNotify({ message: `${err}`, className: 'badge-warning' });
			form.reset();
		}
	}
	//* Для саба регистрации
	async function onSubmitRegistration(e) {
		e.preventDefault();
		let isValidForm = true;
		// Валидируем, вешаем фокус, показываем если не валидно
		registrationFormUI.inputs.forEach((input) => {
			const isValidInput = validate(input);
			if (!isValidInput){
				isValidForm = false;
				errorUI.showInputError(input);
				registrationFormUI.addFocus(onFocus, input);
			}
		});
		// Если форма валидна - постим нового юзера, закрываем модалку и выводим сообщение о том, что ссылка отправлена на имейл
		if (isValidForm){
			try {
				registrationFormUI.closeBtn.click();
				const data = registrationFormUI.getDataToFetchForm();
				showNotify({ message: 'Ваши данные отправлены на сервер', className: 'badge-primary', timeout: 2000 });
				const response = await registrationFormUI.fetchNewUser(data);
				showNotify({ message: response.message, className: 'badge-primary', timeout: 4000 });
			} catch (e) {
				registrationFormUI.closeBtn.click();
				showNotify({ message: e, className: 'badge-danger', timeout: 4000 });
			}
		}
	}
	//* Прячем ошибки и убираем навешенный фокус на элемент
	function onFocus(e) {
		errorUI.hideInputError(e.target);
		registrationFormUI.removeFocusEventListener(this, e.target);
	}
});

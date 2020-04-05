// eslint-disable-next-line import/no-unresolved
import axios from '@src/js/plugins/axios';

/**
 *
 * @param email{String}
 * @param password{String}
 * @returns {Promise<void>}
 */
async function fetchLogin(email, password) {
	try {
		return await axios.post(
			'/auth/login',
			JSON.stringify({
				email,
				password,
			}),
		);
	} catch (err) {
		console.log('ошибка в модуле auth.service в функции login', err);
		return Promise.reject(err);
	}
}
export default fetchLogin;

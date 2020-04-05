// eslint-disable-next-line import/no-unresolved
import axios from '@src/js/plugins/axios';

async function getNews() {
	try {
		
		return await axios.get('/news');
	} catch (err) {
		console.log('ошибка в модуле auth.service в функции login', err);
		return Promise.reject(err);
	}
}

export default getNews;

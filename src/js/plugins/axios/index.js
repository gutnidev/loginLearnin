/* eslint-disable import/no-unresolved */
import axios from 'axios';
import API_ENV from '@src/js/config/api.config';
import interceptors from '@src/js/plugins/axios/interceptors';

const instance = axios.create({
	baseURL: API_ENV.apiUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});

interceptors(instance);

export default instance;

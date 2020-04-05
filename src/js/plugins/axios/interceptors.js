const lsTokenKey = 'my_app_token';

function setTokenOnLogin(res) {
	const loginUrl = res.config.url.includes('login');
	if (loginUrl){
		const token = res.data.token;
		localStorage.setItem(lsTokenKey, token);
	}
	return res;
}
function getClearResponseOfLogin(res) {
	if (res.config.url.includes('get-countries') || res.config.url.includes('get-cities')){
		res.serializedData = {};
		// eslint-disable-next-line guard-for-in,no-restricted-syntax
		for (const index in res.data){
			res.serializedData[`${res.data[index]}`] = index;
		}
		return res.serializedData;
	}
	return res.data;
}

function setToken(req) {
	const authURL = req.url.includes('auth');
	if (!authURL){
		req.headers['x-access-token'] = localStorage.getItem(lsTokenKey);
	}
	return req;
}
function onError(err) {
	return Promise.reject(err.response.data.message);
}

export default function interceptors(axios) {
	axios.interceptors.request.use(setToken);
	axios.interceptors.response.use(setTokenOnLogin);
	axios.interceptors.response.use(getClearResponseOfLogin, onError);
}

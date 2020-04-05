const regExpDic = {
	// eslint-disable-next-line no-useless-escape
	email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
	password: /^[0-9a-zA-Z]{8,}$/,
	gender_orientation: /^([F-f][E-e])?[M-m][A-a][L-l][E-e]$/,
	nickname: /^[A-z_]([A-z0-9_]{1,15})$/,
	first_name: /^[А-яA-z][A-zА-я\-\s]{0,30}[^-^\s]$/,
	last_name: /^[А-яA-z][A-zА-я\-\s]{0,30}[^-^\s]$/,
	phone: /^[0][0-9\-\s]{1,15}[^-^\s]$/,
	country: /.*[A-z]$/,
	city: /.*[A-z]$/,
	dateOfBirth: /^[0-9]{4}[-][0-9][0-9][-][0-9][0-9]$/,
};
/** Function validate. Check Input
* @param{HTMLElement} element
* @returns {Boolean}  Returns true if valid. True if el has no data-required attribute.
*/
function validate(element) {
	const regExpName = element.dataset.required;
	if (!regExpDic[regExpName]){
		return true;
	}
	return regExpDic[regExpName].test(element.value);
}
export default validate;

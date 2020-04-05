function getContainer() {
	return document.querySelector('.notify-container');
}
/**
 *
 * @param index{Number}
 */
function closeNotify(index) {
	let alertDOM = null;
	if (index === undefined){
		alertDOM = document.querySelector('.notify-container .alert');
	} else {
		alertDOM = document.querySelector(`.notify-container .alert[data-index ="${index}"]`);
	}

	if (!alertDOM){
		console.warn('Alert not found');
		return;
	}
	const container = getContainer();
	container.removeChild(alertDOM);
}
function alertTemplate(msg, className, index) {
	return `
			<div class="alert ${className} " data-index="${index}">
			${msg}
</div>
		`;
}
function notifyContainerTemplate() {
	return `
			<div class="notify-container fixed-top font-weight-bold "></div>
		`;
}
function createNotifyCotainer() {
	const template = notifyContainerTemplate();
	// document.body.insertAdjacentHTML('afterbegin', template);
	document.getElementById('loginCard').insertAdjacentHTML('beforeend', template);
}
function getAlertIndex() {
	return document.querySelectorAll('.notify-container .alert').length;
}

/**
 *
 * @param message {String}
 * @param className {String}
 * @param timeout {Number}
 */
function showNotify({ message = 'Info message', className = 'alert-info', timeout = 3000 } = {}) {
	if (!getContainer()){
		createNotifyCotainer();
	}
	const alertIndex = getAlertIndex();
	const template = alertTemplate(message, className, alertIndex);
	const container = getContainer();
	container.insertAdjacentHTML('beforeend', template);
	setTimeout(() => closeNotify(alertIndex), timeout);
}

export default showNotify;

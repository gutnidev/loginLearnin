
class ErrorUI{
	/**
	 *
	 * @param msg{String}
	 * @return {String}
	 */
	static inputErrTemplate(msg) {
		return `
				<div class="invalid-tooltip">${msg}</div>
			`;
	}

	/**
		 *
		 * @param input{HTMLElement}
		 */
	// eslint-disable-next-line class-methods-use-this
	showInputError(input) {
		const parent = input.parentElement;
		const msg = input.dataset.invalidMessage || 'Invalid input';
		const template = ErrorUI.inputErrTemplate(msg);
		input.classList.add('is-invalid');
		parent.insertAdjacentHTML('beforeend', template);
	}

	/**
		 *
		 * @param element{HTMLElement}
		 */
	// eslint-disable-next-line class-methods-use-this
	hideInputError(element) {
		const parent = element.parentElement;
		const err = parent.getElementsByClassName('invalid-tooltip');
		if (!err.length){
			return;
		}
		element.classList.remove('is-invalid');
		parent.removeChild(err[0]);
	}
}

/**
 *
 * @type {ErrorUI}
 */
const errorUI = new ErrorUI();

export default errorUI;

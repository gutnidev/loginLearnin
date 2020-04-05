
import 'bootstrap-4-autocomplete/dist/bootstrap-4-autocomplete';
import 'bootstrap-4-autocomplete/dist/bootstrap-4-autocomplete.min';
import axios from '@src/js/plugins/axios';

class RegistrationForm {
	constructor() {
		this.registrationForm = null;
		this.countyInput = null;
		this.cityInput = null;
		this.birthdayInput = null;
		this.countriesURL = '/location/get-countries';
		this.newUserURL = '/auth/signup';
		this.inputs = null;
		this.closeBtn = null;
		this.inputs = null;
	}

	init(){
		this.registrationForm = document.forms.registrationForm;
		this.countyInput = this.registrationForm.elements.registrationCountry;
		this.cityInput = this.registrationForm.elements.registrationCity;
		this.birthdayInput = this.registrationForm.elements.registrationBirthday;
		this.closeBtn = this.registrationForm.elements.closeBtn;
		this.inputs = this.getInputs();
		this.fetchCountries();
	}

	// eslint-disable-next-line class-methods-use-this
	addFocus(onFocus, element){
		if (element && !Number.parseInt(element.dataset.eventFocus)){
			element.addEventListener('focus', onFocus);
			element.dataset.eventFocus = '1';
		}
	}

	// eslint-disable-next-line class-methods-use-this
	removeFocusEventListener(onFocus, element){
		if (element && Number.parseInt(element.dataset.eventFocus)){
			element.removeEventListener('focus', onFocus);
		}
	}

	getInputs(){
		const itemsArray = Array.from(this.registrationForm.elements);
		return itemsArray.reduce((acc, element) => {
			if (element.tagName.toLowerCase() === 'input'){
				acc.push(element);
			}
			return acc;
		}, []);
	}

	getDataToFetchForm(){
		const birthArray = this.birthdayInput.value.split('-');
		const params = this.inputs.reduce((acc, input) => {
			if (input.dataset.required !== 'dateOfBirth'){
				const key = input.dataset.required;

				acc[key] = input.value;
			}
			return acc;
		}, {});
		params.date_of_birth_day = birthArray[2];
		params.date_of_birth_month = birthArray[1];
		params.date_of_birth_year = birthArray[0];
		return params;
	}

	async fetchNewUser(data){
		const response = await axios.post(this.newUserURL, data);
		console.log(response);
		return response;
	}

	async fetchCountries(){
		const countries = await axios.get(this.countriesURL);
		this.setAutocompleteCountries(countries);
		return countries;
	}

	async fetchCityes(url){
		const cities = await axios.get(url);
		this.setAutocompleteCities(cities);
		return cities;
	}

	setAutocompleteCountries(countries){
		// eslint-disable-next-line no-undef
		$(this.countyInput).autocomplete({
			source: countries,
			treshold: 1,
			highlightClass: 'text-danger',
			onSelectItem(item){
				const url = `location/get-cities/${item.value}`;
				// eslint-disable-next-line no-use-before-define
				registrationFormUI.fetchCityes(url);
			},
		});
	}

	setAutocompleteCities(data){
		// eslint-disable-next-line no-undef
		$(this.cityInput).autocomplete({
			source: data,
			treshold: 1,
			highlightClass: 'text-danger',
		});
		this.cityInput.removeAttribute('disabled');
	}
}

const registrationFormUI = new RegistrationForm();


export default registrationFormUI;

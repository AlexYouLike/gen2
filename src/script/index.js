import _ from 'lodash';
import '../styles/appStyles.scss';
import Shuffle from 'shufflejs';
import storylog from '../json/catalogData.json';


console.log(storylog);

function setAttributes(el, attrs) {
	for(var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}


	for(var i = 0; i < storylog.length; i++) {
		let fig = document.createElement('figure');
		fig.classList.add('js-item', 'img-item', 'col-3@sm', 'col-3@xs');

		let divOut = document.createElement('div');
		divOut.classList.add('aspect', 'aspect--16x9');

		let divInn = document.createElement('div');
		divInn.classList.add('aspect__inner');

		let image = document.createElement('img');
		image.src = storylog[i].thumbnail;

		let figcaption = document.createElement('figcaption');
		figcaption.innerHTML = storylog[i].brand_name;

		setAttributes(fig, {
			'data-shape': storylog[i].format.toLowerCase(),
			'data-color': storylog[i].geo.toLowerCase(),
			'data-category': storylog[i].category.toLowerCase()
		})

		fig.appendChild(divOut);
		divOut.appendChild(divInn);
		divInn.appendChild(image);
		fig.appendChild(figcaption);

		document.getElementById('main_container').appendChild(fig);
	}

//let sizer = document.createElement('div');
//sizer.classList.add('col-1@sm the-sizer')
//document.getElementById('main_container').appendChild(sizer);


/*
for(var i = 0; i < 30; i++) {
	let div = document.createElement('div')
	setAttributes(div, {
		'class': 'whatever',
		'data-shape': ['circle', 'diamond', 'triangle', 'square'][Math.floor(Math.random() * 4)],
		'data-color': ['green', 'blue', 'red', 'orange'][Math.floor(Math.random() * 4)]
	})
	document.getElementById('main_container').appendChild(div)
}
*/



var StoryShuffle = function (element) {
	this.formats = Array.from(document.querySelectorAll('.js-shapes input'));
	this.countries = Array.from(document.querySelectorAll('.js-colors button'));

	this.shuffle = new Shuffle(element, {
		easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
		sizer: '.the-sizer',
	});

	this.filters = {
		formats: [],
		countries: [],
	};

	this._bindEventListeners();
};


StoryShuffle.prototype._createHTMLBlocks = function () {


	// ELEMENT CREATION LOGIC GOES HERE


};

/**
 * Bind event listeners for when the filters change.
 */
StoryShuffle.prototype._bindEventListeners = function () {
	this._onFormatChange = this._handleFormatChange.bind(this);
	this._onCountryChange = this._handleCountryChange.bind(this);

	this.formats.forEach(function (input) {
		input.addEventListener('change', this._onFormatChange);
	}, this);

	this.countries.forEach(function (button) {
		button.addEventListener('click', this._onCountryChange);
	}, this);
};

/**
 * Get the values of each checked input.
 * @return {Array.<string>}
 */
StoryShuffle.prototype._getCurrentFormatFilters = function () {
	return this.formats.filter(function (input) {
		return input.checked;
	}).map(function (input) {
		return input.value;
	});
};

/**
 * Get the values of each `active` button.
 * @return {Array.<string>}
 */
StoryShuffle.prototype._getCurrentCountryFilters = function () {
	return this.countries.filter(function (button) {
		return button.classList.contains('active');
	}).map(function (button) {
		return button.getAttribute('data-value');
	});
};

/**
 * A shape input check state changed, update the current filters and filte.r
 */
StoryShuffle.prototype._handleFormatChange = function () {
	this.filters.formats = this._getCurrentFormatFilters();
	this.filter();
};

/**
 * A color button was clicked. Update filters and display.
 * @param {Event} evt Click event object.
 */
StoryShuffle.prototype._handleCountryChange = function (evt) {
	var button = evt.currentTarget;

	// Treat these buttons like radio buttons where only 1 can be selected.
	if (button.classList.contains('active')) {
		button.classList.remove('active');
	} else {
		this.countries.forEach(function (btn) {
			btn.classList.remove('active');
		});

		button.classList.add('active');
	}

	this.filters.countries = this._getCurrentCountryFilters();
	this.filter();
};

/**
 * Filter shuffle based on the current state of filters.
 */
StoryShuffle.prototype.filter = function () {
	if (this.hasActiveFilters()) {
		this.shuffle.filter(this.itemPassesFilters.bind(this));
	} else {
		this.shuffle.filter(Shuffle.ALL_ITEMS);
	}
};

/**
 * If any of the arrays in the `filters` property have a length of more than zero,
 * that means there is an active filter.
 * @return {boolean}
 */
StoryShuffle.prototype.hasActiveFilters = function () {
	return Object.keys(this.filters).some(function (key) {
		return this.filters[key].length > 0;
	}, this);
};

/**
 * Determine whether an element passes the current filters.
 * @param {Element} element Element to test.
 * @return {boolean} Whether it satisfies all current filters.
 */
StoryShuffle.prototype.itemPassesFilters = function (element) {
	var formats = this.filters.formats;
	var countries = this.filters.countries;
	var format = element.getAttribute('data-shape');
	var country = element.getAttribute('data-color');

	// If there are active shape filters and this shape is not in that array.
	if (formats.length > 0 && !formats.includes(format)) {
		return false;
	}

	// If there are active color filters and this color is not in that array.
	if (countries.length > 0 && !countries.includes(country)) {
		return false;
	}

	return true;
};

document.addEventListener('DOMContentLoaded', function () {
	window.StoryShuffle = new StoryShuffle(document.querySelector('.js-shuffle'));
});

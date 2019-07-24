import _ from 'lodash'
import '../styles/appStyles.scss'
import storylog from '../json/catalogData.json'
import { sidebarToggle, tilesGeneration } from './utils'
import LazyLoad from "vanilla-lazyload"
import Shuffle from 'shufflejs'


let uniqCat = Array.from(storylog.map(e => e.category))
console.log('there are', _.uniq(uniqCat).length, 'differents categories : ', _.uniq(uniqCat));

let uniqGeo = Array.from(storylog.map(e => e.geo))
console.log('there are', _.uniq(uniqGeo).length, 'differentes geos : ', _.uniq(uniqGeo));

let uniqFormat = Array.from(storylog.map(e => e.format))
console.log('there are', _.uniq(uniqFormat).length, 'differentes formats : ', _.uniq(uniqFormat));

sidebarToggle()

tilesGeneration(storylog)


let lazyLoadInstance = new LazyLoad({
	elements_selector: '.thumbnail'
})

var StoryShuffle = function (element) {
	this.formats = Array.from(document.querySelectorAll('.js-formats input'));
	this.countries = Array.from(document.querySelectorAll('.js-geo button'));
	this.categories = Array.from(document.querySelectorAll('.js-categories .bubule_container'))

	this.shuffle = new Shuffle(element, {
		easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
		sizer: '.the-sizer',
	});

	this.filters = {
		formats: [],
		countries: [],
		categories: []
	};

	this._bindEventListeners();
};


/**
 * Bind event listeners for when the filters change.
 */
StoryShuffle.prototype._bindEventListeners = function () {
	this._onFormatChange = this._handleFormatChange.bind(this);
	this._onCountryChange = this._handleCountryChange.bind(this);
	this._onCategoryChange = this._handleCategoryChange.bind(this);

	this.formats.forEach(function (input) {
		input.addEventListener('change', this._onFormatChange);
	}, this);

	this.countries.forEach(function (button) {
		button.addEventListener('click', this._onCountryChange);
	}, this);

	this.categories.forEach(function (elem) {
		elem.addEventListener('click', this._onCategoryChange);
	}, this)
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

// NEW HERE
StoryShuffle.prototype._getCurrentCategoryFilters = function () {
	return this.categories.filter(function (elem) {
		return elem.classList.contains('active')
	}).map(function (elem) {
		return elem.getAttribute('data-value')
	})
}

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

StoryShuffle.prototype._handleCategoryChange = function (evt) {
	var elem = evt.currentTarget

	// Treat these buttons like radio buttons where only 1 can be selected.
	if (elem.classList.contains('active')) {
		elem.classList.remove('active');
	} else {
		this.categories.forEach(function (btn) {
			btn.classList.remove('active');
		});

		elem.classList.add('active');
	}

	this.filters.categories = this._getCurrentCategoryFilters();
	this.filter();

}

/**
 * Filter shuffle based on the current state of filters.
 */
StoryShuffle.prototype.filter = function () {
	if (this.hasActiveFilters()) {
		this.shuffle.filter(this.itemPassesFilters.bind(this));
	} else {
		this.shuffle.filter(Shuffle.ALL_ITEMS);
	}
	lazyLoadInstance.update();
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
	var categories = this.filters.categories;
	var format = element.getAttribute('data-shape');
	var country = element.getAttribute('data-color');
	var category = element.getAttribute('data-category')

	// If there are active shape filters and this shape is not in that array.
	if (formats.length > 0 && !formats.includes(format)) {
		return false;
	}

	// If there are active color filters and this color is not in that array.
	if (countries.length > 0 && !countries.includes(country)) {
		return false;
	}

	// If there are active color filters and this color is not in that array.
	if (categories.length > 0 && !categories.includes(category)) {
		return false;
	}

	return true;
};



document.addEventListener('DOMContentLoaded', function () {
	window.StoryShuffle = new StoryShuffle(document.querySelector('.js-shuffle'));
});

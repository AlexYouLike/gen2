


let uniqCat = Array.from(assets.map(e => e.category))
console.log('there are', _.uniq(uniqCat).length, 'differents categories : ', _.uniq(uniqCat));

let uniqGeo = Array.from(assets.map(e => e.geo))
console.log('there are', _.uniq(uniqGeo).length, 'differents geos : ', _.uniq(uniqGeo));

let uniqFormat = Array.from(assets.map(e => e.format))
console.log('there are', _.uniq(uniqFormat).length, 'differents formats : ', _.uniq(uniqFormat));

sidebarToggle()

tilesGeneration(_.shuffle(assets))


document.body.addEventListener('click', (e) => {
	let it = true
	if(!document.getElementsByClassName('clip-iframe').length && getParentWithClass(e.target, 'tile') && it) {
		it = false
		openStory(getParentWithClass(e.target, 'tile'))
	}


	if(document.getElementsByClassName('clip-iframe').length && it) {
		it = false
		document.getElementsByClassName('clip-iframe')[0].parentNode.removeChild(document.getElementsByClassName('clip-iframe')[0])
	}
})

window.addEventListener('keyup', (e) => {
	if(document.getElementsByClassName('clip-iframe').length && e.keyCode == 27) {
		document.getElementsByClassName('clip-iframe')[0].parentNode.removeChild(document.getElementsByClassName('clip-iframe')[0])
	}
})

let lazyLoadInstance = new LazyLoad({
	elements_selector: '.lazyload'
})

var StoryShuffle = function (element) {
	this.formats = Array.from(document.querySelectorAll('.js-formats button'));
	this.countries = Array.from(document.querySelectorAll('.js-geo button'));
	this.categories = Array.from(document.querySelectorAll('.js-categories .bubule_container'))
	this.message = document.querySelector('.js-message');

	this.shuffle = new Shuffle(element, {
		easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
	});

	this.filters = {
		formats: [],
		countries: [],
		categories: []
	};

	this._bindEventListeners();
};

StoryShuffle.prototype._bindEventListeners = function () {
	this._onFormatChange = this._handleFormatChange.bind(this);
	this._onCountryChange = this._handleCountryChange.bind(this);
	this._onCategoryChange = this._handleCategoryChange.bind(this);

	this.formats.forEach(function (button) {
		button.addEventListener('click', this._onFormatChange);
	}, this);

	this.countries.forEach(function (button) {
		button.addEventListener('click', this._onCountryChange);
	}, this);

	this.categories.forEach(function (elem) {
		elem.addEventListener('click', this._onCategoryChange);
	}, this)
};

StoryShuffle.prototype._getCurrentFormatFilters = function () {
	return this.formats.filter(function (button) {
		return button.classList.contains('active-button');
	}).map(function (button) {
		return button.getAttribute('data-value');
	});
};

StoryShuffle.prototype._getCurrentCountryFilters = function () {
	return this.countries.filter(function (button) {
		return button.classList.contains('active-button');
	}).map(function (button) {
		return button.getAttribute('data-value');
	});
};

StoryShuffle.prototype._getCurrentCategoryFilters = function () {
	return this.categories.filter(function (elem) {
		return elem.classList.contains('active')
	}).map(function (elem) {
		return elem.getAttribute('data-value')
	})
}

StoryShuffle.prototype._handleFormatChange = function (evt) {
	var button = evt.currentTarget;
	if (button.classList.contains('active-button')) {
		button.classList.remove('active-button');
	} else {
		this.formats.forEach(function (btn) {
			btn.classList.remove('active-button');
		});

		button.classList.add('active-button');
	}

	this.filters.formats = this._getCurrentFormatFilters();
	this.filter();
};

StoryShuffle.prototype._handleCountryChange = function (evt) {
	var button = evt.currentTarget;
	if (button.classList.contains('active-button')) {
		button.classList.remove('active-button');
	} else {
		this.countries.forEach(function (btn) {
			btn.classList.remove('active-button');
		});

		button.classList.add('active-button');
	}

	this.filters.countries = this._getCurrentCountryFilters();
	this.filter();
};

StoryShuffle.prototype._handleCategoryChange = function (evt) {
	var elem = evt.currentTarget

	if (elem.classList.contains('active')) {
		elem.classList.remove('active');
		elem.classList.remove('disabled');
	} else {
		this.categories.forEach(function (btn) {
			btn.classList.remove('active');
			btn.classList.add('disabled');
		});

		elem.classList.add('active');
		elem.classList.remove('disabled');
	}
	this.filters.categories = this._getCurrentCategoryFilters();
	this.filter();

}

StoryShuffle.prototype.filter = function () {
	if (this.hasActiveFilters()) {
		this.shuffle.filter(this.itemPassesFilters.bind(this));
	} else {
		this.shuffle.filter(Shuffle.ALL_ITEMS);
		var elements = document.querySelectorAll(".bubule_container");
		for (var i = 0; i < elements.length; i++) {
   			elements[i].classList.remove('disabled');
		}
	}
	if(this.shuffle.visibleItems == 0){
    	this.message.innerHTML = "No items found";
	}
	else{
	    this.message.innerHTML ="";
	}
	lazyLoadInstance.update();
};

StoryShuffle.prototype.hasActiveFilters = function () {
	return Object.keys(this.filters).some(function (key) {
		return this.filters[key].length > 0;
	}, this);
};

StoryShuffle.prototype.itemPassesFilters = function (element) {
	var formats = this.filters.formats;
	var countries = this.filters.countries;
	var categories = this.filters.categories;
	var format = element.getAttribute('data-shape');
	var country = element.getAttribute('data-color');
	var category = element.getAttribute('data-category')

	if (formats.length > 0 && !formats.includes(format)) {
		return false;
	}

	if (countries.length > 0 && !countries.includes(country)) {
		return false;
	}

	if (categories.length > 0 && !categories.includes(category)) {
		return false;
	}

	return true;
};

// Sticky Header
/*
var checkHeader = _.throttle(() => {
    let scrollPosition = Math.round(window.scrollY);
    if (scrollPosition > 100){
        document.querySelector('header').classList.add('sticky');
    }
    else {
        document.querySelector('header').classList.remove('sticky');
    }
}, 300);
window.addEventListener('scroll', checkHeader);
*/
//




document.addEventListener('DOMContentLoaded', function () {
	window.StoryShuffle = new StoryShuffle(document.querySelector('.js-shuffle'));
});

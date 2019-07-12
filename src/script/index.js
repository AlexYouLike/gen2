import _ from 'lodash';
import '../styles/appStyles.scss';
import Shuffle from 'shufflejs';
import storylog from '../json/catalogData.json';

console.log(storylog);

const CreateDivs = function () {
	var i = 0;
	var count = storylog.length;

	while (i < 10)
	{
		var fig = document.createElement("figure");
		fig.classList.add("col-4@sm");
		fig.classList.add("picture-item");
		fig.setAttribute('data-groups', '["' + storylog[i].format + '", "' + storylog[i].geo + '"]');
		fig.innerHTML = storylog[i].brand_name;
		document.getElementById("test").appendChild(fig);
		i++;
	}
}

var Catalog = function (element) {
  this.format = Array.from(document.querySelectorAll('.js-format input'));
  this.country = Array.from(document.querySelectorAll('.js-colors button'));

  this.shuffle = new Shuffle(element, {
    easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
    sizer: '.the-sizer',
  });

  this.filters = {
    format: [],
    country: [],
  };

  this._bindEventListeners();
};

Catalog.prototype._bindEventListeners = function () {
  this._onFormatChange = this._handleFormatChange.bind(this);
  this._onCountryChange = this._handleCountryChange.bind(this);

  this.format.forEach(function (input) {
    input.addEventListener('change', this._onFormatChange);
  }, this);

  this.country.forEach(function (button) {
    button.addEventListener('click', this._onCountryChange);
  }, this);
};

document.addEventListener('DOMContentLoaded', function() {
	window.demo = new CreateDivs(document.querySelector('.js-shuffle'));
});


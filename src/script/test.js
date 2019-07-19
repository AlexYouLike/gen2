import _ from 'lodash';
import '../styles/appStyles.scss';
import Shuffle from 'shufflejs';
import storylog from '../json/catalogData.json';

console.log(storylog);

var CreateDivs = function (index) {
	var outterDiv = document.createElement("figure"),
		aspectOut = document.createElement("div"),
		aspectInn = document.createElement("div"),
		image	  = document.createElement("img"),
		mainConta = document.getElementById("main_container");

	mainConta.appendChild(outterDiv);
	outterDiv.appendChild(aspectOut);
	aspectOut.appendChild(aspectInn);
	aspectInn.appendChild(image);

	outterDiv.classList.add('col-3@xs', 'col-3@sm', 'format', 'shuffle-item');
	aspectOut.classList.add('aspect', 'aspect--16x9');
	aspectInn.classList.add("aspect__inner");

	image.setAttribute('data-format', storylog[index].format.toLowerCase());
	image.setAttribute('data-realm', storylog[index].geo.toLowerCase());
	image.setAttribute('data-category', storylog[index].category.toLowerCase());
	image.setAttribute('data-groups', "['" + storylog[index].geo + "']");
	image.src = storylog[index].thumbnail;

	outterDiv.innerHTML = storylog[index].format;
}



const MakeShuffle = function () {

	var i = 0;

	while (i < 10) {
		CreateDivs(i);
		i++;
	}

	var sizer = document.createElement("div");
	document.getElementById("main_container").appendChild(sizer);
	sizer.classList.add('col-1@sm', 'my-sizer-element');

	var elem = document.querySelector('.my-shuffle-container');
	var sizer = document.querySelector('.my-sizer-element');
	var shuffInstance = new Shuffle(elem, {
		itemSelector: '.shuffle-item',
		sizer: sizer
	});
	console.log(shuffInstance);
	var redi = document.getElementById('cb-redirect');
	const checks = document.querySelectorAll('.ib > input');
	for (const check of checks) {
		check.addEventListener('click', function (ev) {
			shuffInstance.filter(ev.target.value);
		})
	}

	if (redi.checked == true)
		console.log('yo');
	else
		console.log('no');
	// shuffInstance.filter('UK');
}

document.addEventListener('DOMContentLoaded', function() {
	window.demo = new MakeShuffle(document.querySelector('.js-shuffle'));

});


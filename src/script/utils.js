
function setAttributes(el, attrs) {
	for(var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}

exports.sidebarToggle = () => {
  Array.from(document.querySelectorAll("#click_filter, #close")).forEach((el) => {
    el.onclick = () => {
      document.querySelector("#wrapper").classList.toggle('menu_visible')
    }
  })
}

exports.tilesGeneration = (json) => {
	for(var i = 0; i < json.length; i++) {
		let el = document.createElement('div');

		setAttributes(el, {
			'class': 'tile',
			'data-shape': json[i].format.toLowerCase(),
			'data-color': json[i].geo.toLowerCase(),
			'data-category': json[i].category.toLowerCase()
		})

		document.getElementById('main_container').appendChild(el);
	}
}

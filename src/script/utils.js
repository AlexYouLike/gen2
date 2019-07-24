
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
		let el = document.createElement('div')
		let thumbnail = document.createElement('img')
		let logo = document.createElement('img')

		setAttributes(el, {
			'class': 'tile',
			'data-shape': json[i].format.toLowerCase(),
			'data-color': json[i].geo.toLowerCase(),
			'data-category': json[i].category.toLowerCase(),
		})

		setAttributes(thumbnail, {
			'class': 'thumbnail',
			'data-src': json[i].thumbnail
		})

		setAttributes(logo, {
			'class': 'logo',
			'data-src': json[i].logo
		})

		el.appendChild(thumbnail)
		el.appendChild(logo)

		document.getElementById('main_container').appendChild(el);
	}
}
